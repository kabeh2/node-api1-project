import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getRequest, deleteUser } from "../store/actions";
import ProfileCard from "./ProfileCard";
import { Row, Col } from "antd";

function Home({ users, getRequest, match, deleteUser }) {
  console.log(match);
  useEffect(
    () => {
      getRequest(match.params.id && match.params.id);
    },
    [getRequest, match.params.id],
    users
  );

  return (
    <Row justify="center" style={{ margin: "40px 0px" }}>
      <Col
        span={22}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {users &&
          users.map(user => (
            <ProfileCard
              name={user.name}
              bio={user.bio}
              id={user.id}
              key={user.id}
              deleteUser={deleteUser}
              users={users}
              viewMore={match.params.id !== undefined}
            />
          ))}
      </Col>
    </Row>
  );
}

const mapStateToProps = state => ({
  users: state.data
});

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  deleteUser: (id, users) => dispatch(deleteUser(id, users))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
