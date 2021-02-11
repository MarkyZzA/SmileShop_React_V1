/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
// import DropdownIsActive from "../../SmileShop/components/DropdownIsActive";

function ProductGroupTableSearch(props) {
  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search conditions
        </Typography>

        <Formik
          //Form fields and default values
          initialValues={{
            name: "",
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.submit(values);
          }}
        >
          {/* Render form */}
          {({
            submitForm,
            isSubmitting,
            values,
            errors,
            rv,
            touched,
            resetForm,
          }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Search"
                    name="name"
                  />
                </Grid>

                {/* <Grid item xs={12} lg={3}>
                  <DropdownIsActive
                    name="isActive"
                    label="Status"
                    touched={touched}
                    errors={errors}
                  ></DropdownIsActive>
                </Grid> */}

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                  spacing={3}
                >
                  <Grid item xs={12} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      disabled={isSubmitting}
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Search
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={3}>
                    <Link to="/productgroups/new">
                      <Button fullWidth variant="contained" color="secondary">
                        New ProductGroup
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductGroupTableSearch;
