import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e88e5",
      dark: "#202940",
    },
    secondary: {
      main: "#3cd1c2",
      dark: "#333",
    },
    info: {
      main: "#ffaa2c",
    },
    error: {
      main: "#f83e70",
    },
    background: {
    //   default: "#1a2035",
    //   paper: "#202940",
    },
  },
  typography: {
    subtitle1: {
      color: "#9e9e9e",
      fontWeight: "500",
    },
    subtitle2: {
      color: "#757575",
      fontSize: "1rem",
      fontWeight: "400",
    },
  },
});

export default theme;
