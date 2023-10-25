import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { NavLink } from "react-router-dom";

import InputText from "../../components/inputs/inputText/InputText";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Button from "../../components/Button/Button";
import useAuth from "../../core/auth/useAuth";
import { toast } from "react-toastify";
import { AUTHPATH } from "../../router/routes/auth/path";

const ForgetPassword = () => {
  const { jwt } = useAuth();
  const schema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });
  return (
    <AuthLayout
      title="forget password"
      description="Forgot your password? Don't worry, it happens to the best of us. Please enter your email address to reset your password."
    >
      <div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            jwt
              .forgetPassword(values)
              .then(() => {
                toast.success("email sent successfully", { autoClose: 500 });
              })
              .catch((e) => {
                console.log("error here", e);
                toast.error(e.response.data.message, { autoClose: 500 });
              });
          }}
        >
          {({ formik }: any) => (
            <div className="formcontainer">
              <Form>
                <div className="input-column-auth">
                  <InputText
                    name="email"
                    type="text"
                    label="email"
                    placeholder="enter your email"
                    reaquired={false}
                  />
                </div>

                <div className="auth-button-container">
                  <Button
                    label="send Code"
                    name="confirm"
                    //loading={loading}
                    type="submit"
                    className="btn__confirm"
                  />
                </div>
                <div className="form-footer">
                  <p>Go back ?</p>
                  <p>
                    <NavLink to={AUTHPATH.LOGIN}>Login</NavLink>
                  </p>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
