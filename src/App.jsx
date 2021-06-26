import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { HashRouter } from "react-router-dom";

import theme from "./themeConfig";
import { store } from "./store/store";
import { AppRouter } from "./routers/AppRouter";

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter basename="/">
          <AppRouter />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
