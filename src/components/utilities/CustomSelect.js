import React from "react";
import {FormControl, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 400,
  },
}));

const CustomSelect = ({labelName, itemsCount, handleItemsCountChange, timeRange, handleTimeRangeChange}) => {
  const classes = useStyles();

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
            {[10, 20, 30, 40, 50].map(int => (
              <MenuItem value={int} key={`MenuItem-${int}`}>{int}</MenuItem>
            ))}
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
