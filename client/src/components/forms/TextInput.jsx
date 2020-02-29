import React from "react";
import { useField } from "formik";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

const MyTextInput = ({ textArea, label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={props.id || props.name}>{label}</label>
      {textArea ? (
        <TextArea
          rows={4}
          {...field}
          {...props}
          style={{
            borderColor: meta.touched && meta.error ? "red" : ""
          }}
        />
      ) : (
        <Input {...field} {...props} />
      )}

      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
