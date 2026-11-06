/**
 * src/data/site.js — the ONE file to edit when her details change.
 * Header, footer, Home, About, Contact… all read from here.
 * Anything set to `null` is simply not shown on the site.
 */

export const SITE = {
  name: 'Sriti Vaishnava',
  displayName: 'Adv. Sriti Vaishnava',
  designation: 'Advocate',
  court: 'Dehradun District Court',

  // Value-based (not promotional). Alternatives to choose from:
  //  "Clear advice. Careful advocacy."  ·  "Justice that is understood, not just delivered."
  slogan: { before: 'Law, with', emphasis: 'clarity', after: 'and care.' },

  enrolment: {
    number: '737/2021',
    year: '2021',
    date: null, // e.g. '12 March 2021'  → CONFIRM with her
    council: null, // e.g. 'Bar Council of Uttarakhand' → CONFIRM with her
  },

  contact: {
    phone: '+91-8394046269',
    phoneHref: 'tel:+918394046269',
    email: 'sritivaishnava@gmail.com',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/sriti-vaishnava-aa8a321b9/',
    instagram: 'https://www.instagram.com/sritivaishnav/',
  },

  languages: ['Hindi', 'English'],

  /** Both addresses are shown on the site. lat/lng power the map (step 3). */
  addresses: [
    {
      id: 'chamber',
      label: 'Court Chamber',
      // Wording follows her signboard. Her resume says "Opp. Bar Association" — CONFIRM which is right.
      lines: ['Ground Floor, Opp. Library, Nityanand Swami Block,', 'Court Compound, Dehradun, Uttarakhand'],
      lat: null, // TODO: exact pin of the chamber
      lng: null,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nityanand+Swami+Block+Court+Compound+Dehradun',
    },
    {
      id: 'office',
      label: 'Home Office',
      lines: ['Lane No. 2, Block C, Sahastradhara Road,', 'near Panchavati Yoga Centre, IT Park,', 'Aman Vihar, Dehradun, Uttarakhand 248001'],
      lat: 30.3527425,
      lng: 78.0741451,
      mapsUrl: 'https://maps.app.goo.gl/GZp7B7tNkUfJ68fq9',
    },
  ],

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Practice Areas', to: '/practice-areas' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],

  qualifications: ['B.A. LL.B.', 'LL.M.'],

  // Descriptions stay factual — no "specialist" or "expert" wording (Bar Council Rule 36).
  // `includes` comes straight from her resume. `forum` is general information about
  // where such matters are usually dealt with — she should review it.
  practiceAreas: [
    {
      id: 'criminal', icon: 'Gavel', title: 'Criminal Law',
      text: 'Court proceedings, drafting and case documentation in criminal matters.',
      includes: ['Criminal litigation and court-related proceedings', 'Legal drafting and case preparation', 'Documentation for criminal matters'],
      forum: 'Criminal courts at the district level',
    },
    {
      id: 'family', icon: 'Users', title: 'Family & Matrimonial',
      text: 'Family and matrimonial matters, with the related court proceedings and documents.',
      includes: ['Family and matrimonial disputes', 'Related court proceedings', 'Drafting and documentation'],
      forum: 'Family and civil courts',
    },
    {
      id: 'consumer', icon: 'ReceiptText', title: 'Consumer Disputes',
      text: 'Consumer disputes and proceedings, including drafting and documentation.',
      includes: ['Consumer disputes and proceedings', 'Drafting of case documents', 'Research and case preparation'],
      forum: 'Consumer dispute commissions',
    },
    {
      id: 'revenue', icon: 'Landmark', title: 'Revenue Matters',
      text: 'Revenue court matters and the related documentation.',
      includes: ['Revenue court matters', 'Related documentation and drafting', 'Case preparation'],
      forum: 'Revenue courts and offices',
    },
    {
      id: 'property', icon: 'House', title: 'Property & Registry',
      text: 'Property documentation and registry work.',
      includes: ['Property documentation', 'Registry work', 'Related legal formalities'],
      forum: "Sub-Registrar's office",
    },
    {
      id: 'marriage', icon: 'HeartHandshake', title: 'Marriage Registration',
      text: 'Marriage registration and related legal documentation.',
      includes: ['Marriage registration', 'Related legal documentation', 'Marriage-related legal formalities'],
      forum: 'Marriage registration offices',
    },
  ],

  timeline: [
    { when: '2015 – 2020', title: 'B.A. LL.B. (Five-Year Integrated)', text: 'Siddhartha Law College, Dehradun.' },
    { when: '2021', title: 'Enrolled as an Advocate', text: 'Enrolment No. 737/2021.' },
    { when: '2022 – 2024', title: 'Legal Assistant', text: 'Office of the Commissioner for Persons with Disabilities, Uttarakhand.' },
    { when: '2023', title: 'LL.M.', text: 'HNGBU, BGR Campus, Pauri Garhwal.' },
    { when: 'Present', title: 'Advocate', text: 'Practising before the Dehradun District Court.' },
  ],

  about: {
    short:
      'Advocate practising before the Dehradun District Court, with work across criminal, family and matrimonial, consumer and revenue matters, along with property documentation and marriage registration.',
    earlier:
      'Earlier served as Legal Assistant at the Office of the Commissioner for Persons with Disabilities, Uttarakhand (2022–2024).',
  },

  // ---- About page --------------------------------------------------
  // (Internship, school marks, date of birth, hobbies and sports are deliberately left out.)
  experience: [
    {
      role: 'Advocate',
      org: 'Independent Legal Practice, Dehradun',
      when: 'Present',
      points: [
        'Practising before the Dehradun District Court.',
        'Matters across criminal law, family and matrimonial disputes, consumer matters and revenue proceedings.',
        'Legal drafting, research, preparation of case documents and client consultation.',
        'Property documentation, registry work and marriage-related legal formalities.',
      ],
    },
    {
      role: 'Legal Assistant',
      org: 'Office of the Commissioner for Persons with Disabilities, Uttarakhand',
      when: '2022 – 2024',
      points: [
        'Worked in a legal-assistance role within the Commissioner’s office.',
        'Gained experience in legal documentation, drafting, research and case-related and departmental work.',
      ],
    },
  ],

  education: [
    { degree: 'LL.M.', school: 'HNGBU, BGR Campus, Pauri Garhwal', when: '2023' },
    { degree: 'B.A. LL.B. (Five-Year Integrated)', school: 'Siddhartha Law College', when: '2015 – 2020' },
  ],

  seminars: [
    { title: 'The Art of Advocacy', text: 'Workshop conducted by the Indian Academy of Law and Management (IALM) at Siddhartha Law College.' },
    { title: 'Legal Research and Methodology', text: 'National workshop and training by Siddhartha Law College, in collaboration with the Uttarakhand Law Commission.' },
    { title: 'Combating Acid Attack', text: 'Legal awareness programme on its socio-legal aspects, organised with Siddhartha Law College and the District Legal Services Authority, Dehradun.' },
  ],

  activities: [
    { when: '2018', title: 'Second Runner-up', text: 'Moot Court Competition, Siddhartha Law College.', icon: 'Trophy' },
    { when: '2017', title: 'Moot Court Participant', text: 'Moot Court Competition, Siddhartha Law College.', icon: 'Award' },
    { when: 'Law school', title: 'Legal Aid Camps', text: 'Took part in legal aid camps organised by Siddhartha Law College.', icon: 'HandHeart' },
  ],

  skills: ['Legal drafting & documentation', 'Legal research & case preparation', 'Client consultation & communication', 'Court & procedural coordination'],
  computer: ['MS Word', 'Excel', 'PowerPoint', 'Google Drive'],

  disclaimer:
    'This website is meant only to give information about Adv. Sriti Vaishnava. It is not an advertisement or a solicitation of work in any manner, and nothing on it is legal advice. Visitors use this site of their own accord.',
};
