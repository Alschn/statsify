import React from "react";
import {capitalize, Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

const CheckboxGroup = ({options, handler}) => {
  return (
    <FormGroup row>
      {Object.entries(options).map(([key, value]) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
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
