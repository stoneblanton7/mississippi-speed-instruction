import data from './episodes.json';
import ep1Thumb from '../../assets/podcast/winner_EP1.jpg';
import ep2Thumb from '../../assets/podcast/b-EP2.jpg';
import ep3Thumb from '../../assets/podcast/ep3_stone.jpg';
import ep4Thumb from '../../assets/podcast/ep4_mike.jpg';
import ep5Thumb from '../../assets/podcast/ep5_mcelroy.jpg';

const THUMBNAILS = {
  ep1: ep1Thumb,
  ep2: ep2Thumb,
  ep3: ep3Thumb,
  ep4: ep4Thumb,
  ep5: ep5Thumb,
};

export const EPISODES = data.map((ep) => ({
  ...ep,
  thumbnail: THUMBNAILS[ep.thumbnailKey],
}));

export const EPISODES_BY_SLUG = Object.fromEntries(
  EPISODES.map((ep) => [ep.slug, ep]),
);
