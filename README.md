<div align="center" style="padding-bottom: 10px">
    <h1 style="font-family: 'Segoe UI'">Statsify</h1>
    <img src="https://aleen42.github.io/badges/src/javascript.svg" alt=""/>
    <img src="https://aleen42.github.io/badges/src/react.svg" alt=""/>
    <img src="https://aleen42.github.io/badges/src/spotify.svg" alt=""/>
    <p>
    Statsify is a website that helps users view their Spotify account statistics (top tracks, artists etc.) and saved content.
    </p>
</div>

<p>My motivation behind this project is to get used to React's functional components, learn Hooks, use Material UI, build app in React without using any backend framework. The aim is also to make something useful for myself and my friends.
</p>

## Features

- Top tracks
- Top artists
- User playlists
- Recently played tracks

#### Spotify Web API reference:

https://developer.spotify.com/documentation/web-api/reference/

## Config

Create .env file inside the root directory and set following variables:

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

- Saved tracks/albums (user's library)
- Parsing data from request to custom objects (to store data inside state)
- UI: navbar, maybe drawer and more (including styling existing components) ...
- Fix useEffect warnings (dependencies array issue)
- Maybe use Spotify Web Playback SDK in future

