import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
  spinner: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
    // width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
