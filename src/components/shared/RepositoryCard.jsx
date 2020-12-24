import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

const RepositoryCard = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <Card>
      <CardHeader>
        <h3>{props.full_name}</h3>
      </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;
