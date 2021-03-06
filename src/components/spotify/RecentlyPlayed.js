import React, {useEffect, useState} from "react";


const RecentlyPlayed = (props) => {
	const [recentTracks, setRecentTracks] = useState([]);
	const [tracksCount, setTracksCount] = useState(20);

	useEffect(() => {
		getRecentlyPlayedTracks()
	}, [tracksCount])

	const getRecentlyPlayedTracks = () => {
		const URL = `https://api.spotify.com/v1/me/player/recently-played?limit=${tracksCount}`;
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
				setRecentTracks(data.items);
			}
		).catch(err => console.log(err))
	}

	return (
		<div>
			<h1>Recently played</h1>
			{recentTracks.map(({track}) => (<p>{track.name}</p>))}
		</div>
	)
}

export default RecentlyPlayed;