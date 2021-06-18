import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useStyles } from "../../hooks/useStyles";
import { startLogout } from "../../actions/auth";

export const Navbar = ({ isAuthenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
              <MenuItem onClick={handleClose}>Mi avace</MenuItem>
              <MenuItem onClick={handleLogout}>My account</MenuItem>
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
