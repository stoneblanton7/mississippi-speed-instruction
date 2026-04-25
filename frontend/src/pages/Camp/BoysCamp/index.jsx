import CampPage from '../../../components/CampPage.jsx';
import { CAMPS } from '../../../config.js';
import banner from '../../../assets/kids-camp(8).png';

export default function BoysCamp() {
  return <CampPage camp={CAMPS.boys} banner={banner} />;
}
