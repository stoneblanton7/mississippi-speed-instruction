import CampPage from '../../../components/CampPage.jsx';
import { CAMPS } from '../../../config.js';
import banner from '../../../assets/camp-girls-hero.webp';
import included from '../../../assets/camp-girls-included.webp';

export default function GirlsCamp() {
  return <CampPage camp={CAMPS.girls} banner={banner} includedImage={included} />;
}
