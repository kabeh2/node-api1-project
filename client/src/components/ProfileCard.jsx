import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ProfileCard({ name, bio, id, viewMore, deleteUser, users }) {
  const onDeleteUser = (id, users) => {
    let result = window.confirm("Are you sure you want to delete?");
    if (result) {
      deleteUser(id, users);
    }
  };

  return (
    <Card
      title={name}
      extra={
        !viewMore ? <Link to={`/${id}`}>View</Link> : <Link to={`/`}>Back</Link>
      }
      style={{
        flexBasis: "31%",
        minWidth: 300,
        margin: "0px 8px 16px 8px",
        display: "flex",
        flexDirection: "column"
      }}
      actions={
        viewMore
          ? [
              <Link
                to={{
                  pathname: `/update/${id}`,
                  state: {
                    name,
                    bio,
                    id
                  }
                }}
              >
                <EditOutlined key="edit" />
              </Link>
            ]
          : [
              <DeleteOutlined
                key="delete"
                onClick={() => onDeleteUser(id, users)}
              />,
              <Link
                to={{
                  pathname: `/update/${id}`,
                  state: {
                    name,
                    bio,
                    id
                  }
                }}
              >
                <EditOutlined key="edit" />
              </Link>
            ]
      }
    >
      <p>{bio}</p>
    </Card>
  );
}

export default ProfileCard;
