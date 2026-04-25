import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import BoysCamp from './pages/Camp/BoysCamp/index.jsx';
import GirlsCamp from './pages/Camp/GirlsCamp/index.jsx';
import Elements from './pages/Elements/index.jsx';
import ElementDetail from './pages/Elements/[ElementSlug]/index.jsx';
import AboutMike from './pages/About/MikeFrascogna/index.jsx';
import AboutPhillip from './pages/About/PhillipShort/index.jsx';
import Contact from './pages/Contact/index.jsx';
import Film from './pages/Film/index.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/camp/boys" element={<BoysCamp />} />
          <Route path="/camp/girls" element={<GirlsCamp />} />
          <Route path="/film" element={<Film />} />
          <Route path="/elements" element={<Elements />} />
          <Route path="/elements/:slug" element={<ElementDetail />} />
          <Route path="/about" element={<Navigate to="/about/mike-frascogna" replace />} />
          <Route path="/about/mike-frascogna" element={<AboutMike />} />
          <Route path="/about/phillip-short" element={<AboutPhillip />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
