import React from "react";
import { Divider, ListItem, ListItemText, Link } from "@material-ui/core";

import { useStyles } from "../../hooks/useStyles";

export const PullItem = ({ id, title, html_url, created_at, color }) => {
  const classes = useStyles();
  const getClass = () => {
    return color === "green" ? classes.green : classes.orange;
  };
  const getDateTime = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <ListItem alignItems="flex-start" key={id}>
        <Divider orientation="vertical" flexItem className={getClass()} />
        <Link href={html_url} color="inherit" target="_blank" rel="noreferrer">
          <ListItemText
            className={classes.marginLeft}
            primary={title}
            secondary={getDateTime(created_at)}
          />
        </Link>
      </ListItem>
    </>
  );
};
