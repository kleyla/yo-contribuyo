import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Octokit } from "@octokit/core";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import { useStyles } from "../hooks/useStyles";
import { ProfileCard } from "../components/profileCard/ProfileCard";
import { PullItem } from "../components/shared/PullItem";

export const MyProgress = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const { nick, token } = useSelector((state) => state.auth);

  const [myPullRequests, setMyPullRequests] = useState([]);
  const [mypullRequestsClosed, setMyPullRequestsClosed] = useState([]);

  const octokit = new Octokit({ auth: `${token}` });

  const getFicctColaboraRepos = async () => {
    return await octokit.request("GET /search/repositories", {
      q: "topic:ficct-colabora",
    });
    // console.log("repos", repos.data.items);
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

  const checkPullOpen = (pull) => {
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

  const getPullRequestsOpen = (repos) => {
    repos.map(async (item) => {
      let pulls = await getMyPullRequests(item.owner.login, item.name);
      //   console.log("pulls", pulls.data);
      pulls.data.filter((pull) => checkPullOpen(pull));
    });
  };

  const getPullRequestsClosed = (repos) => {
    repos.map(async (item) => {
      let pulls = await getMyPullRequestsClosed(item.owner.login, item.name);
      //   console.log("pulls", pulls.data);
      pulls?.data?.filter((pull) => checkPullMerged(pull));
    });
  };

  const callFunctions = () => {
    setIsLoading(true);

    getFicctColaboraRepos()
      .then((repos) => {
        getPullRequestsOpen(repos.data.items);
        getPullRequestsClosed(repos.data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Grid item xs={12} sm={5} md={3}>
              <ProfileCard />
            </Grid>

            <Grid item xs={12} sm={7} md={8}>
              <Grid container spacing={2}>
                <Typography variant="h6">Mi avance</Typography>
                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" spacing={2}>
                    <Avatar className={classes.green}>
                      <AssignmentIcon />
                    </Avatar>
                    <Box ml={2}>
                      <Card className={classes.rootCard}>
                        <CardContent>
                          <Chip
                            label="Pull Requests abiertos"
                            className={classes.green}
                          />
                          <List dense={true}>
                            {myPullRequests.map((pull) => (
                              <PullItem
                                id={pull.id}
                                title={pull.title}
                                html_url={pull.html_url}
                                created_at={pull.created_at}
                                color="green"
                              />
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" spacing={2}>
                    <Avatar className={classes.orange}>
                      <AssignmentTurnedInIcon />
                    </Avatar>
                    <Box ml={2}>
                      <Card className={classes.rootCard}>
                        <CardContent>
                          <Chip
                            label="Pull Requests aceptados"
                            className={classes.orange}
                          />
                          <List dense={true}>
                            {mypullRequestsClosed.map((pull) => (
                              <PullItem
                                id={pull.id}
                                title={pull.title}
                                html_url={pull.html_url}
                                created_at={pull.created_at}
                                color="orange"
                              />
                            ))}
                          </List>
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
