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
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

// const theme = createMuiTheme();
const theme = createTheme();

const HeroSection = () => {
  // const classes = useStyles();
  // const [selectedFile, setSelectedFile] = useState(null);
  const [probabilities, setProbabilities] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("upload");
    // console.log(e.target);
    // console.log(e.target.files[0]);
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.log("no select file");
      return;
    }
    console.log(selectedFile);

    setLoader(true);
    console.log("filessss");
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function (ev) {
      setImageUrl(ev.target.result);
      // console.log(ev.target.result);
      const url = ev.target.result;

      const formData = new FormData();
      formData.append("image", selectedFile);
      // console.log('img',imageUrl);
      fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // setProbabilities(data.probabilities);
          router.push({
            pathname: "/result",
            query: { type: data.probabilities, image: ev.target.result},
          });
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          setLoader(false);
        });
    };


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
        <input type="file" onChange={(e) => handleUpload(e)} hidden />
      </Button>
      {
        loader && (
          <CircularProgress />
        )
      }
      {/* </Container> */}
    </div>
  );
};

export default HeroSection;
