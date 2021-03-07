import React from "react";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

const Navbar = () => {
	return (
		<Grid container direction="row" justify="space-evenly" alignItems="flex-start">
			<Link to="/">Home</Link>
			<Link to="/top-tracks">Your top tracks</Link>
			<Link to="/top-artists">Your top artists</Link>
			<Link to="/playlists">Your playlists</Link>
			<Link to="/saved-library">Your saved tracks and albums</Link>
			<Link to="/recently-played">Recently played tracks</Link>
			<Link to="/featured-playlists">Featured playlists</Link>
			<Link to="/new-releases">New releases</Link>
		</Grid>
	);
}

export default Navbar;