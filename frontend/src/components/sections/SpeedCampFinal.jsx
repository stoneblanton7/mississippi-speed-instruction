import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import { REGISTER_LINK_PROPS } from '../../config.js';
import imgHurdles from '../../assets/camp-boys-card.webp';
import imgParachute from '../../assets/kids-camp-4.jpg';
import imgCoaching from '../../assets/kids-camp (3).jpg';
import imgHuddle from '../../assets/camp-huddle.webp';

export default function SpeedCampFinal() {
  return (
    <section className="bg-bg py-24 md:py-32 lg:py-40 px-6 md:px-12 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.4em] mb-6">
              Summer 2026
            </p>

            <h2
              className="font-heading text-text uppercase leading-[1.0] mb-8"
              style={{ fontSize: 'clamp(64px, 10vw, 144px)' }}
            >
              Speed
              <br />
              Camp
            </h2>

            <p className="font-body text-text-muted text-lg lg:text-xl leading-relaxed mb-4 max-w-md">
              Three days. Ten elements. One faster athlete.
            </p>

            <p className="font-body text-text-muted text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Madison Ridgeland Academy. Boys June 9–11 · Girls June 23–25.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                {...REGISTER_LINK_PROPS}
                variant="primary"
                size="lg"
                arrow
              >
                Register for Camp
              </Button>
              <Button as={Link} to="/camp/boys" variant="ghost" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 h-[500px] md:h-[640px]">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-sm bg-surface">
                <img
                  src={imgHurdles}
                  alt="Two MSI athletes sprinting through agility hurdles"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="col-span-2 row-span-2 overflow-hidden rounded-sm bg-surface">
                <img
                  src={imgParachute}
                  alt="MSI athletes running the parachute drill"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="col-span-2 row-span-2 overflow-hidden rounded-sm bg-surface">
                <img
                  src={imgCoaching}
                  alt="MSI coach training a young athlete in stance technique"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="col-span-6 row-span-2 overflow-hidden rounded-sm bg-surface">
                <img
                  src={imgHuddle}
                  alt="MSI coach talking with a group of athletes"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
