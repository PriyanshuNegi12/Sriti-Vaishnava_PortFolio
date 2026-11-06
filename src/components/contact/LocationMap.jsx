import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

// Dehradun city centre — only used while a location has no exact pin yet.
const CITY_CENTER = [30.3165, 78.0322];
const ZOOM = 16;

// Same scales-of-justice symbol as the header, drawn inline for the pin.
const PIN_HTML = `
  <div class="sv-pin">
    <span class="sv-pin__pulse"></span>
    <span class="sv-pin__body">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    </span>
  </div>`;

/**
 * Interactive map (Leaflet + OpenStreetMap — free, no API key).
 *  • custom teal pin with a label; the active one turns coral and pulses
 *  • switching location flies the map across smoothly
 *  • phones: one finger scrolls the PAGE (so the map never traps your scroll);
 *    pinch to zoom and the +/- buttons still work. Desktop: drag to pan,
 *    Ctrl/⌘ + scroll to zoom.
 * Locations without coordinates simply show no pin (see data/site.js).
 */
export default function LocationMap({ locations, activeId, onSelect }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const selectRef = useRef(onSelect);

  useEffect(() => {
    selectRef.current = onSelect;
  });

  useEffect(() => {
    const map = L.map(elRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      tap: false,
      zoomSnap: 0.5,
    }).setView(CITY_CENTER, 13);
    map.getContainer().classList.add('sv-map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Ctrl/⌘ + wheel zooms the map; plain wheel keeps scrolling the page.
    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        map.scrollWheelZoom.enable();
        setTimeout(() => map.scrollWheelZoom.disable(), 400);
      }
    };
    map.getContainer().addEventListener('wheel', onWheel, { passive: false });

    locations.forEach((loc) => {
      if (loc.lat == null || loc.lng == null) return;
      const marker = L.marker([loc.lat, loc.lng], {
        icon: L.divIcon({ className: 'sv-pin-wrap', html: PIN_HTML, iconSize: [44, 56], iconAnchor: [22, 54] }),
        keyboard: true,
        title: loc.label,
        alt: loc.label,
        riseOnHover: true,
      })
        .bindTooltip(loc.label, { permanent: true, direction: 'top', offset: [0, -52], className: 'sv-tip' })
        .addTo(map);
      marker.on('click', () => selectRef.current?.(loc.id));
      markersRef.current[loc.id] = marker;
    });

    mapRef.current = map;
    const markers = markersRef.current;
    return () => {
      map.getContainer().removeEventListener('wheel', onWheel);
      map.remove();
      mapRef.current = null;
      Object.keys(markers).forEach((k) => delete markers[k]);
    };
  }, [locations]);

  // fly to the active location and highlight its pin
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.entries(markersRef.current).forEach(([id, m]) => m.getElement()?.classList.toggle('is-active', id === activeId));
    const loc = locations.find((l) => l.id === activeId);
    if (loc?.lat != null && loc?.lng != null) map.flyTo([loc.lat, loc.lng], ZOOM, { duration: 1.3 });
    else map.flyTo(CITY_CENTER, 14, { duration: 1.3 });
  }, [activeId, locations]);

  return <div ref={elRef} className="h-full w-full" role="region" aria-label="Map of office locations" />;
}
