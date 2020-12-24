import { Grid } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <h1>Form</h1>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <h1>Repos</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
