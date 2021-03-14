export const getArtistsString = (artists) => {
	return artists.reduce((total, {name}, currentIndex, arr) => (
		total += currentIndex !== arr.length - 1 ? `${name}, ` : name
	), ``)
}

export const getTrackLength = (length_ms) => {
	return new Date(length_ms).toISOString().slice(14, 19);
}

export const getFormattedDate = (date) => {
	return new Date(date).toLocaleString();
}

export const getAddedAtFormattedDate = (added_at) => {
	// to do
}