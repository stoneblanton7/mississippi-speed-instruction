import CampPage from '../../../components/CampPage.jsx';
import { CAMPS } from '../../../config.js';
import banner from '../../../assets/kids-camp 10.png';
import included from '../../../assets/kids-camp 5.png';

export default function GirlsCamp() {
  return <CampPage camp={CAMPS.girls} banner={banner} includedImage={included} />;
}
