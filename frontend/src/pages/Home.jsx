import Hero from '../components/sections/Hero.jsx';
import TwoCampsSection from '../components/sections/TwoCampsSection.jsx';
import TenElements from '../components/sections/TenElements.jsx';
import FilmRoom from '../components/sections/FilmRoom.jsx';
import BuiltByTheBest from '../components/sections/BuiltByTheBest.jsx';
import SpeedCampFinal from '../components/sections/SpeedCampFinal.jsx';
import StickyRegisterCTA from '../components/ui/StickyRegisterCTA.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <TwoCampsSection />
      <TenElements />
      <FilmRoom />
      <BuiltByTheBest />
      <SpeedCampFinal />
      <StickyRegisterCTA />
    </>
  );
}
