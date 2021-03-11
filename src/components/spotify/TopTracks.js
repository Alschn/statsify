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
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper
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
	tableContainer: {
		marginTop: 10,
		marginBottom: 10,
	},
}));

const TopTracks = (props) => {
	const classes = useStyles();

	const [tracksCount, setTracksCount] = useState(20);
	const [timeRange, setTimeRange] = useState('medium_term');
	const [topTracks, setTopTracks] = useState([]);
	const [nextPage, setNextPage] = useState(null);

	const URL = `https://api.spotify.com/v1/me/top/tracks?limit=${tracksCount}&time_range=${timeRange}`;

	const handleTracksCountChange = (event) => {
		setTracksCount(event.target.value);
	};

	const handleTimeRangeChange = (event) => {
		setTimeRange(event.target.value);
	};

	useEffect(() => {
		getTopTracks(URL);
		return () => {
			setTopTracks([]);
			setNextPage(null);
		}
	}, [tracksCount, timeRange])

	const getTopTracks = (url) => {
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
				if (topTracks.length === 0) setTopTracks(data.items);	// initial setter
				else setTopTracks(prevState => [...prevState, ...data.items]);
				setNextPage(data.next);
			}
		).catch(err => console.log(err))
	}

	const handleLoadMoreTracks = () => {
		if (!nextPage) return;
		getTopTracks(nextPage);
	}

	const getArtistsString = (artist) => {
		let artists_string = '';
		artist.map(
			({name}, i, arr) => i !== arr.length - 1 ? artists_string += name + ', ' : artists_string += name);
		return artists_string;
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
				<Grid item xs={12} md={6} lg={6}>
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left"/>
									<TableCell align="left">Track</TableCell>
									<TableCell align="left"/>
									<TableCell align="left">Artists</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{topTracks.map(({album, name, artists}, index) => (
									<TableRow key={`${index+1}.${name}`}>
										<TableCell component="th" scope="row" className={classes.indexColumn}>
											{index + 1}.
										</TableCell>
										<TableCell align="left">
											<Avatar src={album.images[2].url} variant="square"/>
										</TableCell>
										<TableCell align="left">{name}</TableCell>
										<TableCell align="left">{getArtistsString(artists)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>

			<Button variant="contained" color="primary" onClick={handleLoadMoreTracks}>
				Load more
			</Button>
		</div>
	)
}

export default TopTracks;