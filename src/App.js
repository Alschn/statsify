import './App.css';
import React, {useEffect, useState} from 'react'
import {Scopes, SpotifyAuth} from "react-spotify-auth";
import {SpotifyApiContext} from 'react-spotify-api';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import {Avatar} from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import Playlists from "./components/spotify/Playlists";
import TopTracks from "./components/spotify/TopTracks";
import TopArtists from "./components/spotify/TopArtists";
import RecentlyPlayed from "./components/spotify/RecentlyPlayed";
import {REDIRECT_URI, CLIENT_ID} from "./config";


const App = () => {
	const token = Cookies.get('spotifyAuthToken');
	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserData()
	}, [])

	const getUserData = () => {
		const BASE_URL = 'https://api.spotify.com/v1/me';
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
				console.log(data);
				setUserData({name: display_name, id: id, email: email, image_url: images[0].url})
			}
		).catch(err => console.log(err))
	}

	return (
		<Router>
			<div className='App'>
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

					<Route path="/redirect">
						<Redirect to="/"/>
					</Route>

					<Route exact path="/">
						<div className='App-header'>
							{token ? (
								<SpotifyApiContext.Provider value={token}>

									<nav>
										<ul style={{listStyleType: "none"}}>
											<li>
												<Link to="/">Home</Link>
											</li>
											<li>
												<Link to="/top-tracks">Your top tracks</Link>
											</li>
											<li>
												<Link to="/top-artists">Your top artists</Link>
											</li>
											<li>
												<Link to="/playlists">Your playlists</Link>
											</li>
											<li>
												<Link to="/recently-played">Recently played tracks</Link>
											</li>
										</ul>
									</nav>

									<h6>Token: {token}</h6>

									{Object.keys(userData).length !== 0 ?
										(<div>
											<Avatar src={userData.image_url}/>
											{userData.name} {userData.id} {userData.email}
										</div>) :
										(<></>)
									}


								</SpotifyApiContext.Provider>
							) : (
								<SpotifyAuth
									redirectUri={REDIRECT_URI}
									clientID={CLIENT_ID}
									scopes={[
										Scopes.userReadPrivate, Scopes.userReadEmail,
										Scopes.userTopRead, Scopes.userReadRecentlyPlayed,
										Scopes.playlistReadPrivate, Scopes.playlistReadCollaborative,
									]}
									title='Log in with Spotify'
								/>
							)}

						</div>
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App;
