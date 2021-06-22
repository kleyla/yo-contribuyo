import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import GitHub from "@material-ui/icons/GitHub";

import { useStyles } from "../../hooks/useStyles";

export const ProfileCard = () => {
  const classes = useStyles();
  const { name, photoURL, nick } = useSelector((state) => state.auth);

  return (
    <Card className={classes.rootCardProfile}>
      <CardActionArea>
        <Box display="flex" justifyContent="center" mt={2}>
          <Avatar alt={name} src={photoURL} className={classes.picProfile} />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {name}
          </Typography>
          <Typography
            className={classes.titleCard}
            color="textSecondary"
            gutterBottom
            align="center"
          >
            {nick}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Something
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          color="primary"
          aria-label="Ir a mi github"
          href={`https://github.com/${nick}`}
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </IconButton>
      </CardActions>
    </Card>
  );
};
