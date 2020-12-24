import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Languages = (props) => {
  const [languages, setLanguages] = useState({});

  const getLanguages = () => {
    fetch(`${props.url}`)
      .then((response) => response.json())
      .then((data) => setLanguages(data));
  };
  useEffect(() => {
    getLanguages();
  }, []);
  return (
    <>
      {/* {languages.map((item) => {
        return <Chip label={item.value} />;
      })} */}
    </>
  );
};

export default Languages;
