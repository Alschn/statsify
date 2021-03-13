import React, {useEffect, useState} from "react";
import {Card, Grid} from "@material-ui/core";

const Saved = (props) => {
	const [albums, setAlbums] = useState([]);
	const [tracks, setTracks] = useState([]);
	const [totalAlbums, setTotalAlbums] = useState(null);
	const [totalTracks, setTotalTracks] = useState(null);

	let albumsCount = 10;
	let tracksCount = 10;

	useEffect(() => {
		getSavedAlbums();
		getSavedTracks();
	}, [])

	const getSavedAlbums = () => {
		const URL = `https://api.spotify.com/v1/me/albums?limit=${albumsCount}`;
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
				setAlbums(data.items);
				setTotalAlbums(data.total);
			}
		).catch(err => console.log(err))
	}

	const getSavedTracks = () => {
		const URL = `https://api.spotify.com/v1/me/tracks?limit=${tracksCount}`;
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
				setTracks(data.items);
				setTotalTracks(data.total);
			}
		).catch(err => console.log(err))
	}

	return (
		<Grid container justify="center">
			<Grid item xs={12} md={8} container direction="column">
				<h1>Saved albums ({totalAlbums}):</h1>

				<Grid container direction="row" justify="center" spacing={2}>
					{albums.map(({album}) => (
							<Grid item>
								<Card>
									<img src={album.images[1].url} alt="" width="200px" height="200px"/>
									<p style={{fontSize: 12}}>{album.name}</p>
									{/*<p style={{fontSize: 12}}>{album.artists.map((artist) => (`${artist.name} `))}</p>*/}
								</Card>
							</Grid>
						)
					)
					}
				</Grid>
			</Grid>

			<Grid item xs={6} lg={6}>
				<h1>Saved tracks ({totalTracks}):</h1>
				{tracks.map(({track}) => (<p>{track.name}</p>))}
			</Grid>
		</Grid>
	)
}


export default Saved;