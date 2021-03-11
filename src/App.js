import './App.css';
import React, {useEffect, useState} from 'react'
import {Scopes, SpotifyAuth} from "react-spotify-auth";
import {SpotifyApiContext} from 'react-spotify-api';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import {Avatar, Grid} from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Playlists from "./components/spotify/Playlists";
import TopTracks from "./components/spotify/TopTracks";
import TopArtists from "./components/spotify/TopArtists";
import RecentlyPlayed from "./components/spotify/RecentlyPlayed";
import Saved from "./components/spotify/Saved";
import FeaturedPlaylists from "./components/spotify/FeaturedPlaylists";
import NewReleases from "./components/spotify/NewReleases";
import {REDIRECT_URI, CLIENT_ID} from "./config";
import Search from "./components/spotify/Search";


const App = () => {
	const token = Cookies.get('spotifyAuthToken');
	const [userData, setUserData] = useState({});
	const BASE_URL = 'https://api.spotify.com/v1/me';

	useEffect(() => {
		getUserData()
	}, [])

	const getUserData = () => {
		fetch(BASE_URL,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
			}
		).then(
			response => response.json()
		).then(
			data => {
				const {display_name, id, email, images} = data;
				setUserData({name: display_name, id: id, email: email, image_url: images[0].url})
			}
		).catch(err => console.log(err))
	}

	return (
		<Router>
			<div className='App'>
				{token ? <Navbar/> : null}

				<Switch>
					<Route path="/playlists">
						<Playlists token={token}/>
					</Route>

					<Route path="/top-tracks">
						<TopTracks token={token}/>
					</Route>

					<Route path="/top-artists">
						<TopArtists token={token}/>
					</Route>

					<Route path="/recently-played">
						<RecentlyPlayed token={token}/>
					</Route>

					<Route path="/saved-library">
						<Saved token={token}/>
					</Route>

					<Route path="/featured-playlists">
						<FeaturedPlaylists token={token}/>
					</Route>

					<Route path="/new-releases">
						<NewReleases token={token}/>
					</Route>

					<Route path="/search">
						<Search token={token}/>
					</Route>

					<Route path="/redirect">
						<Redirect to="/"/>
					</Route>

					<Route exact path="/">
						<div>
							{token ? (
								<SpotifyApiContext.Provider value={token}>

									<h6>Token: {token}</h6>

									<Grid container direction="row" justify="center" alignItems="center" spacing={1}
												className="App-header">
										{Object.keys(userData).length !== 0 ?
											(
												<>
													<Grid item>
														<Avatar src={userData.image_url}/>
													</Grid>
													<Grid item>
														{userData.name}
													</Grid>
												</>
											)
											:
											null
										}
									</Grid>
								</SpotifyApiContext.Provider>
							) : (
								<div className="App-header">
									<SpotifyAuth
										redirectUri={REDIRECT_URI}
										clientID={CLIENT_ID}
										scopes={[
											Scopes.userReadPrivate, Scopes.userReadEmail,
											Scopes.userTopRead, Scopes.userReadRecentlyPlayed,
											Scopes.userLibraryRead, Scopes.userLibraryModify,
											Scopes.playlistReadPrivate, Scopes.playlistReadCollaborative,
										]}
										title='Log in with Spotify'
									/>
								</div>
							)}

						</div>
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App;
