import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import axiosInstance from "../../utils/axiosInstance";


const NewReleases = () => {
  const [newAlbums, setNewAlbums] = useState([]);
  const [albumCount, setAlbumCount] = useState(20);
  const [country, setCountry] = useState();

  const URL = `https://api.spotify.com/v1/browse/new-releases?limit=${albumCount}`;

  useEffect(() => {
    axiosInstance.get(URL).then(
      response => {
        console.log(response.data);
        const {
          albums: {items, artists, total_tracks}
        } = response.data;
        setNewAlbums(items);
      }
    ).catch(
      err => console.log(err)
    )
  }, [URL])

  return (
    <div>
      <h1>New releases</h1>
      <Grid container>
        {newAlbums.map(({name}, index) => (
          <Grid item xs={12} key={index + name}>
            <p>{name}</p>
          </Grid>
        ))}
      </Grid>

      <pre>{JSON.stringify(newAlbums, null, 2)}</pre>
    </div>
  );
}

export default NewReleases;
