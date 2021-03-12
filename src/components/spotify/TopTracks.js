import React, {useEffect, useState} from "react";
import {
	Grid,
	makeStyles,
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
import CustomSelect from "../utilities/CustomSelect";

const useStyles = makeStyles((theme) => ({
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

	const handleTracksCountChange = (event) => {
		setTracksCount(event.target.value);
	};

	const handleTimeRangeChange = (event) => {
		setTimeRange(event.target.value);
	};

	const getArtistsString = (artist) => {
		let artists_string = '';
		artist.map(
			({name}, i, arr) => i !== arr.length - 1 ? artists_string += name + ', ' : artists_string += name);
		return artists_string;
	}

	const getTrackLength = (length_ms) => {
		return new Date(length_ms).toISOString().slice(14, 19);
	}

	return (
		<div>
			<h1>Top tracks</h1>
			<CustomSelect
				labelName="Tracks"
				itemsCount={tracksCount}
				handleItemsCountChange={handleTracksCountChange}
				timeRange={timeRange}
				handleTimeRangeChange={handleTimeRangeChange}
			/>

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
									<TableCell align="left">Length</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{topTracks.map(({album, name, artists, duration_ms}, index) => (
									<TableRow key={`${index + 1}.${name}`}>
										<TableCell component="th" scope="row">
											{index + 1}.
										</TableCell>
										<TableCell align="left">
											<Avatar src={album.images[2].url} variant="square"/>
										</TableCell>
										<TableCell align="left">{name}</TableCell>
										<TableCell align="left">{getArtistsString(artists)}</TableCell>
										<TableCell align="left">{getTrackLength(duration_ms)}</TableCell>
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