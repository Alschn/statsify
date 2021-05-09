import React from "react";
import {Grid} from "@material-ui/core";

const Homepage = ({userData}) => {
  return (
    <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
    >
      {Object.keys(userData).length !== 0 &&
      (
        <Grid item>
          {userData.name}
        </Grid>
      )
      }
    </Grid>
  )
}

export default Homepage;
