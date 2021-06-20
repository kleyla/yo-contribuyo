import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { Octokit } from "@octokit/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useStyles } from "../../hooks/useStyles";
import { Form } from "../shared/Form";

export const Projects = () => {
  const classes = useStyles();
  const { name, token } = useSelector((state) => state.auth);
  const octokit = new Octokit({ auth: `${token}` });

  const API = "https://api.github.com/search/repositories?q=";
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async (language, label) => {
    if (language != "" || label != "") {
      const reps = await Octokit.request("GET /search/repositories", {
        q: `language:${language}`,
      });
      console.log("reps", reps);
      setRepositories(reps.item);

      const url = `${API}language:${language} good-first-issues:>1 help-wanted-issues:>1`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.items);
        });
    } else {
      console.log("Campos vacios!");
    }
  };

  const getGoodFirstIssues = () => {
    fetch(`${API}good-first-issues:>1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRepositories(data.items);
        // setLoading(false);
      });
  };

  const getFicctColaboraRepos = async () => {
    const reps2 = await octokit.request("GET /search/repositories", {
      q: "ficct-colabora",
    });
    console.log("reps2", reps2);
  };

  useEffect(() => {
    setLoading(true);

    // getGoodFirstIssues();
    getFicctColaboraRepos();

    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h4>Formulario</h4>
            <Form getRepositories={getRepositories} />
          </Grid>
          <Grid item xs={12}>
            <h4>Repositorios</h4>
            <Grid container spacing={1}>
              {repositories.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
                      <Link
                        href={item.html_url}
                        color="inherit"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CardActionArea>
                          <CardHeader
                            avatar={
                              <Avatar
                                src={item.owner.avatar_url}
                                aria-label="recipe"
                              />
                            }
                            title={item.full_name}
                            subheader={item.owner.login}
                          />
                        </CardActionArea>
                      </Link>
                      <CardContent>
                        {item.language && <Chip label={item.language} />}
                        <Box mt={2}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
