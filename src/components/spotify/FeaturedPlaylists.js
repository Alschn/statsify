import React, {useCallback, useEffect, useState} from "react";
import {Card, Grid, Paper} from "@material-ui/core";

// query parameters: locale, country, limit, offset

const FeaturedPlaylists = (props) => {
	const [playlistCount, setPlaylistCount] = useState(20);
	const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

	// const [country, setCountry] = useState();

	const URL = `https://api.spotify.com/v1/browse/featured-playlists?limit=${playlistCount}`;

	const getFeaturedPlaylists = useCallback(() => {
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
				const {playlists: {items}} = data;
				setFeaturedPlaylists(items);
			}
		).catch(err => console.log(err))
	}, [props.token, URL])

	useEffect(() => {
		getFeaturedPlaylists();
	}, [getFeaturedPlaylists])


	return (
		<Grid container justify="center">
			<Grid item xs={12}>
				<h1>Featured playlists</h1>
				<h1>{featuredPlaylists.message}</h1>
			</Grid>

			<Grid item xs={12} lg={6} container direction="column" spacing={1}>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="row"
					spacing={2}
				>
					{featuredPlaylists.map(({name, description, images}, index) => (
						<Grid item key={index + name}>
							<Card style={{maxWidth: 200}}>
								<img src={images[0].url} alt="" height={200} width={200}/>
								<p>{name}</p>
								<p>{description}</p>
							</Card>
						</Grid>
					))}
				</Grid>
			</Grid>

			{/*<pre>{featuredPlaylists ? JSON.stringify(featuredPlaylists, null, 2) : null}</pre>*/}
		</Grid>
	);
}

export default FeaturedPlaylists;
