import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";


const RecentlyPlayed = (props) => {
	const [recentTracks, setRecentTracks] = useState([]);
	const [tracksCount, setTracksCount] = useState(20);
	const [nextPage, setNextPage] = useState("");

	const URL = `https://api.spotify.com/v1/me/player/recently-played?limit=${tracksCount}`;

	useEffect(() => {
		getRecentlyPlayedTracks(URL);
		return () => setNextPage("");
	}, [tracksCount])

	const getRecentlyPlayedTracks = (url) => {
		fetch(url, {
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
				if (recentTracks.length === 0) setRecentTracks(data.items);	// initial setter
				else setRecentTracks(prevState => [...prevState, ...data.items]);

				if (data.next) {
					setNextPage(data.next);
				}
			}
		).catch(err => console.log(err))
	}

	const handleLoadMoreTracks = () => {
		if (!nextPage) return;
		getRecentlyPlayedTracks(nextPage);
	}

	return (
		<div>
			<h1>Recently played</h1>
			<h3>🔄 Refresh page to fetch current data</h3>
			<Grid container alignItems="center" justify="center">
				<List>
					{recentTracks.map(({track, played_at}, index) => (
						<ListItem key={index}>
							<Avatar variant="square" src={track.album.images[2].url} alt=""/>
							<ListItemText>{track.name} {played_at}</ListItemText>
						</ListItem>
					))
					}
				</List>
			</Grid>


			<Button variant="contained" color="primary" onClick={handleLoadMoreTracks}>
				Load more
			</Button>
		</div>
	)
}

export default RecentlyPlayed;