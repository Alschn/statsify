import React from "react";
import {SpotifyAuthListener} from "react-spotify-auth";
import {useHistory} from "react-router-dom";

const RedirectHome = () => {
	let history = useHistory();
	return (
		<SpotifyAuthListener onAccessToken={() => history.push('/')}/>
	)
}

export default RedirectHome;