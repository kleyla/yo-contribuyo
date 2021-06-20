import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";

import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Home } from "../components/Home";
import { db, firebase } from "../firebase/firebase-config";
import { Main } from "../pages/Main";
import { Navbar } from "../components/navbar/Navbar";
import { useStyles } from "../hooks/useStyles";
import { Resouces } from "../pages/Resouces";
import { Faq } from "../pages/Faq";

export const AppRouter = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // la sgte linea crea un obserbable que se puede disparar mas de una vez
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            console.log(doc.data());
            dispatch(
              login(user.uid, user.displayName, user.photoURL, doc.data().token)
            );
            setIsLoggedIn(true);
          });
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Router>
        <div className={classes.root}>
          <Navbar isAuthenticated={isLoggedIn} />
          <div className={classes.content}>
            <div className={classes.toolbar}></div>
            <Container maxWidth="lg">
              <div>
                <Switch>
                  <Route exact path="/resources" component={Resouces} />
                  <Route exact path="/faq" component={Faq} />
                  <Route exact path="/" component={Main} />
                  <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isLoggedIn}
                  />
                  {/* <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/"
                    component={Main}
                  /> */}
                  {/* <Redirect to="/auth/login" /> */}
                </Switch>
              </div>
            </Container>
          </div>
        </div>
      </Router>
    </>
  );
};
