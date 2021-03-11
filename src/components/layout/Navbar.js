import React from "react";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		border: '1px solid #a0a0a0',
		minHeight: '5vh',
		alignContent: "center",
	}
})

const Navbar = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="space-evenly"
			alignItems="flex-start"
			className={classes.root}
		>
			<Link to="/">Home</Link>
			<Link to="/top-tracks">Your top tracks</Link>
			<Link to="/top-artists">Your top artists</Link>
			<Link to="/playlists">Your playlists</Link>
			<Link to="/saved-library">Your saved tracks and albums</Link>
			<Link to="/recently-played">Recently played tracks</Link>
			<Link to="/featured-playlists">Featured playlists</Link>
			<Link to="/new-releases">New releases</Link>
			<Link to="/search">Search for items</Link>
		</Grid>
	);
}

export default Navbar;