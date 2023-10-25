import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import InputText from "../../components/inputs/inputText/InputText";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Button from "../../components/Button/Button";
import useAuth from "../../core/auth/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTHPATH } from "../../router/routes/auth/path";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jwt } = useAuth();
  const schema = Yup.object().shape({
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
      title="Reset your password"
      description="Your account has been verified. Please enter a new password to reset your account."
    >
      <div>
        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            const { confirm_password, ...validPassword } = values;
            const token = params.get("token");
            jwt
              .resetPassword(validPassword, token)
              .then(() => {
                toast.success("reset password successfully", {
                  autoClose: 500,
                });
                navigate(AUTHPATH.LOGIN);
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
                    name="password"
                    type="password"
                    label="new password"
                    placeholder="enter your new password"
                    reaquired={false}
                  />
                  <InputText
                    name="confirm_password"
                    type="password"
                    label="confirm your password"
                    placeholder="repeat your password"
                    reaquired={false}
                  />
                </div>

                <div className="auth-button-container">
                  <Button
                    label="reset"
                    name="confirm"
                    //loading={loading}
                    type="submit"
                    className="btn__confirm"
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
