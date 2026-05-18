import data from './episodes.json';
import ep1Thumb from '../../assets/podcast/winner_EP1.jpg';
import ep2Thumb from '../../assets/podcast/b-EP2.jpg';

const THUMBNAILS = {
  ep1: ep1Thumb,
  ep2: ep2Thumb,
};

export const EPISODES = data.map((ep) => ({
  ...ep,
  thumbnail: THUMBNAILS[ep.thumbnailKey],
}));

export const EPISODES_BY_SLUG = Object.fromEntries(
  EPISODES.map((ep) => [ep.slug, ep]),
);
