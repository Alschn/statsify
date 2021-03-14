import React, {useEffect, useState} from "react";
import {
	Avatar,
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid, Paper,
	Radio,
	RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import {
	getArtistsString,
	getFormattedDate,
	getTrackLength
} from "../../utils/dataFormat";
import {makeStyles} from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
	topBox: {
		paddingTop: 20,
	},
	albums: {
		margin: 0,
	},
	buttonBox: {
		padding: 20,
	}
})

const Saved = (props) => {
	const classes = useStyles();

	const [selectType, setSelectType] = useState("albums");
	const [albums, setAlbums] = useState([]);
	const [tracks, setTracks] = useState([]);
	const [totalAlbums, setTotalAlbums] = useState(null);
	const [totalTracks, setTotalTracks] = useState(null);
	const [nextAlbums, setNextAlbums] = useState(null);
	const [nextTracks, setNextTracks] = useState(null);

	let albumsCount = 10;
	let tracksCount = 20;

	useEffect(() => {
		getItems(selectType);
	}, [selectType])

	const getItems = (type) => {
		const count = type === "tracks" ? tracksCount : albumsCount;
		const URL = `https://api.spotify.com/v1/me/${type}?limit=${count}`;
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
				if (type === "tracks") {
					setTracks(data.items);
					setTotalTracks(data.total);
					setNextTracks(data.next);
				} else {
					setAlbums(data.items);
					setTotalAlbums(data.total);
					setNextAlbums(data.next);
				}
			}
		).catch(err => console.log(err))
	}

	const handleRadioOnChange = (event) => {
		setSelectType(event.target.value);
	}

	const loadMoreTracks = () => {
		if (nextTracks) {
			fetch(nextTracks.toString(), {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${props.token}`,
					'Content-Type': 'application/json'
				},
			}).then(
				response => response.json()
			).then(
				data => {
					console.log(data, "Next data");
					setTracks(prevState => [...prevState, ...data.items]);
					setNextTracks(data.next);
				}
			).catch(err => console.log(err))
		}
	}

	return (
		<Grid container justify="center">
			<Grid item xs={12} className={classes.topBox}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Select item type</FormLabel>
					<RadioGroup
						row
						aria-label="itemType"
						name="itemType"
						defaultValue={selectType}
						onChange={handleRadioOnChange}
					>
						<FormControlLabel
							value="tracks"
							control={<Radio color="primary"/>}
							label="Tracks"
							labelPlacement="top"
						/>
						<FormControlLabel
							value="albums"
							control={<Radio color="secondary"/>}
							label="Albums"
							labelPlacement="top"
						/>

					</RadioGroup>
				</FormControl>
			</Grid>

			{selectType === "albums" ? (
				<>
					<Grid item xs={12} md={8} container direction="column" spacing={1}>
						<h1>Saved albums ({totalAlbums}):</h1>

						<Grid container direction="row" justify="center" spacing={2} className={classes.albums}>
							{albums.map(({album}, index) => (
									<Grid item key={index + album.name}>
										<Card style={{maxWidth: 200}}>
											<img src={album.images[1].url} alt="" width="200px" height="200px"/>
											<p style={{fontSize: 14}}>{album.name}</p>
											<p style={{fontSize: 12}}>{getArtistsString(album.artists)}</p>
										</Card>
									</Grid>
								)
							)
							}
						</Grid>
					</Grid>

					<Grid container justify="center" className={classes.buttonBox}>
						<Button variant="contained" color="primary">
							Load more
						</Button>
					</Grid>
				</>

			) : (
				<Grid item xs={12} md={8} lg={10}>
					<h1>Saved tracks ({totalTracks}):</h1>
					<TableContainer component={Paper} className={classes.tableContainer}>
						<InfiniteScroll
							next={loadMoreTracks}
							hasMore={nextTracks !== null}
							loader={<h2>Loading more tracks ...</h2>}
							dataLength={tracks.length}
							children={tracks}
						>
							<Table aria-label="simple table" size="small">
								<TableHead>
									<TableRow>
										<TableCell align="left"/>
										<TableCell align="left">Title</TableCell>
										<TableCell align="left">Artists</TableCell>
										<TableCell align="left">Album</TableCell>
										<TableCell align="left"><TodayIcon fontSize="small"/></TableCell>
										<TableCell align="left"><AccessTimeIcon fontSize="small"/></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tracks.map(({track, added_at}, index) => (
										<TableRow key={`${index + 1}.${track.name}`}>
											<TableCell component="th" scope="row"/>
											<TableCell align="left">{track.name}</TableCell>
											<TableCell align="left">{getArtistsString(track.artists)}</TableCell>
											<TableCell align="left">{track.album.name}</TableCell>
											<TableCell align="left">{getFormattedDate(added_at)}</TableCell>
											<TableCell align="left">{getTrackLength(track.duration_ms)}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</InfiniteScroll>
					</TableContainer>
				</Grid>
			)}
		</Grid>
	)
}

export default Saved;
