/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";

function DropdownIsActive(props) {
  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="isActiveId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "isActiveId-simple",
        }}
      >
        <MenuItem key={`${props.name}_all`} value={-1}>
          All
        </MenuItem>
        <MenuItem key={`${props.name}_active`} value={0}>
          Active
        </MenuItem>
        <MenuItem key={`${props.name}_inActive`} value={1}>
          InActive
        </MenuItem>
      </Field>
      {props.touched[`${props.name}`] && (
        <FormHelperText>
          {props.errors[`${props.name}_errorText`]}
        </FormHelperText>
      )}
    </FormControl>
  );
}

DropdownIsActive.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

// Same approach for defaultProps too
DropdownIsActive.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default DropdownIsActive;
