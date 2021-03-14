import React, {useState} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const Search = (props) => {
	const classes = useStyles();
	const [currentQuery, setCurrentQuery] = useState("");
	const [resultsCount, setResultsCount] = useState(5);
	const [results, setResults] = useState({});

	const searchForItems = () => {
		const types = "artist";
		const URL = `https://api.spotify.com/v1/search?q=${currentQuery}&type=${types}`;
		axios.get(URL, {
			headers: {
				Authorization: `Bearer ${props.token}`
			}
		}).then((response) => {
			console.log(response.data);
			setResults(response.data.artists);
		}).catch(err => console.error(err))
	}

	return (
		<div>
			<h1>Search for an item:</h1>

			<TextField
				id="standard-search"
				label="Search field"
				type="search"
				onChange={(e) => setCurrentQuery(e.target.value)}
				onKeyPress={(e) => e.key === 'Enter' ? searchForItems() : null}
			/>

			<pre>{Object.keys(results).length !== 0 ? JSON.stringify(results, null, 2) : null}</pre>

			<Grid container justify="center" align="center">
				{/*{results !== undefined ?*/}
				{/*	results.map((artist) => (*/}
				{/*		<Grid item xs={12}>*/}
				{/*			<p>{artist.name}</p>*/}

				{/*		</Grid>)*/}
				{/*	) : null}*/}
			</Grid>
		</div>
	)
}

export default Search;