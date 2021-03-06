import React, {useEffect, useState} from "react";

const Playlists = (props) => {
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		getUserPlaylists();
	}, [])

	const getUserPlaylists = () => {
		const playlistCount = 50; // up to 50
		const url = `https://api.spotify.com/v1/me/playlists?limit=${playlistCount}`;
		fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${props.token}`,
					'Content-Type': 'application/json'
				},
			}
		).then(
			response => response.json()
		).then(
			data => {
				console.log(data);
				setUserPlaylists(data.items);
			}
		).catch(err => console.log(err))
	}

	return (
		<div>
			<h1>Playlists</h1>

			{userPlaylists.map(
				(playlist) => (<p>{playlist.name}</p>)
			)}
		</div>
	)
}

export default Playlists;