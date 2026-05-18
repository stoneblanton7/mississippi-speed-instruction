import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import BoysCamp from './pages/Camp/BoysCamp/index.jsx';
import GirlsCamp from './pages/Camp/GirlsCamp/index.jsx';
import Elements from './pages/Elements/index.jsx';
import ElementDetail from './pages/Elements/[ElementSlug]/index.jsx';
import AboutMike from './pages/About/MikeFrascogna/index.jsx';
import AboutPhilip from './pages/About/PhilipShort/index.jsx';
import Contact from './pages/Contact/index.jsx';
import Podcast from './pages/Podcast/index.jsx';
import EpisodeDetail from './pages/Podcast/[Slug]/index.jsx';
import Videos from './pages/Videos/index.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/camp/boys" element={<BoysCamp />} />
          <Route path="/camp/girls" element={<GirlsCamp />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/podcast/:slug" element={<EpisodeDetail />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/film" element={<Navigate to="/videos" replace />} />
          <Route path="/elements" element={<Elements />} />
          <Route path="/elements/:slug" element={<ElementDetail />} />
          <Route path="/about" element={<Navigate to="/about/mike-frascogna" replace />} />
          <Route path="/about/mike-frascogna" element={<AboutMike />} />
          <Route path="/about/philip-short" element={<AboutPhilip />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
