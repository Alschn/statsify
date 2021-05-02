<div align="center" style="padding-bottom: 10px">
    <h1 style="font-family: 'Segoe UI'">Statsify</h1>
    <img src="https://aleen42.github.io/badges/src/javascript.svg" alt=""/>
    <img src="https://aleen42.github.io/badges/src/react.svg" alt=""/>
    <img src="https://aleen42.github.io/badges/src/spotify.svg" alt=""/>
    <p>
    Statsify is a website that helps users view their Spotify account statistics (top tracks, artists etc.) and saved content.
    </p>
</div>

<p>My motivation behind this project is to get used to React's functional components, learn Hooks, try out different Material UI components, build React app without using any backend framework. The aim is also to make something useful for myself and my friends.
</p>

## Features

- Top tracks
- Top artists
- User playlists
- Recently played tracks
- Saved tracks and albums
- Featured playlists *
- New releases *
- Search for items *

#### Spotify Web API reference:

https://developer.spotify.com/documentation/web-api/reference/

## Config

Create `.env` file inside the **root directory** and set following variables:

```shell
REACT_APP_REDIRECT_URI='callback uri set in the spotify for developers dashboard'
REACT_APP_CLIENT_ID='client id from the dashboard'
```

## Run application

Install all dependencies:

```shell
npm install
```

Run developer server:

```shell
npm start
```

## To-do list:

- Parsing data from request to custom objects (to store data inside state)
- Paginating data from requests (mostly done)
- Add styles to every route
- Welcome and Homepage components
- Fix useEffect warnings (dependencies array issue)
- Replace fetch api with axios and set default headers
- Replace code repeated in multiple places (working on it)
- Try to implement auto Spotify token refresh (or at least auto logout)
- Prevent fetching data on reload (unless it's intended)

### Future content?

- More in depth statistics (calculated by analyzing data from multiple requests)
- Maybe use Spotify Web Playback SDK
- Maybe add Genius API to search for songs' lyrics

## More possible features using Spotify API endpoints:

- Get Recommendations
- Get User's Followed Artists
- Get Audio Features for a Track (track's stats)
- Get an Artist's Top Tracks
- Get an Artist's Related Artists
- Get an Artist's Albums
