import React, {useEffect, useState} from "react";


const NewReleases = (props) => {
	const [newAlbums, setNewAlbums] = useState([]);
	const [albumCount, setAlbumCount] = useState(20);
	const [country, setCountry] = useState();

	const URL = `https://api.spotify.com/v1/browse/new-releases?limit=${albumCount}`;

	useEffect(() => {
		fetch(URL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${props.token}`
			}
		}).then(
			response => response.json()
		).then(
			data => {
				console.log(data);
				setNewAlbums(data);
			}
		).catch(
			err => console.log(err)
		)
	}, [props.token, URL])

	return (
		<div>
			<h1>New releases</h1>

			<pre>{JSON.stringify(newAlbums, null, 2)}</pre>
		</div>
	);
}

export default NewReleases;