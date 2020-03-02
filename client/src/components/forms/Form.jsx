import React from "react";
import { Row, Col } from "antd";
import UserForm from "./UserForm";
import AbsoluteWrapper from "../AbsoluteWrapper";

function Form() {
  return (
    <AbsoluteWrapper>
      <Row justify="center" style={{ margin: "40px 0" }}>
        <Col span={22} md={10} sm={16} className="gutter-row">
          <UserForm />
        </Col>
      </Row>
    </AbsoluteWrapper>
  );
}

export default Form;
