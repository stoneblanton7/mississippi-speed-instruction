import CampPage from '../../../components/CampPage.jsx';
import { CAMPS } from '../../../config.js';
import banner from '../../../assets/camp-girls-banner.png';

export default function GirlsCamp() {
  return <CampPage camp={CAMPS.girls} banner={banner} />;
}
