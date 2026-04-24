// Runtime constants for Mississippi Speed Instruction.
// Editorial source of truth: scrape-output/camps.json + MSI-AMENDMENT.md.

export const REGISTER_URL =
  'https://portal.campnetwork.com/Register/Register.php?camp_id=398473';

export const REGISTER_LINK_PROPS = {
  href: REGISTER_URL,
  target: '_blank',
  rel: 'noopener noreferrer',
};

export const CAMPS = {
  boys: {
    id: 'boys-2026',
    name: 'Boys Speed Camp',
    gender: 'Boys',
    ageRange: '7-14',
    dates: 'June 9-11, 2026',
    time: '4:00–5:45 PM',
    location: 'Madison Ridgeland Academy',
    sports: 'All',
    spots: 50,
    cost: 115,
    description:
      'A fun three (3) day introduction to speed agility and quickness training 4:00-5:45 at Madison Ridgeland Academy! The program is designed by Mike Frascogna and the camp will be led by Coach Phillip Short and other MSI instructors. High speed drills and competition will teach athletes correct movement form in areas such as acceleration, top speed, lateral speed, foot quickness, jumping, change of direction, and visual acuity. Great for athletes competing in any team sport!',
  },
  girls: {
    id: 'girls-2026',
    name: 'Girls Speed Camp',
    gender: 'Girls',
    ageRange: '7-14',
    dates: 'June 23-25, 2026',
    time: '4:00–5:45 PM',
    location: 'Madison Ridgeland Academy',
    sports: 'All',
    spots: 50,
    cost: 115,
    description:
      'A fun three (3) day introduction to speed agility and quickness training 4:00-5:45 at Madison Ridgeland Academy! The program is designed by Mike Frascogna and the camp will be led by Coach Phillip Short and other MSI instructors. High speed drills and competition will teach athletes correct movement form in areas such as acceleration, top speed, lateral speed, foot quickness, jumping, change of direction, and visual acuity. Great for athletes competing in any team sport!',
  },
};

export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61564652301436',
  instagram: 'https://www.instagram.com/mississippispeed/',
};

export const ELEMENTS = [
  { slug: 'acceleration', name: 'Acceleration' },
  { slug: 'balance-body-control', name: 'Balance & Body Control' },
  { slug: 'change-of-direction', name: 'Change of Direction' },
  { slug: 'core-strength', name: 'Core Strength' },
  { slug: 'flexibility', name: 'Flexibility' },
  { slug: 'foot-quickness', name: 'Foot Quickness' },
  { slug: 'jumping', name: 'Jumping' },
  { slug: 'lateral-speed', name: 'Lateral Speed' },
  { slug: 'top-speed', name: 'Top Speed' },
  { slug: 'visual-acuity', name: 'Visual Acuity' },
];

export const VIMEO = {
  homeHero: '1071529794',
  homeFeatured: ['1054590195', '1065590680', '1065590471'],
  mikeBio: '1029090078',
  phillipBio: '1027326776',
};
