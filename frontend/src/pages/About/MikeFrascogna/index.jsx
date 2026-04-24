import BioPage from '../../../components/BioPage.jsx';
import portrait from '../../../assets/portrait-mike.jpg';

const BIO = [
  "MSI was founded by Mike Frascogna III in 1993 — the summer after his first year at the University of Notre Dame. A student of legendary athletic speed pioneer Randy Smythe, Frascogna agreed to allow a handful of high school athletes to participate as his training partners as he prepared himself for the 1993 college football season. The success of his training partners resulted in an avalanche of similar requests the following summer and prompted Frascogna to launch a series of instructional clinics for athletes ages 8-18.",
  "Upon graduation from Notre Dame, Frascogna was hired as the speed and agility coach for the Millsaps College athletic department, as well as the wide receiver coach for their football team, while he earned his MBA from the Else School of Management. During this time Frascogna's camps exploded with the enrollment of hundreds of youth athletes, as well as personal training with a roster of some of Mississippi's most notable college and professional athletes. Frascogna was hired by Coach Jackie Sherrill as a speed-enhancement specialist for his 1998 Mississippi State Bulldogs — a team that ultimately earned a trip to the SEC Championship game in Atlanta. Frascogna was also tapped by Nike to serve in their emerging athletic performance enhancement division which led to him training thousands of athletes at major events across the United States and Europe.",
  "In 1999 Frascogna became president and part-owner in Speed City International — an athletic speed equipment manufacturing company founded in Portland, Oregon by his mentor, Randy Smythe. The company direct-mailed hundreds of thousands of its catalogs each year, and provided training equipment to every major college and professional sports franchise in North America, as well as notable international clients. During this time at Speed City, Frascogna began reducing his training knowledge to instructional DVD's which quickly became the best-selling products in the company's catalog. Frascogna's thirty-one instructional videos on athletic speed enhancement was the largest library of such content in existence and helped train countless athletes around the world in the late 1990's and early 2000's.",
  "Frascogna stepped away from the speed industry in 2005 to focus on the practice of law — specializing in the areas of intellectual property, entertainment, and sports. Now the proud father of four athletes himself, Frascogna has re-launched MSI to train a new generation of athletes in the Magnolia state.",
];

const VIDEOS = [
  { title: 'M3 Bio', vimeo_id: '1029090078', type: 'Bio' },
  { title: 'Coach Epsy Acceleration Drill', vimeo_id: '1054590195', type: 'Drill' },
  { title: 'Coach NS Tether Drill', vimeo_id: '1065590680', type: 'Drill' },
  { title: 'Coach PS Wall Drill', vimeo_id: '1065590471', type: 'Drill' },
  { title: 'Coach SB Change of Direction', vimeo_id: '1065590323', type: 'Drill' },
  { title: 'Ladder Drills — 1 & 2 Foot Runs', vimeo_id: '1065590864', type: 'Drill' },
  { title: 'Coach M4 Ball Drop Drill', vimeo_id: '1065591042', type: 'Drill' },
];

export default function MikeFrascogna() {
  return (
    <BioPage
      portrait={portrait}
      name="Mike Frascogna III"
      role="Founder · Owner · Coach since 1993"
      eyebrow="Founder · Owner · Coach since 1993"
      bio={BIO}
      pullquote="The largest library of instructional speed-training video ever produced — thirty-one titles, sold worldwide."
      pullquoteAfter={2}
      videos={VIDEOS}
      videoSectionTitle="From Mike"
    />
  );
}
