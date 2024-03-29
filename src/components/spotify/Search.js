import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import {Grid, Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import CheckboxGroup from "../utilities/CheckboxGroup";
import axiosInstance from "../../utils/axiosInstance";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Search = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const [resultsCount, setResultsCount] = useState(10);
  const [results, setResults] = useState({});
  const [types, setTypes] = useState({
    album: true,
    artist: false,
    playlist: false,
    track: false,
    show: false,
    episode: false,
  })
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getQueryTypes = () => {
    const selected = Object.entries(types).filter(([key, value]) => (value));
    return selected.reduce(
      (acc, [key], i, arr) => (
        acc += i !== arr.length - 1 ? key + ',' : key
      ), ``);
  };

  const handleMultipleSelectChange = (event) => {
    setTypes(prevState => (
      {...prevState, [event.target.name]: event.target.checked})
    );
  }

  const searchForItems = () => {
    const URL = `https://api.spotify.com/v1/search?q=${currentQuery}&type=${getQueryTypes()}&limit=${resultsCount}`;
    axiosInstance.get(URL).then((response) => {
      const {data} = response;
      setResults(data);
    }).catch(err => console.error(err))
  }

  const handleSearchChange = (e) => {
    setCurrentQuery(e.target.value);
    if (!e.target.value) setResults({});
  }

  const handleSearchConfirm = (e) => {
    if (e.key === 'Enter') {
      if (Object.entries(types).filter(([key, value]) => (value)).length === 0) {
        setError("Please select at least one search type!");
        setOpen(true);
      } else if (!currentQuery) {
        setError("Search field must not be empty!");
        setOpen(true);
      } else searchForItems();
    }
  }

  return (
    <Grid container justify="center" align="center">
      <Grid item xs={12}>
        <h1>Search for an item:</h1>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Grid item>
        <CheckboxGroup
          options={types}
          handler={handleMultipleSelectChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          onChange={handleSearchChange}
          onKeyPress={handleSearchConfirm}
        />
      </Grid>

      <pre>{Object.keys(results).length !== 0 ? JSON.stringify(results, null, 2) : null}</pre>
    </Grid>
  )
}

export default Search;
