import React from "react";
import { Row, Col } from "antd";
import UserForm from "./UserForm";

function Form() {
  return (
    <Row justify="center" style={{ margin: "40px 0" }}>
      <Col span={10} className="gutter-row">
        <UserForm />
      </Col>
    </Row>
  );
}

export default Form;
