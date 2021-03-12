import React, {useEffect, useState} from "react";
import {
	Avatar,
	Button,
	Grid,
	makeStyles,
	Paper,
	Table, TableBody, TableCell,
	TableContainer,
	TableHead, TableRow
} from "@material-ui/core";

const useStyles = makeStyles({
	tableContainer: {
		marginTop: 10,
		marginBottom: 10,
	},
});

const RecentlyPlayed = (props) => {
	const classes = useStyles();

	const [recentTracks, setRecentTracks] = useState([]);
	const [tracksCount, setTracksCount] = useState(20);
	const [nextPage, setNextPage] = useState(null);

	const URL = `https://api.spotify.com/v1/me/player/recently-played?limit=${tracksCount}`;

	useEffect(() => {
		getRecentlyPlayedTracks(URL);
		return () => {
			setNextPage(null);
			setRecentTracks([]);
		}
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

				setNextPage(data.next);
			}
		).catch(err => console.log(err))
	}

	const handleLoadMoreTracks = () => {
		if (!nextPage) return;
		getRecentlyPlayedTracks(nextPage);
	}

	const getArtistsString = (artist) => {
		let artists_string = '';
		artist.map(
			({name}, i, arr) => i !== arr.length - 1 ? artists_string += name + ', ' : artists_string += name);
		return artists_string;
	}

	const getTrackLength = (length_ms) => {
		return new Date(length_ms).toISOString().slice(14, 19);
	}

	const getFormattedDate = (date) => {
		return new Date(date).toLocaleString();
	}

	return (
		<div>
			<h1>Recently played</h1>
			<h3>🔄 Refresh page to fetch current data</h3>
			<Grid container alignItems="center" justify="center">
				<Grid item xs={12} md={8} lg={6}>
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table aria-label="simple table" size="small">
							<TableHead>
								<TableRow>
									<TableCell align="left"/>
									<TableCell align="left">Track</TableCell>
									<TableCell align="left"/>
									<TableCell align="left">Album</TableCell>
									<TableCell align="left">Artists</TableCell>
									<TableCell align="left">Length</TableCell>
									<TableCell align="left">Last played</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{recentTracks.map(({track, played_at}, index) => (
									<TableRow key={`${index + 1}.${track.name}`}>
										<TableCell component="th" scope="row">
											{index + 1}.
										</TableCell>
										<TableCell align="left">
											<Avatar src={track.album.images[2].url} variant="square"/>
										</TableCell>
										<TableCell align="left">{track.name}</TableCell>
										<TableCell align="left">{track.album.name}</TableCell>
										<TableCell align="left">{getArtistsString(track.artists)}</TableCell>
										<TableCell align="left">{getTrackLength(track.duration_ms)}</TableCell>
										<TableCell align="left">{getFormattedDate(played_at)}</TableCell>
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

export default RecentlyPlayed;