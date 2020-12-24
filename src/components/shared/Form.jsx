import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./../../hooks/useStyles";
import { db } from "./../../database/firebase";

const Form = (props) => {
  const classes = useStyles();
  const [language, setLanguageSelected] = useState("");
  const [languages, setLanguages] = useState([]);
  const [label, setLabel] = useState("");
  const [labels, setLabels] = useState([]);

  const handleChangeLanguage = (event) => {
    setLanguageSelected(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeLabel = (event) => {
    setLabel(event.target.value);
    console.log(event.target.value);
  };
  const getLanguages = () => {
    let docs = new Array();
    db.collection("languages").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        docs.push({ ...doc.data(), id: doc.id });
        // this.setState({all: [...{ ...doc.data(), id: doc.id}]})
      });
      //   console.log(docs);
      setLanguages(docs);
    });
  };
  const getLabels = () => {
    let docs = new Array();
    db.collection("labels").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        docs.push({ ...doc.data(), id: doc.id });
        // this.setState({all: [...{ ...doc.data(), id: doc.id}]})
      });
      //   console.log(docs);
      setLabels(docs);
    });
  };
  const searchRepositories = () => {
    console.log("Click");
    props.getRepositories(language, label);
  };
  useEffect(() => {
    getLanguages();
    getLabels();
  }, []);
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={5}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="language-input-id">
              Lenguaje/Tecnologia
            </InputLabel>
            <Select
              labelId="language-input-id"
              id="language-id"
              displayEmpty
              className={classes.selectEmpty}
              value={language}
              onChange={handleChangeLanguage}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {languages.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="label-input-id">
              Label
            </InputLabel>
            <Select
              labelId="label-input-id"
              id="label-id"
              displayEmpty
              className={classes.selectEmpty}
              value={label}
              onChange={handleChangeLabel}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {labels.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={searchRepositories}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
