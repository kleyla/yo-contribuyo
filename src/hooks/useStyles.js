import { makeStyles } from "@material-ui/core";
import { deepOrange, green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  // App
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
  // Navbar
  titleAppBar: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  textWhite: {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
  space: {
    flexGrow: 1,
  },
  // Spinner
  spinner: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
  },

  card: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white,
  },
  cardMaxWidth: {
    maxWidth: 345,
  },
  cardMedia: {
    width: "100px",
    height: "100px",
  },
  centerImg: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  cardContentRow: {
    display: "flex",
    flexDirection: "row",
  },
  cardContentColumnCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  textGrey: {
    color: "#AAA",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  button: {
    margin: theme.spacing(1),
  },
  // Card
  rootCard: {
    minWidth: 275,
  },
  titleCard: {
    fontSize: 14,
  },
  rootCardProfile: {
    marginTop: "70px",
    overflow: "visible",
    minWidth: 275,
  },
  picProfile: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    boxShadow: theme.shadows[3],
    margin: "-90px auto 0",
    position: "relative",
    zIndex: 1000,
  },
  // Colors
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
