/**
 * src/data/gallery.js — add photos here.
 *
 * To add a photo:
 *   1. Put the image in  src/assets/gallery/  (JPG/PNG/WebP; ~1200px on the long side is plenty).
 *   2. Add one entry below. `file` is the file name. `w`/`h` are the image's pixel size
 *      (stops the page jumping while photos load).
 *   3. Only add photos Sriti is happy to publish, and crop out other people unless they agree.
 *
 * Captions describe WHERE/WHAT only — no claims about results (Bar Council Rule 36).
 */
const files = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const url = (name) => files[`../assets/gallery/${name}`];

export const GALLERY = [
  {
    id: 'court',
    file: 'district-court-dehradun.webp',
    w: 1000,
    h: 1333,
    alt: 'Adv. Sriti Vaishnava in advocate’s robes in front of the District Courts, Dehradun',
    caption: 'Outside the District Courts, Dehradun',
    category: 'Court',
  },
  {
    id: 'office',
    file: 'commissioner-office.webp',
    w: 722,
    h: 1600,
    alt: 'Adv. Sriti Vaishnava seated in the Office of the Commissioner for Persons with Disabilities, Uttarakhand',
    caption: 'Office of the Commissioner for Persons with Disabilities, Uttarakhand',
    category: 'Office',
  },
].map((p) => ({ ...p, src: url(p.file) }));
