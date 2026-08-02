import data from './episodes.json';
import ep1Thumb from '../../assets/podcast/winner_EP1.jpg';
import ep2Thumb from '../../assets/podcast/b-EP2.jpg';
import ep3Thumb from '../../assets/podcast/ep3_stone.jpg';
import ep4Thumb from '../../assets/podcast/ep4_mike.jpg';
import ep5Thumb from '../../assets/podcast/ep5_mcelroy.jpg';
import ep6Thumb from '../../assets/podcast/ep6_weaver.jpg';
import ep7Thumb from '../../assets/podcast/ep7_bowman.jpg';

const THUMBNAILS = {
  ep1: ep1Thumb,
  ep2: ep2Thumb,
  ep3: ep3Thumb,
  ep4: ep4Thumb,
  ep5: ep5Thumb,
  ep6: ep6Thumb,
  ep7: ep7Thumb,
};

export const EPISODES = data.map((ep) => ({
  ...ep,
  thumbnail: THUMBNAILS[ep.thumbnailKey],
}));

export const EPISODES_BY_SLUG = Object.fromEntries(
  EPISODES.map((ep) => [ep.slug, ep]),
);
