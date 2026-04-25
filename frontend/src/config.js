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
  homeHeroHash: '4e88b51a6d',
  homeFeatured: ['1054590195', '1065590680', '1065590471'],
  mikeBio: '1029090078',
  phillipBio: '1027326776',
};

// Mike's Vimeo videos are set to "private with hashed link" — every embed
// requires the h= URL parameter to authenticate. VideoModal looks up the
// hash here when it isn't passed explicitly.
export const VIMEO_HASHES = {
  '1071529794': '4e88b51a6d', // Home hero — MSI Web Header
  '1054590195': 'a46fc6ed85', // Coach Epsy Acceleration Drill
  '1065590680': '813bd90be5', // Coach NS Tether Drill
  '1065590471': '7e9be16bde', // Coach PS Wall Drill
  '1029090078': 'f3d1a7b264', // M3 Bio
  '1065590323': '3ba2662b12', // Coach SB Change of Direction
  '1065590864': '24ab264780', // Ladder Drills 1 & 2 Foot Runs
  '1065591042': 'bc47d2ad5f', // Coach M4 Ball Drop Drill
  '1027326776': '1582d8b85d', // Phillip Short Bio
  '1036431560': 'c1fb32e0ca', // Drop Back Drills
  '1036422233': '6f153be04e', // Medicine Ball Drill
  '1022931423': '65a233cc40', // Disassociate Drill
  '1022932056': 'd445466bb0', // Football Grip
  '1022932565': '2bb3de2e75', // 1234 Drill
  '998320024': '57415d7cef', // Skill: Acceleration
  '998320201': '8211646afd', // Skill: Balance & Body Control
  '998320225': 'fb49ddcdb6', // Skill: Change of Direction
  '998320246': 'f4a2079464', // Skill: Core Strength
  '998320282': '8fcfabd4c8', // Skill: Flexibility
  '998320323': 'ebccf23d7e', // Skill: Foot Quickness
  '998320362': '6a4515ebb9', // Skill: Jumping
  '998320393': '16163757c1', // Skill: Lateral Speed
  '998320416': '84da1966d4', // Skill: Top Speed
  '998320452': '711273ac01', // Skill: Visual Acuity
};

export function buildVimeoSrc(id, params = {}, explicitHash) {
  const hash = explicitHash ?? VIMEO_HASHES[id];
  const search = new URLSearchParams();
  if (hash) search.set('h', hash);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) search.set(k, String(v));
  }
  return `https://player.vimeo.com/video/${id}?${search.toString()}`;
}
