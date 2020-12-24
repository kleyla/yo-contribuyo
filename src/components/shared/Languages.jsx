import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Languages = (props) => {
  const [languages, setLanguages] = useState({});

  const getLanguages = async () => {
    await fetch(`${props.url}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setLanguages(data);
      });
  };
  useEffect(() => {
    getLanguages();
  }, []);
  return (
    <>
      {Object.keys(languages).forEach(function (key) {
        return <Chip label={key} />;
        // console.table("Key : " + key + ", Value : " + languages[key]);
      })}
    </>
  );
};

export default Languages;
