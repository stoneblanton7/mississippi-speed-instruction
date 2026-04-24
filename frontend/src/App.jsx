import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Camp from './pages/Camp.jsx';
import CampBoys from './pages/CampBoys.jsx';
import CampGirls from './pages/CampGirls.jsx';
import Elements from './pages/Elements.jsx';
import ElementDetail from './pages/ElementDetail.jsx';
import About from './pages/About.jsx';
import AboutMike from './pages/AboutMike.jsx';
import AboutPhillip from './pages/AboutPhillip.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/camp" element={<Camp />} />
          <Route path="/camp/boys" element={<CampBoys />} />
          <Route path="/camp/girls" element={<CampGirls />} />
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
