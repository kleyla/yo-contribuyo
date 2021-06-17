import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, Container } from "@material-ui/core";

import theme from "./themeConfig";
// import Routes from "./Routes";
// import Navbar from "./components/shared/Navbar";
import { store } from "./store/store";
import { useStyles } from "./hooks/useStyles";
import { AppRouter } from "./routers/AppRouter";

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <HashRouter basename="/">
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
        </HashRouter> */}
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
