import React from "react";
import {Avatar, Grid} from "@material-ui/core";

const Homepage = (props) => {
	return (
		<div>
			<h6>Token: {props.token}</h6>
			<Grid container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={1}
						className="App-header"
			>
				{Object.keys(props.userData).length !== 0 ?
					(
						<div>
							<Grid item>
								<Avatar src={props.userData.image_url}/>
							</Grid>
							<Grid item>
								{props.userData.name}
							</Grid>
						</div>
					)
					:
					null
				}
			</Grid>
		</div>
	)
}

export default Homepage;