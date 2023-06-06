import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Navbar from "../components/Navbar";
import classes from "../styles/result.module.css";
import { useRouter } from "next/router";
import InfoIcon from "@mui/icons-material/Info";

const type1notes = [
  "Presence of abnormal cells in the cervical tissue with mild dysplasia.",
  "Low-grade squamous intraepithelial lesion (LSIL).",
  "Minimal risk of progression to invasive cancer.",
  "Regular monitoring and follow-up recommended.",
  // "Mild changes in cervical tissue appearance.",
  // "Presence of low-grade abnormalities in Pap smear results.",
  // "Usually asymptomatic or may cause mild, non-specific symptoms.",
];
const type2notes = [
  "Presence of moderate to severe dysplasia in the cervical tissue.",
  "High-grade squamous intraepithelial lesion (HSIL).",
  "Increased risk of progression to invasive cancer.",
  "Further diagnostic tests and treatment options should be considered.",
  // " severe changes in cervical tissue appearance.",
  // "Presence of high-grade abnormalities in Pap smear results.",
];
const type3notes = [
  "Presence of severe dysplasia or carcinoma in situ in the cervical tissue.",
  "Carcinoma in situ (CIS) refers to the presence of cancer cells that are confined to the surface layer of the cervix.",
  "High risk of progression to invasive cancer.",
  "Prompt treatment and close monitoring are essential.",
  // "Severe changes in cervical tissue appearance.",
  // "Presence of carcinoma in situ (CIS) cells.",
  // "More pronounced symptoms such as abnormal vaginal bleeding (including post-menopausal bleeding), persistent pelvic pain, heavy or prolonged periods, and pain during sexual intercourse.",
];
const ResultPage = () => {
  const router = useRouter();
  const { type, image } = router.query;
  console.log("data", type);
  // console.log('data', image);
  // const classes = useStyles();
  const [probabilities, setProbabilities] = useState([]);
  // Example data
  const imageSrc = "path/to/image.jpg";
  const result = "Type 1";

  const handlePredict = () => {
    console.log("Predict clicked");

    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("http://localhost:5000/predict", {
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
  };

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Container maxWidth="lg">
          <div className={classes.all}>
            <div className={classes.titleF}>
            {/* <Typography variant="h4" component="h4" align="center">
                Result 
              </Typography> */}
              cervical <span className={classes.colring}>cancer</span>  likelihood 
            </div>
            <div className={classes.content}>
              <div className={classes.imageContainer}>
                <img
                  src={image}
                  alt="Input Image"
                  className={classes.imageLeft}
                />
                {/* <img
                  src={"/type1.jpg"}
                  alt="Input Image"
                  className={classes.imageLeft}
                /> */}
              </div>
              <div className={classes.resultContainer}>
                <Typography variant="h6" gutterBottom>
                Cervix type :
                </Typography>
                <Typography variant="h4" gutterBottom>
                  <span className={classes.textTag}>Type {type}</span>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <span className={classes.colring}>Characteristics</span> :
                </Typography>
                <ul className={classes.checklist}>
                  {type === "1" &&
                    type1notes.map((characteristic, index) => (
                      <li key={index} className={classes.bulletPoint}>
                        {characteristic}
                      </li>
                    ))}
                  {type === "2" &&
                    type2notes.map((characteristic, index) => (
                      <li key={index} className={classes.bulletPoint}>
                        {characteristic}
                      </li>
                    ))}
                  {type === "3" &&
                    type3notes.map((characteristic, index) => (
                      <li key={index} className={classes.bulletPoint}>
                        {characteristic}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
        <div className={classes.warningNote}>
          <div className={classes.infoicon}>
            <InfoIcon fontSize="small" />
          </div>
          <p>
            These results are for informational purposes only and should not be
            used as a standalone basis for medical decisions. Diagnostic tests
            and expert medical guidance are essential for accurate diagnosis and
            appropriate treatment. Use these predictions as a supplementary
            tool, not a substitute for professional medical care.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
