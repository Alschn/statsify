import React from "react";
import {Scopes, SpotifyAuth} from "react-spotify-auth";
import {CLIENT_ID, REDIRECT_URI} from "../../config";

const Welcome = () => {
  return (
    <div className="App-header">
      <div>
        <h3>Welcome to Statsify!</h3>
      </div>
      <div>
        <SpotifyAuth
          redirectUri={REDIRECT_URI}
          clientID={CLIENT_ID}
          scopes={[
            Scopes.userReadPrivate, Scopes.userReadEmail,
            Scopes.userTopRead, Scopes.userReadRecentlyPlayed,
            Scopes.userLibraryRead, Scopes.userLibraryModify,
            Scopes.playlistReadPrivate, Scopes.playlistReadCollaborative,
          ]}
          title='Log in with Spotify'
        />
      </div>
    </div>
  )
}

export default Welcome;
