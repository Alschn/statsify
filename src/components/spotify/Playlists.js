import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Grid} from "@material-ui/core";
import axiosInstance from "../../utils/axiosInstance";


const Playlists = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [nextPlaylists, setNextPlaylists] = useState(null);

  const playlistCount = 30;
  const URL = `https://api.spotify.com/v1/me/playlists?limit=${playlistCount}`;

  useEffect(() => {
    getUserPlaylists(URL);
    return () => {
      setNextPlaylists(null);
      setUserPlaylists([]);
    }
  }, [])

  const getUserPlaylists = (url) => {
    axiosInstance.get(url).then(
      response => {
        const {items, next} = response.data;
        if (userPlaylists.length === 0) setUserPlaylists(items);
        else setUserPlaylists(prevState => [...prevState, ...items])
        setNextPlaylists(next);
      }
    ).catch(err => console.log(err))
  }

  const handleLoadMorePlaylists = () => {
    if (!nextPlaylists) return;
    getUserPlaylists(nextPlaylists);
  }

  return (
    <Grid container justify="center">
      {/* Add styling later so that infinite scroll could work on higher resolution devices*/}
      <InfiniteScroll
        next={handleLoadMorePlaylists}
        hasMore={nextPlaylists !== null}
        loader={<h2>Loading more data...</h2>}
        dataLength={userPlaylists.length}
      >
        <h3>PLAYLISTS</h3>
        {userPlaylists.map(
          (playlist, index) => (
            <p key={index + playlist.name}>{playlist.name}</p>
          )
        )}
      </InfiniteScroll>
    </Grid>
  )
}

export default Playlists;
