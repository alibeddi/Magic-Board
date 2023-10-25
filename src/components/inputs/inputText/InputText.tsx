import React from "react";
import { ErrorMessage, useField } from "formik";
import { inputText } from "../types";

const InputText = ({ name, label, placeholder, reaquired, ...props }:inputText) => {
  const [field, meta] = useField(name);
  return (
    <div className="input">
      {label && (
        <label className="label">
          {label}
          {reaquired && <span>*</span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        autoComplete="off"
        {...props}
        {...field}
        className={meta.touched && meta.error ? "is-invalid" : ""}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};

export default InputText;
