import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />

        <Redirect to="/auth/register" />
      </Switch>
    </div>
  );
};
