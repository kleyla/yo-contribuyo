import React from "react";
import { Button, Box, Card, CardContent, Typography } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";

import { useStyles } from "../../hooks/useStyles";
import { useDispatch } from "react-redux";
import { startGithubLogin } from "../../actions/auth";

export const LoginScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleGithubLogin = () => {
    dispatch(startGithubLogin());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card className={classes.rootCard}>
        <CardContent>
          <Typography
            className={classes.titleCard}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            Log in
          </Typography>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<GitHub />}
            onClick={handleGithubLogin}
          >
            Log in with Github
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
