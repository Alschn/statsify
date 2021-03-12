import React from "react";
import {
	FormControl,
	FormGroup,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select
}
from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
		maxWidth: 400,
	},
}));

const CustomSelect = (props) => {
	const classes = useStyles();
	const {
		labelName,
		itemsCount,
		handleItemsCountChange,
		timeRange,
		handleTimeRangeChange,
	} = props;

	return (
		<Grid container spacing={1} alignItems="center" justify="center">
			<FormGroup row={true}>
				<FormControl className={classes.formControl}>
					<InputLabel id={`select-${labelName}-count-label`}>{labelName} count</InputLabel>
					<Select
						labelId={`select-${labelName}-count-label`}
						id={`select-${labelName}-count`}
						value={itemsCount}
						onChange={handleItemsCountChange}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
						<MenuItem value={30}>30</MenuItem>
						<MenuItem value={40}>40</MenuItem>
						<MenuItem value={50}>50</MenuItem>
					</Select>
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel id="select-time-range-label">Time range</InputLabel>
					<Select
						labelId="select-time-range-label"
						id="select-time-range"
						value={timeRange}
						onChange={handleTimeRangeChange}
					>
						<MenuItem value={"short_term"}>1 month</MenuItem>
						<MenuItem value={"medium_term"}>6 months</MenuItem>
						<MenuItem value={"long_term"}>all time</MenuItem>
					</Select>
				</FormControl>
			</FormGroup>
		</Grid>
	)
}

export default CustomSelect;