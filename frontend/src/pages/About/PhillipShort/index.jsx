import BioPage from '../../../components/BioPage.jsx';
import portrait from '../../../assets/portrait-philip.jpg';

const BIO = [
  "Phillip Short is a highly skilled quarterback specialist with a proven track record as both a player and a mentor. A graduate of Madison-Ridgeland Academy, Short was a standout on the football field, helping lead the team to victory in the 2019 State Championship. During that championship game, he set a Mississippi (MS) state record with a jaw dropping 593 passing yards, earning him the title of MS High School Player of the Year.",
  "After high school, Phillip attended Mississippi Gulf Coast Community College, where he continued to excel as a quarterback. His outstanding performance earned him 1st-Team JUCO All-American honors, paving the way for him to sign with Jackson State University. At JSU, he completed his college career and earned a Bachelor's degree in Finance. Phillip is currently furthering his education by pursuing a Masters of Business Administration (MBA) at Mississippi College, combining his passion for sports with a strong foundation in business and leadership.",
  "Today, Phillip is focused on training and developing the next generation of quarterbacks, as well as speed enhancement with athletes from all sports. Based in the Jackson Metro area, he works with young athletes to enhance their skills, specializing in quarterback mechanics, decision-making, and leadership on and off the field. Phillip's method combines traditional drills with advanced video analysis and sports psychology, tailoring training plans to fit each athlete's unique strengths and areas for growth. His expertise and dedication have made him a trusted coach for aspiring quarterbacks looking to reach their full potential.",
];

const VIDEOS = [
  { title: 'Phillip Short Bio Video', vimeo_id: '1027326776', type: 'Bio' },
  { title: 'Drop Back Drills', vimeo_id: '1036431560', type: 'Drill' },
  { title: 'Medicine Ball Drill', vimeo_id: '1036422233', type: 'Drill' },
  { title: 'Disassociate Drill', vimeo_id: '1022931423', type: 'Drill' },
  { title: 'Football Grip', vimeo_id: '1022932056', type: 'Drill' },
  { title: '1234 Drill', vimeo_id: '1022932565', type: 'Drill' },
];

export default function PhillipShort() {
  return (
    <BioPage
      portrait={portrait}
      name="Phillip Short"
      role="Quarterback Specialist · Lead Camp Instructor"
      eyebrow="Lead Camp Instructor"
      bio={BIO}
      pullquote="A jaw-dropping 593 passing yards in the 2019 State Championship — a Mississippi state record."
      pullquoteAfter={0}
      videos={VIDEOS}
      videoSectionTitle="From Phillip"
    />
  );
}
