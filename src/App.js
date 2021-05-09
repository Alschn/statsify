import './App.css';
import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import axiosInstance from "./utils/axiosInstance";
import {BASE_URL} from "./config";


const App = () => {
  let token = Cookies.get('spotifyAuthToken');
  const [userData, setUserData] = useState({});
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    token = Cookies.get('spotifyAuthToken');  // to be replaced
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
    axiosInstance.get(BASE_URL).then(
      response => {
        const {display_name, id, email, images: [img]} = response.data;
        setUserData({name: display_name, id: id, email: email, image_url: img.url})
      }
    ).catch(err => console.log(err))
  }

  return (
    <div className='App'>
      <Router>
        {token && (
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
        )}

        <Switch>
          <Route path="/playlists">
            <Playlists/>
          </Route>

          <Route path="/top-tracks">
            <TopTracks/>
          </Route>

          <Route path="/top-artists">
            <TopArtists/>
          </Route>

          <Route path="/recently-played">
            <RecentlyPlayed/>
          </Route>

          <Route path="/saved-library">
            <Saved/>
          </Route>

          <Route path="/featured-playlists">
            <FeaturedPlaylists/>
          </Route>

          <Route path="/new-releases">
            <NewReleases/>
          </Route>

          <Route path="/search">
            <Search/>
          </Route>

          <Route path="/redirect">
            <RedirectHome/>
          </Route>

          <Route exact path="/">
            {token ? (
              <Homepage
                userData={userData}
              />
            ) : (
              <Welcome/>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
