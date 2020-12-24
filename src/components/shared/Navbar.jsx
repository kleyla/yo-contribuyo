import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useStyles } from "./../../hooks/useStyles";

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.titleAppBar}>
          <Button variant="text" color="inherit">
            YO CONTRIBUYO
          </Button>
        </Link>
        <Link to="/" className={classes.textWhite}>
          <Button variant="text" color="inherit">
            Home
          </Button>
        </Link>
        <Link to="/about" className={classes.textWhite}>
          <Button variant="text" color="inherit">
            About
          </Button>
        </Link>
        <div className={classes.space}></div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
