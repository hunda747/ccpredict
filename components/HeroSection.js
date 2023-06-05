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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InfoIcon from "@mui/icons-material/Info";
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
        Cervical <span className={classes.colring}>Cancer</span> likelihood with
        cervix <span className={classes.colring}>type</span> predictor using{" "}
        <span className={classes.colring}>AI</span>
      </div>
      <div className={classes.description}>
        Please <span className={classes.colring}>Upload</span> cervix colposcopy{" "}
        <span className={classes.colring}>image</span> below to predict the
        cervical cancer likelihood and the type of cervix.
      </div>
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img
            src={"/ai.png"}
            alt="Input Image"
            className={classes.imageLeft}
          />
        </div>
        <div className={classes.form}>
          <Button
            variant="contained"
            color="success"
            component="label"
            onChange={handleUpload}
            style={{
              padding: "0.5rem 1rem",
              margin: "0 3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
            className={classes.buttonM}
          >
            {/* <FileUploadIcon
              sx={{ paddingRight: "10px", background: "white", color: "black" }}
            /> */}
            <span className={classes.uploads}>Upload Image</span>
            <input type="file" onChange={(e) => handleUpload(e)} hidden />
          </Button>
          <div>
            <div className={classes.info}>
              <div>
                <InfoIcon fontSize="small" />
              </div>
              <div>
                Please <span className={classes.colring}>upload</span> an
                appropriate image that provides a clear view of the cervix.
                Please ensure that the image specifically represents a
                colposcopy image. Do not upload any other type of image, as this
                model is specifically designed for cervical cancer prediction
                using colposcopy images
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader && <CircularProgress />}
      {/* </Container> */}
      <div className={classes.notes}></div>
    </div>
  );
};

export default HeroSection;
