import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as productGroupRedux from "../_redux/productGroupRedux";
import * as productGroupAxios from "../_redux/productGroupAxios";
import * as swal from "../../Common/components/SweetAlert";
import { useParams } from "react-router-dom";

function NewProductGroup(props) {
  const dispatch = useDispatch();
  const productGroupReducer = useSelector(({ productGroup }) => productGroup);
  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      //edit
      //get employee from api
      productGroupAxios
        .getProductGroup(id)
        .then(async (res) => {
          if (res.data.isSuccess) {
            console.log(JSON.stringify(res.data.data));
            let apiData = res.data.data;

            // clone & update value
            let objPayload = {
              ...productGroupReducer.currentProductGroupToAdd,
              name: apiData.name,
            };

            // save to redux
            dispatch(
              productGroupRedux.actions.updateCurrentProductGroup(objPayload)
            );
          } else {
            swal.swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          swal.swalError("Error", err.message);
        });
    }
    return () => {
      //reset redux state
      dispatch(productGroupRedux.actions.resetCurrentProductGroup());
    };
  }, [id]);

  const handleAdd = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    productGroupAxios
      .addProductGroup(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetCurrentProductGroup());
              props.history.push("/productgroups/");
            });
        } else {
          //internal error
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    console.log(JSON.stringify(objPayload));
    productGroupAxios
      .editProductGroup(objPayload, id)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `edited id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetCurrentProductGroup());
              props.history.push("/productgroups/");
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        name: productGroupReducer.currentProductGroupToAdd.name,
      }}
      //Validation section
      validate={async (values) => {
        const errors = {};
        //Validate form

        if (!values.name) {
          errors.name = "Required";
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        let confirmMessage = !id ? "Confirm Add?" : "Confirm Edit?";

        swal.swalConfirm("Confirm save?", confirmMessage).then((result) => {
          if (result.isConfirmed) {
            // Save data to redux
            // clone & update value
            let objPayload = {
              ...productGroupReducer.currentProductGroupToAdd,
              name: values.name,
            };

            // check add or edit
            if (!id) {
              //add
              handleAdd({ setSubmitting }, objPayload);
            } else {
              //edit
              handleEdit({ setSubmitting }, objPayload);
            }
          }
        });
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="ProductGroup Name"
                name="name"
              />
            </Grid>
            <Grid item xs={3} lg={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <br></br>
          values :{JSON.stringify(values)}
          <br></br>
          errors :{JSON.stringify(errors)}
          <br></br>
          touched : {JSON.stringify(touched)}
        </Form>
      )}
    </Formik>
  );
}

export default NewProductGroup;
