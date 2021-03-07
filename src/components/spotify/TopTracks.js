import React, {useEffect, useState} from "react";
import {
	FormControl,
	FormGroup,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Avatar,
	List,
	ListItem, ListItemText, Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
		maxWidth: 300,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const TopTracks = (props) => {
	const classes = useStyles();

	const [tracksCount, setTracksCount] = useState(20);
	const [timeRange, setTimeRange] = useState('medium_term');
	const [topTracks, setTopTracks] = useState([]);

	const handleTracksCountChange = (event) => {
		setTracksCount(event.target.value);
	};

	const handleTimeRangeChange = (event) => {
		setTimeRange(event.target.value);
	};

	useEffect(() => {
		getTopTracks();
	}, [tracksCount, timeRange])
	// fetchBusiness method??

	const getTopTracks = () => {
		const type = 'tracks';
		const URL = `https://api.spotify.com/v1/me/top/${type}?limit=${tracksCount}&time_range=${timeRange}`;
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
				setTopTracks(data.items);
			}
		).catch(err => console.log(err))
	}

	const handleLoadMoreTracks = () => {

	}

	return (
		<div>
			<h1>Top tracks</h1>
			<Grid container spacing={1} alignItems="center" justify="center">
				<FormGroup row={true}>
					<FormControl className={classes.formControl}>
						<InputLabel id="select-track-count-label">Tracks count</InputLabel>
						<Select
							labelId="select-track-count-label"
							id="select-track-count"
							value={tracksCount}
							onChange={handleTracksCountChange}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={30}>30</MenuItem>
							<MenuItem value={40}>40</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</FormControl>


					<FormControl className={classes.formControl}>
						<InputLabel id="select-time-range-label">Time range</InputLabel>
						<Select
							labelId="select-time-range-label"
							id="select-time-range"
							value={timeRange}
							onChange={handleTimeRangeChange}
						>
							<MenuItem value={"short_term"}>1 month</MenuItem>
							<MenuItem value={"medium_term"}>6 months</MenuItem>
							<MenuItem value={"long_term"}>all time</MenuItem>
						</Select>
					</FormControl>
				</FormGroup>
			</Grid>

			<Grid container alignItems="center" justify="center">
				<List>
					{topTracks.map(
						(track, index) => (
							<ListItem key={index}>
								<Avatar src={track.album.images[2].url} variant="square"/>
								<ListItemText>{index + 1}. {track.name}</ListItemText>
							</ListItem>
						)
					)}
				</List>
			</Grid>
			<Button variant="contained" color="primary" onClick={handleLoadMoreTracks}>
				Load more
			</Button>
		</div>
	)
}

export default TopTracks;