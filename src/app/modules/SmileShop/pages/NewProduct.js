import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as productRedux from "../_redux/productRedux";
import * as productAxios from "../_redux/productAxios";
import * as swal from "../../Common/components/SweetAlert";
import { useParams } from "react-router-dom";
import DropdownProductGroup from "../../SmileShop/components/DropdownProductGroup";

function NewProduct(props) {
  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);
  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      //edit
      //get employee from api
      productAxios
        .getProduct(id)
        .then(async (res) => {
          if (res.data.isSuccess) {
            console.log(JSON.stringify(res.data.data));
            let apiData = res.data.data;

            // clone & update value
            let objPayload = {
              ...productReducer.currentProductToAdd,
              name: apiData.name,
              productGroupId: apiData.productGroupId,
              price: apiData.price,
              stock: apiData.stock,
            };

            // save to redux
            dispatch(productRedux.actions.updateCurrentProduct(objPayload));
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
      dispatch(productRedux.actions.resetCurrentProduct());
    };
  }, [id]);

  const handleAdd = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    productAxios
      .addProduct(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetCurrentProduct());
              props.history.push("/products/");
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
    productAxios
      .editProduct(objPayload, id)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `edited id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetCurrentProduct());
              props.history.push("/products/");
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
        name: productReducer.currentProductToAdd.name,
        productGroupId: productReducer.currentProductToAdd.productGroupId,
        price: productReducer.currentProductToAdd.price,
        stock: productReducer.currentProductToAdd.stock,
      }}
      //Validation section
      validate={async (values) => {
        const errors = {};
        //Validate form

        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.productGroupId) {
          errors.productGroupId_isError = true;
          errors.productGroupId_errorText = "Required";
        }

        if (!values.price) {
          errors.name = "Required";
        }

        if (!values.stock) {
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
              ...productReducer.currentProductToAdd,
              name: values.name,
              productGroupId: values.productGroupId,
              price: values.price,
              stock: values.stock,
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
                label="Product Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="number"
                label="Price"
                name="price"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Stock"
                name="stock"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <DropdownProductGroup
                name="productGroupId"
                label="Group"
                touched={touched}
                errors={errors}
              ></DropdownProductGroup>
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

export default NewProduct;
