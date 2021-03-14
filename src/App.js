import './App.css';
import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Playlists from "./components/spotify/Playlists";
import TopTracks from "./components/spotify/TopTracks";
import TopArtists from "./components/spotify/TopArtists";
import RecentlyPlayed from "./components/spotify/RecentlyPlayed";
import Saved from "./components/spotify/Saved";
import FeaturedPlaylists from "./components/spotify/FeaturedPlaylists";
import NewReleases from "./components/spotify/NewReleases";
import Search from "./components/spotify/Search";
import RedirectHome from "./components/spotify/Redirect";
import DrawerComponent from "./components/layout/Drawer";
import ToolbarComponent from "./components/layout/Toolbar";
import Homepage from "./components/layout/Homepage";
import Welcome from "./components/layout/Welcome";


const App = () => {
	let token = Cookies.get('spotifyAuthToken');
	const [userData, setUserData] = useState({});
	const [sidebar, setSidebar] = useState(false);
	const BASE_URL = 'https://api.spotify.com/v1/me';

	useEffect(() => {
		token = Cookies.get('spotifyAuthToken');
	})

	useEffect(() => {
		if (token) getUserData();
	}, [])

	const toggleDrawer = () => {
		setSidebar(false);
	}

	const openDrawer = () => {
		setSidebar(true);
	}

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
				{token ? (
					<div>
						<ToolbarComponent
							openDrawerHandler={openDrawer}
							userInfo={userData}
						/>
						<DrawerComponent
							left={sidebar}
							toggleDrawerHandler={toggleDrawer}
						/>
					</div>
				) : null}

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
						<RedirectHome/>
					</Route>

					<Route exact path="/">
						{token ? (
							<Homepage
								token={token}
								userData={userData}
							/>
						) : (
							<Welcome/>
						)}

					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App;
