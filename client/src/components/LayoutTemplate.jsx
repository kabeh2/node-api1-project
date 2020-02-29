import React from "react";
import { Layout } from "antd";
import Nav from "./Nav";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import Form from "./forms/Form";

const { Content } = Layout;

const LayoutTemplate = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <Content>
        {/* <section>
          <Home />
        </section> */}
        <Switch>
          <Route path="/update/:id" component={Form} />
          <Route path="/add" component={Form} />
          <Route path="/:id" component={Home} />
          <Route path="/" component={Home} />
        </Switch>
      </Content>
    </>
  );
};

export default LayoutTemplate;
