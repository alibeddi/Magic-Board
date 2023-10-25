import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { NavLink } from "react-router-dom";

import { AUTHPATH } from "../../router/routes/auth/path";
import InputText from "../../components/inputs/inputText/InputText";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Button from "../../components/Button/Button";
import useAuth from "../../core/auth/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { jwt } = useAuth();
  const schema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, "at least 6 characters")
      .required("name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?])/,
        " Uppercase, Lowercase, special caracter and numbers "
      )
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
  });
  return (
    <AuthLayout
      title="Sign up"
      description="Let's get started! Please fill out the form to register for a new account"
    >
      <div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            const { confirm_password, ...rest } = values;

            jwt
              .register(rest)
              .then(() => {
                toast.success("register successfully", { autoClose: 500 });
              })
              .catch((e) => {
                console.log("error here", e);
                toast.error(e.response.data.message, { autoClose: 500 });
              });
          }}
        >
          {(formik: any) => (
            <div className="formcontainer">
              <Form>
                <div className="input-column-auth">
                  <InputText
                    name="username"
                    type="text"
                    label="username"
                    placeholder="enter your username "
                    reaquired={false}
                  />
                  <InputText
                    name="email"
                    type="text"
                    label="email"
                    placeholder="enter your email"
                    reaquired={false}
                  />
                  <InputText
                    name="password"
                    type="password"
                    label="password"
                    placeholder="Password"
                    reaquired={false}
                  />
                  <InputText
                    name="confirm_password"
                    type="password"
                    label="Confirm password"
                    placeholder="Password"
                    reaquired={false}
                  />
                </div>

                <div className="auth-button-container">
                  <Button
                    label="Sign up"
                    name="confirm"
                    //loading={loading}
                    type="submit"
                    className="btn__confirm"
                  />
                </div>
                <div className="form-footer">
                  <p>You have an account?</p>
                  <p>
                    <NavLink to={AUTHPATH.LOGIN}>Login now</NavLink>
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

export default Login;
