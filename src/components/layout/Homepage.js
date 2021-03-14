import React from "react";
import {Avatar, Grid} from "@material-ui/core";

const Homepage = (props) => {
	return (
		<div>
			<Grid container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={1}
						className="App-header"
			>
				{Object.keys(props.userData).length !== 0 ?
					(
						<Grid item>
							{props.userData.name}
						</Grid>
					)
					:
					null
				}
			</Grid>
		</div>
	)
}

export default Homepage;
