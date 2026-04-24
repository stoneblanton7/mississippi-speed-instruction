import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero.jsx';
import TwoCampsSection from '../components/sections/TwoCampsSection.jsx';
import TenElements from '../components/sections/TenElements.jsx';
import FilmRoom from '../components/sections/FilmRoom.jsx';
import BuiltByTheBest from '../components/sections/BuiltByTheBest.jsx';
import SpeedCampFinal from '../components/sections/SpeedCampFinal.jsx';
import StickyRegisterCTA from '../components/ui/StickyRegisterCTA.jsx';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    }
  }, [location.state]);

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
