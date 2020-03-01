import React, { useState } from "react";
import { useLocation } from "react-router";
import { Menu } from "antd";
import { TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Nav = () => {
  const locationUrl = useLocation().pathname.match(/([a-z])+/gim);

  const initialState = {
    current: locationUrl === null ? "home" : locationUrl[0]
  };

  const [state, setState] = useState(initialState);

  const handleClick = e => {
    setState({
      current: e.key
    });
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Menu.Item key="home">
        <Link to="/">
          <TeamOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="add">
        <Link to="/add">
          <UserAddOutlined />
          Add/Update
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
