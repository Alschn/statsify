import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";

const Playlists = (props) => {
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [playlistCount, setPlaylistCount] = useState(20);
	const [nextPlaylists, setNextPlaylists] = useState("");

	let URL = `https://api.spotify.com/v1/me/playlists?limit=${playlistCount}`;

	useEffect(() => {
		getUserPlaylists(URL);
	}, [])

	const getUserPlaylists = (url) => {
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
				if (userPlaylists.length === 0) setUserPlaylists(data.items);
				// else setUserPlaylists(prevState => [...prevState, ...data.items])

				if (data.next) setNextPlaylists(data.next);
			}
		).catch(err => console.log(err))
	}

	const handleLoadMorePlaylists = () => {
		if (!nextPlaylists) return;
		// getUserPlaylists(url)
	}

	return (
		<div>
			<h1>Playlists</h1>

			{userPlaylists.map(
				(playlist, index) => (
					<p key={index}>{playlist.name}</p>
				)
			)}

			<Button variant="contained" color="primary" onClick={handleLoadMorePlaylists}>
				Load more
			</Button>
		</div>
	)
}

export default Playlists;