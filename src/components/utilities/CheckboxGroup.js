import React from "react";
import {capitalize, Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

const CheckboxGroup = (props) => {
	const {options, handler} = props;

	return (
		<FormGroup row>
			{Object.entries(options).map(([key]) => (
				<FormControlLabel
					control={
						<Checkbox
							checked={options.key}
							onChange={handler}
							name={key}
							color="primary"
						/>
					}
					label={capitalize(key)}
					key={key}
				/>
				))
			}
		</FormGroup>
	)
}

export default CheckboxGroup;
