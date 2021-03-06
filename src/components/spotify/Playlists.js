import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Playlists = (props) => {
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [playlistCount, setPlaylistCount] = useState(30);
	const [nextPlaylists, setNextPlaylists] = useState(null);

	let URL = `https://api.spotify.com/v1/me/playlists?limit=${playlistCount}`;

	useEffect(() => {
		getUserPlaylists(URL);
		return () => {
			setNextPlaylists(null);
			setUserPlaylists([]);
		}
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
				else setUserPlaylists(prevState => [...prevState, ...data.items])

				setNextPlaylists(data.next);
			}
		).catch(err => console.log(err))
	}

	const handleLoadMorePlaylists = () => {
		if (!nextPlaylists) return;
		getUserPlaylists(nextPlaylists);
	}

	return (
		<div>
			<h1>Playlists</h1>
			{/* Add styling later so that infinite scroll could work on higher resolution devices*/}
			<InfiniteScroll
				next={handleLoadMorePlaylists}
				hasMore={nextPlaylists !== null}
				loader={<h2>Loading more data...</h2>}
				dataLength={userPlaylists.length}
			>
				{userPlaylists.map(
					(playlist, index) => (
						<p key={index + playlist.name}>{playlist.name}</p>
					)
				)}
			</InfiniteScroll>
		</div>
	)
}

export default Playlists;