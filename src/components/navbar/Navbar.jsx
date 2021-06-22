import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useStyles } from "../../hooks/useStyles";
import { startLogout } from "../../actions/auth";
import { useSelector } from "react-redux";

export const Navbar = ({ isAuthenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, photoURL } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const redirectToMyProgress = () => {
    history.push("/my-progress");
    handleClose();
  };

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
        <Link to="/resources" className={classes.textWhite}>
          <Button variant="text" color="inherit">
            Recursos
          </Button>
        </Link>
        <Link to="/faq" className={classes.textWhite}>
          <Button variant="text" color="inherit">
            FAQ
          </Button>
        </Link>
        <div className={classes.space}></div>

        {isAuthenticated ? (
          <div>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              variant="text"
              color="inherit"
              onClick={handleMenu}
            >
              {name}&nbsp;
              <Avatar alt="Remy Sharp" src={photoURL} />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={redirectToMyProgress}>Mi avace</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/auth/login" className={classes.textWhite}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
