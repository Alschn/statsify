import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {getArtistsString, getTimePassedSinceAdded, getTrackLength} from "../../utils/dataFormat";
import {makeStyles} from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../../utils/axiosInstance";


const useStyles = makeStyles({
  topBox: {
    paddingTop: 20,
  },
  albums: {
    margin: 0,
  },
  buttonBox: {
    padding: 20,
  },
  albumItem: {
    maxWidth: 200,
    "& > img": {
      width: 200,
      height: 200,
    },
  },
  albumItemName: {
    fontSize: 14,
  },
  albumItemArtists: {
    fontSize: 12,
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
    axiosInstance.get(URL).then(
      response => {
        console.log(response.data);
        const {items, total, next} = response.data;
        if (type === "tracks") {
          setTracks(items);
          setTotalTracks(total);
          setNextTracks(next);
        } else {
          setAlbums(items);
          setTotalAlbums(total);
          setNextAlbums(next);
        }
      }
    ).catch(err => console.log(err))
  }

  const handleRadioOnChange = (event) => {
    setSelectType(event.target.value);
  }

  const loadMoreTracks = () => {
    if (nextTracks) {
      axiosInstance.get(nextTracks.toString()).then(
        response => {
          console.log(response.data, "Next data");
          const {items, next} = response.data;
          setTracks(prevState => [...prevState, ...items]);
          setNextTracks(next);
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
                    <Card className={classes.albumItem}>
                      <img src={album.images[1].url} alt=""/>
                      <p className={classes.albumItemName}>{album.name}</p>
                      <p className={classes.albumItemArtists}>{getArtistsString(album.artists)}</p>
                    </Card>
                  </Grid>
                )
              )
              }
            </Grid>
          </Grid>

          {nextAlbums && (
            <Grid container justify="center" className={classes.buttonBox}>
              <Button variant="contained" color="primary">
                Load more
              </Button>
            </Grid>
          )}
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
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Artists</TableCell>
                    <TableCell align="left">Album</TableCell>
                    <TableCell align="left"><TodayIcon fontSize="small"/></TableCell>
                    <TableCell align="left"><AccessTimeIcon fontSize="small"/></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tracks.map(({track: {name, album, artists, duration_ms}, added_at}, index) => (
                    <TableRow key={`${index + 1}.${name}`}>
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{getArtistsString(artists)}</TableCell>
                      <TableCell align="left">{album.name}</TableCell>
                      <TableCell align="left">{getTimePassedSinceAdded(added_at)}</TableCell>
                      <TableCell align="left">{getTrackLength(duration_ms)}</TableCell>
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
