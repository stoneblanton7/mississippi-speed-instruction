import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import BoysCamp from './pages/Camp/BoysCamp/index.jsx';
import GirlsCamp from './pages/Camp/GirlsCamp/index.jsx';
import Elements from './pages/Elements.jsx';
import ElementDetail from './pages/ElementDetail.jsx';
import About from './pages/About/index.jsx';
import AboutMike from './pages/About/MikeFrascogna/index.jsx';
import AboutPhillip from './pages/About/PhillipShort/index.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/camp/boys" element={<BoysCamp />} />
          <Route path="/camp/girls" element={<GirlsCamp />} />
          <Route path="/elements" element={<Elements />} />
          <Route path="/elements/:slug" element={<ElementDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/mike-frascogna" element={<AboutMike />} />
          <Route path="/about/phillip-short" element={<AboutPhillip />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
