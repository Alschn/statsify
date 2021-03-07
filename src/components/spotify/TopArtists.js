import React, {useEffect, useState} from "react";
import {Avatar, Grid, List, ListItem, ListItemText} from "@material-ui/core";


const TopArtists = (props) => {
	const [artistsCount, setArtistsCount] = useState(20);
	const [topArtists, setTopArtists] = useState([]);
	const [timeRange, setTimeRange] = useState("short_term");

	useEffect(() => {
		getTopArtists();
	}, [artistsCount])

	const getTopArtists = () => {
		const type = 'artists';
		const URL = `https://api.spotify.com/v1/me/top/${type}?limit=${artistsCount}&time_range=${timeRange}`;
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

			<Grid container alignItems="center" justify="center">
				<List>
					{topArtists.map(
						(artist, index) => (
							<ListItem key={index}>
								<ListItemText>{index + 1}.</ListItemText>
								<ListItemText>{artist.name}</ListItemText>
								<Avatar src={artist.images[0].url} variant="square"/>
							</ListItem>
						)
					)}
				</List>
			</Grid>

		</div>
	)
}

export default TopArtists;