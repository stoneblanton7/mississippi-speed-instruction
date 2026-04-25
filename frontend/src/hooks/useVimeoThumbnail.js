import { useEffect, useState } from 'react';
import { VIMEO_HASHES } from '../config.js';

const cache = new Map();
const inflight = new Map();

function fetchThumbnail(vimeoId, vimeoHash) {
  const key = `${vimeoId}_${vimeoHash || ''}`;
  if (cache.has(key)) return Promise.resolve(cache.get(key));
  if (inflight.has(key)) return inflight.get(key);

  const videoUrl = vimeoHash
    ? `https://vimeo.com/${vimeoId}/${vimeoHash}`
    : `https://vimeo.com/${vimeoId}`;
  const oembed = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`;

  const promise = fetch(oembed)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const url = data?.thumbnail_url || null;
      cache.set(key, url);
      inflight.delete(key);
      return url;
    })
    .catch(() => {
      cache.set(key, null);
      inflight.delete(key);
      return null;
    });

  inflight.set(key, promise);
  return promise;
}

export function useVimeoThumbnail(vimeoId, explicitHash) {
  const hash = explicitHash ?? (vimeoId ? VIMEO_HASHES[vimeoId] : null);
  const key = `${vimeoId}_${hash || ''}`;
  const [thumbnail, setThumbnail] = useState(() =>
    cache.has(key) ? cache.get(key) : null,
  );

  useEffect(() => {
    if (!vimeoId) return;
    let cancelled = false;
    fetchThumbnail(vimeoId, hash).then((url) => {
      if (!cancelled) setThumbnail(url);
    });
    return () => {
      cancelled = true;
    };
  }, [vimeoId, hash]);

  return thumbnail;
}
