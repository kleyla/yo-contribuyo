import React from "react";
import { BrowserRouter as Router, Switch, HashRouter } from "react-router-dom";
import { ThemeProvider, makeStyles, Container } from "@material-ui/core";
import theme from "./themeConfig";
import Routes from "./Routes";
import Navbar from "./components/shared/Navbar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: "100vh",
    height: "100%",
    padding: theme.spacing(3),
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename="/">
        <div className={classes.root}>
          <Navbar />
          <div className={classes.content}>
            <div className={classes.toolbar}></div>
            <Container maxWidth="lg">
              <Switch>
                <Routes />
              </Switch>
            </Container>
          </div>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
