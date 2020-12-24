import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </>
  );
};

export default Routes;
