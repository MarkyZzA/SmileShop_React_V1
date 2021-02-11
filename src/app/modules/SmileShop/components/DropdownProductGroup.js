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
import * as CONST from "../../../../Constants";
import Axios from "axios";

function DropdownProductGroup(props) {
  const PRODUCTGROUP_API_URL = `${CONST.API_URL}/productgroups/`;

  const [productGroup, setProductGroup] = React.useState([]);

  React.useEffect(() => {
    Axios.get(PRODUCTGROUP_API_URL)
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setProductGroup(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  }, []);

  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="productGroupId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "productGroupId-simple",
        }}
      >
        <MenuItem disabled value={0}>
          กรุณาเลือก
        </MenuItem>
        {productGroup.map((item) => (
          <MenuItem key={`${props.name}_${item.id}`} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Field>
      {props.touched[`${props.name}`] && (
        <FormHelperText>
          {props.errors[`${props.name}_errorText`]}
        </FormHelperText>
      )}
    </FormControl>
  );
}

DropdownProductGroup.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

// Same approach for defaultProps too
DropdownProductGroup.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default DropdownProductGroup;
