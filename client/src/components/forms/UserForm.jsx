import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { useHistory, useLocation } from "react-router";
import * as Yup from "yup";
import { Card } from "antd";
import { SendOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import MyTextInput from "./TextInput";
import { Link } from "react-router-dom";
import { getRequest, addUser, updateUser } from "../../store/actions";

const NewBtn = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    outline: none;

    #submitBtn {
      color: #1890ff;
    }
  }
`;

function UserForm({ users, getRequest, addUser, updateUser }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (users.length === 0) {
      getRequest();
    }
  }, [getRequest, users]);

  return (
    <Formik
      initialValues={{
        name: location.state === undefined ? "" : location.state.name,
        bio: location.state === undefined ? "" : location.state.bio
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        bio: Yup.string()
          .max(150, "Must be 150 characters or less")
          .required("Required")
      })}
      onSubmit={async (values, { setErrors, setStatus, resetForm }) => {
        console.log(values);

        try {
          if (!location.state) {
            console.log("Adding user...");
            await addUser(values);
          }

          if (location.state) {
            console.log("Updating user...");
            await updateUser(values, location.state.id, users);
          }
          resetForm({});
          setStatus({ success: true });
          history.replace("/");
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        }
      }}
    >
      <Form>
        <Card
          title={location.state ? "Update User" : "Add User"}
          actions={[
            <Link to="/">
              <ArrowLeftOutlined key="back" />
            </Link>,
            <NewBtn type="submit">
              <SendOutlined key="submit" id="submitBtn" />
            </NewBtn>
          ]}
        >
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Write Name here..."
          />
          <MyTextInput
            label="Bio"
            name="bio"
            type="text"
            placeholder="Write Bio here..."
            textArea
          />
        </Card>
      </Form>
    </Formik>
  );
}

const mapStateToProps = state => ({
  users: state.data
});

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  addUser: values => dispatch(addUser(values)),
  updateUser: (values, id, users) => dispatch(updateUser(values, id, users))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
