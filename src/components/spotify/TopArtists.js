import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import CustomSelect from "../utilities/CustomSelect";


const TopArtists = (props) => {
	const [topArtists, setTopArtists] = useState([]);
	const [artistsCount, setArtistsCount] = useState(20);
	const [timeRange, setTimeRange] = useState("short_term");

	useEffect(() => {
		getTopArtists();
	}, [artistsCount, timeRange])

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

	const handleArtistsCountChange = (event) => {
		setArtistsCount(event.target.value);
	};

	const handleTimeRangeChange = (event) => {
		setTimeRange(event.target.value);
	};

	const loadMoreArtists = () => {

	};

	return (
		<div>
			<h1>Top artists</h1>
			<CustomSelect
				labelName="Artists"
				itemsCount={artistsCount}
				handleItemsCountChange={handleArtistsCountChange}
				timeRange={timeRange}
				handleTimeRangeChange={handleTimeRangeChange}
			/>

			<Grid container alignItems="center" justify="center">
				<List>
					{topArtists.map(
						(artist, index) => (
							<ListItem key={index + artist.name}>
								<ListItemText>{index + 1}.</ListItemText>
								<ListItemText>{artist.name}</ListItemText>
								<Avatar src={artist.images[0].url} variant="square"/>
							</ListItem>
						)
					)}
				</List>
			</Grid>

			<Button variant="contained" color="primary" onClick={loadMoreArtists}>
				Load more
			</Button>

		</div>
	)
}

export default TopArtists;