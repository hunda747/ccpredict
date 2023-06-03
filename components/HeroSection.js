import React, { useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  // createMuiTheme,
} from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import classes from "../styles/Hero.module.css";

// const theme = createMuiTheme();
const theme = createTheme();

const HeroSection = () => {
  // const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [probabilities, setProbabilities] = useState([]);

  const handleUpload = () => {
    console.log("upload");
    if (!selectedFile) {
      console.log("no select file");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("/api/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProbabilities(data.probabilities);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("end");
  };

  return (
    <div className={classes.root}>
      {/* <Container maxWidth="sm"> */}
      <div className={classes.header}>Cervical Cancer Screening</div>
      <div className={classes.description}>
        Upload an image to predict the type of cervical cancer.
      </div>
      <Button
        variant="contained"
        color="primary"
        component="label"
        className={classes.button}
        onChange={handleUpload}
      >
        Upload Image
        <input type="file" hidden />
      </Button>
      {/* </Container> */}
    </div>
  );
};

export default HeroSection;
