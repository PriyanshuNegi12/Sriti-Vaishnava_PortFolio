# Adv. Sriti Vaishnava — portfolio website

React + Vite + Tailwind CSS, with Framer Motion and GSAP for animation.

## Run it

```bash
npm install
npm run dev        # development  (http://localhost:5173)
npm run build      # production build  → dist/
npm run preview    # test the production build locally
```

## Where to change things

| What | Where |
|---|---|
| Name, phone, email, addresses, social links, slogan, practice areas, experience, education, timeline, disclaimer | `src/data/site.js` (the single source — header, footer and every page read from it) |
| Gallery photos | put the image in `src/assets/gallery/`, add one entry in `src/data/gallery.js` |
| Her portrait (Home + About) | replace `src/assets/images/sriti-portrait-480.webp` and `-720.webp` (4:5 portrait) |
| Colours | `src/index.css` → `@theme` (ivory `#F3EEE8`, teal `#17645F`, coral `#FF6845`) |
| Intro animation (timings, colours, words) | `src/components/intro/introConfig.js` |

Anything set to `null` in `site.js` is simply not shown. Still to fill in when known:
**enrolment date**, **State Bar Council**, and the **court chamber's map pin** (`lat` / `lng` of the `chamber` entry).
To get the pin: open the chamber in Google Maps, right-click the spot, click the coordinates to copy them.

## The intro

Plays once per browser session. Open `/?intro` to replay it. It is skipped for people who use
"reduce motion", and **Esc / Enter** skips it.

## Publishing (free options)

**Netlify** — drag the `dist/` folder onto app.netlify.com/drop, or connect the GitHub repo
(build command `npm run build`, publish directory `dist`). `public/_redirects` is already set up.

**Vercel** — import the GitHub repo; settings are detected automatically. `vercel.json` is already set up.

### After you have a domain
1. In `index.html`, make `og:image` absolute: `https://YOUR-DOMAIN/og-image.jpg` (so WhatsApp/LinkedIn previews work).
2. In `public/sitemap.xml` and `public/robots.txt`, replace `YOUR-DOMAIN`.
3. Add the site to Google Search Console and submit the sitemap.

## Bar Council rules (important)

Advocates in India may not advertise or solicit work (Bar Council of India Rules, Rule 36). This site is
written as an *information* site: facts only, no testimonials, no results or "best/expert" claims, no fees.
Before adding anything new (articles, offers, testimonials, photos), check it with the Bar Council of
Uttarakhand. The disclaimer in `site.js` appears in the footer and on the Contact and Practice Areas pages.

## Notes

- Fully responsive (phones, tablets, desktop). The header shows inline links on desktop and horizontal tablets,
  and a drop-down menu on phones and vertical tablets.
- Pages are loaded on demand; the map library only loads when the map scrolls into view.
- Map tiles come from OpenStreetMap (free, no key). If traffic grows a lot, switch the tile URL in
  `src/components/contact/LocationMap.jsx` to a hosted provider.
- Accessibility: keyboard navigable, "Skip to content" link, labelled controls, tested with axe-core.
