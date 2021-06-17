import React from "react";
import Button from "@material-ui/core/Button";
import GitHub from "@material-ui/icons/GitHub";

import { useStyles } from "../../hooks/useStyles";
import { useDispatch } from "react-redux";
import { startGithubLogin } from "../../actions/auth";

export const LoginScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleGithubLogin = () => {
    console.log("handleGithubLogin");
    dispatch(startGithubLogin());
  };

  return (
    <div>
      <p>LoginScreen</p>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<GitHub />}
        onClick={handleGithubLogin}
      >
        Log in with Github
      </Button>
    </div>
  );
};
