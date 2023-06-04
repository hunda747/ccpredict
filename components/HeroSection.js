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
import FileUploadIcon from '@mui/icons-material/FileUpload';

// const theme = createMuiTheme();
const theme = createTheme();

const HeroSection = () => {
  // const classes = useStyles();
  // const [selectedFile, setSelectedFile] = useState(null);
  const [probabilities, setProbabilities] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
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
            query: { type: data.probabilities, image: ev.target.result },
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoader(false);
        });
    };

    console.log("end");
  };

  return (
    <div className={classes.root}>
      {/* <Container maxWidth="sm"> */}
      <div className={classes.header}>
        Free Cervical Cancer Screening Predictor Using AI
      </div>
      <div className={classes.description}>
        Upload an image to predict the type of cervical cancer.
      </div>
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img
            src={"/type1.jpg"}
            alt="Input Image"
            className={classes.imageLeft}
          />
        </div>
        <div className={classes.form}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            
            onChange={handleUpload}
            style={{
              padding: "0.5rem 1rem",
              margin: '0 3rem',
              display: "flex",
              justifyContent: "center",
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <span><FileUploadIcon sx={{paddingRight: '10px'}}/></span> <span>Upload Image</span>
            
            <input type="file" onChange={(e) => handleUpload(e)} hidden />
          </Button>
        </div>
      </div>
      {loader && <CircularProgress />}
      {/* </Container> */}
    </div>
  );
};

export default HeroSection;
