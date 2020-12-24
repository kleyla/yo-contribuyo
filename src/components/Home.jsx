import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Form from "./shared/Form";

const Home = () => {
  const API = "https://api.github.com/search/repositories?q=";
  const [repositories, setRepositories] = useState([]);
  const getRepositories = () => {
    // Simple GET request using fetch
    fetch(
      "https://api.github.com/search/repositories?q=javascript good-first-issues:>1"
    )
      .then((response) => response.json())
      .then((data) => console.log(data.items));
  };
  const getGoodFirstIssues = () => {
    fetch(`${API}good-first-issues:>1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRepositories(data.items);
      });
  };

  useEffect(() => {
    getGoodFirstIssues();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Formulario</h1>
          <Form getRepositories={getRepositories} />
        </Grid>
        <Grid item xs={12}>
          <h1>Repositorios</h1>
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
                        <CardContent>
                          {item.language && <Chip label={item.language} />}

                          <h3>{item.full_name}</h3>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.html_url}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
