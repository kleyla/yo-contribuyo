import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Octokit } from "@octokit/core";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Chip,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import { useStyles } from "../hooks/useStyles";

export const MyProgress = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const { name, photoURL, nick, token } = useSelector((state) => state.auth);

  const [repos, setRepos] = useState([]);
  const [myPullRequests, setMyPullRequests] = useState([]);
  const [mypullRequestsClosed, setMyPullRequestsClosed] = useState([]);

  const octokit = new Octokit({ auth: `${token}` });

  const getFicctColaboraRepos = async () => {
    const repos = await octokit.request("GET /search/repositories", {
      q: "topic:ficct-colabora",
    });
    // console.log("repos", repos.data.items);
    setRepos(repos.data.items);
  };

  const getMyPullRequests = async (owner, repo) => {
    return await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: owner,
      repo: repo,
    });
  };

  const getMyPullRequestsClosed = async (owner, repo) => {
    return await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner: owner,
      repo: repo,
      state: "closed",
    });
  };

  const checkPull = (pull) => {
    if (pull.user.login === nick) {
      setMyPullRequests((myPRs) => [...myPRs, pull]);
    }
    return;
  };

  const checkPullMerged = (pull) => {
    if (pull.user.login === nick && pull.merged_at != "") {
      setMyPullRequestsClosed((myPRs) => [...myPRs, pull]);
    }
    return;
  };

  const getPullRequestsOpen = async () => {
    repos.map(async (item) => {
      let pulls = await getMyPullRequests(item.owner.login, item.name);
      //   console.log("pulls", pulls.data);
      pulls.data.filter((pull) => checkPull(pull));
    });
  };

  const getPullRequestsClosed = async () => {
    repos.map(async (item) => {
      let pulls = await getMyPullRequestsClosed(item.owner.login, item.name);
      //   console.log("pulls", pulls.data);
      pulls?.data?.filter((pull) => checkPullMerged(pull));
    });
  };

  const callFunctions = async () => {
    setIsLoading(true);

    await getFicctColaboraRepos();
    await getPullRequestsOpen();
    await getPullRequestsClosed();

    setIsLoading(false);
  };
  useEffect(() => {
    callFunctions();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.rootCardProfile}>
                <CardActionArea>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Avatar
                      alt={name}
                      src={photoURL}
                      className={classes.picProfile}
                    />
                  </Box>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
              <p>MyProgress</p>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" spacing={2}>
                    <Avatar className={classes.green}>
                      <AssignmentTurnedInIcon />
                    </Avatar>
                    <Box ml={2}>
                      <Card className={classes.rootCard}>
                        <CardContent>
                          <Chip
                            label="Pull Request abiertos"
                            className={classes.green}
                          />
                          <Typography
                            className={classes.titleCard}
                            color="textSecondary"
                            gutterBottom
                          >
                            Word of the Day
                          </Typography>
                          {myPullRequests.map((pull) => (
                            <Link
                              key={pull.id}
                              href={pull.html_url}
                              color="inherit"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {pull.title}
                            </Link>
                          ))}
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" spacing={2}>
                    <Avatar className={classes.orange}>
                      <AssignmentIcon />
                    </Avatar>
                    <Box ml={2}>
                      <Card className={classes.rootCard}>
                        <CardContent>
                          <Chip
                            label="Pull Request mergeados"
                            className={classes.orange}
                          />
                          <Typography
                            className={classes.titleCard}
                            color="textSecondary"
                            gutterBottom
                          >
                            Word of the Day
                          </Typography>
                          {mypullRequestsClosed.map((pull) => (
                            <Link
                              key={pull.id}
                              href={pull.html_url}
                              color="inherit"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {pull.title}
                            </Link>
                          ))}
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
