import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';

try {
  TimeAgo.addDefaultLocale(en)
} catch (e) {}

export const getArtistsString = (artists) => {
	return artists.reduce((total, {name}, currentIndex, arr) => (
		total += currentIndex !== arr.length - 1 ? `${name}, ` : name
	), ``)
};

export const getTrackLength = (length_ms) => {
	return new Date(length_ms).toISOString().slice(14, 19);
};

export const getFormattedDate = (date) => {
	return new Date(date).toLocaleString();
};

export const getTimePassedSinceAdded = (added_at) => {
  const timeAgo = new TimeAgo('en-US');
  const diff = Date.now() - new Date(added_at);
  return timeAgo.format(Date.now() - diff)
};
