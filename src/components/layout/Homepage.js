import React from "react";
import {Grid} from "@material-ui/core";

const Homepage = (props) => {
  return (
    <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
    >
      {Object.keys(props.userData).length !== 0 &&
      (
        <Grid item>
          {props.userData.name}
        </Grid>
      )
      }
    </Grid>
  )
}

export default Homepage;
