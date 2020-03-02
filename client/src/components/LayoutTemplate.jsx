import React, { useContext } from "react";
import { Layout } from "antd";
import { Route, Switch, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Nav from "./Nav";
import Home from "./Home";
import Form from "./forms/Form";

const { Content } = Layout;

const LayoutTemplate = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" }
  });
  return (
    <>
      <header>
        <Nav />
      </header>
      <Content>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route path="/update/:id" component={Form} />
              <Route path="/add" component={Form} />
              <Route path="/:id" component={Home} />
              <Route path="/" component={Home} />
            </Switch>
          </animated.div>
        ))}
      </Content>
    </>
  );
};

export default LayoutTemplate;
