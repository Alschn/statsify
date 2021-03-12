import React, {useCallback, useEffect, useState} from "react";

// query parameters: locale, country, limit, offset

const FeaturedPlaylists = (props) => {
	const [playlistCount, setPlaylistCount] = useState(20);
	const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

	// const [country, setCountry] = useState();

	const URL = `https://api.spotify.com/v1/browse/featured-playlists?limit=${playlistCount}`;

	const getFeaturedPlaylists = useCallback(() => {
		fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${props.token}`,
				'Content-Type': 'application/json'
			},
		}).then(
			response => response.json()
		).then(
			data => {
				// console.log(data);
				setFeaturedPlaylists(data);
			}
		).catch(err => console.log(err))
	}, [props.token, URL])

	useEffect(() => {
		getFeaturedPlaylists();
	}, [getFeaturedPlaylists])


	return (
		<div>
			<h1>Featured playlists</h1>
			<h1>{featuredPlaylists.message}</h1>
			<pre>{featuredPlaylists ? JSON.stringify(featuredPlaylists, null, 2) : null}</pre>
		</div>
	);
}

export default FeaturedPlaylists;