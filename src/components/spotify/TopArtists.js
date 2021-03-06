import React, {useEffect, useState} from "react";


const TopArtists = (props) => {
	const [artistsCount, setArtistsCount] = useState(20);
	const [topArtists, setTopArtists] = useState([]);

	useEffect(() => {
		getTopArtists();
	}, [artistsCount])

	const getTopArtists = () => {
		const type = 'artists';
		const URL = `https://api.spotify.com/v1/me/top/${type}?limit=${artistsCount}`;
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
				console.log(data);
				setTopArtists(data.items);
			}
		).catch(err => console.log(err))
	}

	return (
		<div>
			<h1>Top artists</h1>

			{topArtists.map(
				artist => (<p>{artist.name}</p>)
			)}
		</div>
	)
}

export default TopArtists;