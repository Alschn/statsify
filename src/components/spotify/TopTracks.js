import React, {useEffect, useState} from "react";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import CustomSelect from "../utilities/CustomSelect";
import {getArtistsString, getTrackLength} from "../../utils/dataFormat";
import axiosInstance from "../../utils/axiosInstance";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

const TopTracks = () => {
  const classes = useStyles();

  const [tracksCount, setTracksCount] = useState(20);
  const [timeRange, setTimeRange] = useState('medium_term');
  const [topTracks, setTopTracks] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const URL = `https://api.spotify.com/v1/me/top/tracks?limit=${tracksCount}&time_range=${timeRange}`;

  useEffect(() => {
    getTopTracks(URL);
    return () => {
      setTopTracks([]);
      setNextPage(null);
    }
  }, [tracksCount, timeRange])

  const getTopTracks = (url) => {
    axiosInstance.get(url).then(
      response => {
        console.log(response.data);
        const {items, next} = response.data;
        if (topTracks.length === 0) setTopTracks(items);	// initial setter
        else setTopTracks(prevState => [...prevState, ...items]);
        setNextPage(next);
      }
    ).catch(err => console.log(err))
  }

  const handleLoadMoreTracks = () => {
    if (!nextPage) return;
    getTopTracks(nextPage);
  }

  const handleTracksCountChange = (event) => {
    setTracksCount(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const renderLoadMoreButton = () => (
    nextPage && (
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadMoreTracks}
      >
        Load more
      </Button>
    )
  );

  return (
    <div>
      <h1>Top tracks</h1>
      <CustomSelect
        labelName="Tracks"
        itemsCount={tracksCount}
        handleItemsCountChange={handleTracksCountChange}
        timeRange={timeRange}
        handleTimeRangeChange={handleTimeRangeChange}
      />

      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={6} lg={6}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"/>
                  <TableCell align="left">Track</TableCell>
                  <TableCell align="left"/>
                  <TableCell align="left">Artists</TableCell>
                  <TableCell align="left">Length</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topTracks.map(({album, name, artists, duration_ms}, index) => (
                  <TableRow key={`${index + 1}.${name}`}>
                    <TableCell component="th" scope="row">
                      {index + 1}.
                    </TableCell>
                    <TableCell align="left">
                      <Avatar src={album.images[2].url} variant="square"/>
                    </TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">{getArtistsString(artists)}</TableCell>
                    <TableCell align="left">{getTrackLength(duration_ms)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {renderLoadMoreButton()}
    </div>
  )
};

export default TopTracks;
