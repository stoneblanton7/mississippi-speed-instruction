import data from './elements.json';

import accelerationIcon from '../../assets/skill-icon-acceleration.png';
import balanceIcon from '../../assets/skill-icon-balance-body-control.png';
import changeIcon from '../../assets/skill-icon-change-of-direction.png';
import coreIcon from '../../assets/skill-icon-core-strength.png';
import flexibilityIcon from '../../assets/skill-icon-flexibility.png';
import footIcon from '../../assets/skill-icon-foot-quickness.png';
import jumpingIcon from '../../assets/skill-icon-jumping.png';
import lateralIcon from '../../assets/skill-icon-lateral-speed.png';
import topIcon from '../../assets/skill-icon-top-speed.png';
import visualIcon from '../../assets/skill-icon-visual-acuity.png';

const ICONS = {
  acceleration: accelerationIcon,
  'balance-body-control': balanceIcon,
  'change-of-direction': changeIcon,
  'core-strength': coreIcon,
  flexibility: flexibilityIcon,
  'foot-quickness': footIcon,
  jumping: jumpingIcon,
  'lateral-speed': lateralIcon,
  'top-speed': topIcon,
  'visual-acuity': visualIcon,
};

const ORDER = [
  'acceleration',
  'balance-body-control',
  'change-of-direction',
  'core-strength',
  'flexibility',
  'foot-quickness',
  'jumping',
  'lateral-speed',
  'top-speed',
  'visual-acuity',
];

export const ELEMENTS = ORDER.map((slug) => ({
  ...data[slug],
  icon: ICONS[data[slug].iconKey],
}));

export const ELEMENTS_BY_SLUG = ELEMENTS.reduce((acc, el) => {
  acc[el.slug] = el;
  return acc;
}, {});

export const SPORTS = [
  { key: 'baseball', label: 'Baseball' },
  { key: 'basketball', label: 'Basketball' },
  { key: 'football', label: 'Football' },
  { key: 'soccer', label: 'Soccer' },
  { key: 'volleyball', label: 'Volleyball' },
];
