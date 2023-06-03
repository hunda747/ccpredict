import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Navbar from "../components/Navbar";
import classes from "../styles/result.module.css";

const ResultPage = () => {
  // const classes = useStyles();

  // Example data
  const imageSrc = "path/to/image.jpg";
  const result = "Type 1";
  const type1notes = [
    "Presence of abnormal cells in the cervical tissue with mild dysplasia.",
    "Low-grade squamous intraepithelial lesion (LSIL).",
    "Minimal risk of progression to invasive cancer.",
    "Regular monitoring and follow-up recommended.",
    "Mild changes in cervical tissue appearance.",
    "Presence of low-grade abnormalities in Pap smear results.",
    "Usually asymptomatic or may cause mild, non-specific symptoms.",
  ];
  const type2notes = [
    "Presence of moderate to severe dysplasia in the cervical tissue.",
    "High-grade squamous intraepithelial lesion (HSIL).",
    "Increased risk of progression to invasive cancer.",
    "Further diagnostic tests and treatment options should be considered.",
    " severe changes in cervical tissue appearance.",
    "Presence of high-grade abnormalities in Pap smear results.",
  ];
  const type3notes = [
    "Presence of severe dysplasia or carcinoma in situ in the cervical tissue.",
    "Carcinoma in situ (CIS) refers to the presence of cancer cells that are confined to the surface layer of the cervix.",
    "High risk of progression to invasive cancer.",
    "Prompt treatment and close monitoring are essential.",
    "Severe changes in cervical tissue appearance.",
    "Presence of carcinoma in situ (CIS) cells.",
    "More pronounced symptoms such as abnormal vaginal bleeding (including post-menopausal bleeding), persistent pelvic pain, heavy or prolonged periods, and pain during sexual intercourse.",
  ];

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Container maxWidth="lg">
          <div className={classes.all}>
            <div>
              <Typography variant="h4" component="h4" align="center">
                Result Page
              </Typography>
            </div>
            <div className={classes.content}>
              <div className={classes.imageContainer}>
                <img
                  src={"/type1.jpg"}
                  alt="Input Image"
                  className={classes.imageLeft}
                />
              </div>
              <div className={classes.resultContainer}>
                {/* <Typography variant="h6" gutterBottom>
                  Result:
                </Typography> */}
                <Typography variant="h4" gutterBottom>
                  {result}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Characteristics:
                </Typography>
                <ul>
                  {type1notes.map((characteristic, index) => (
                    <li key={index} className={classes.bulletPoint}>
                      {characteristic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p>
                These results are for informational purposes only and should not
                be used as a standalone basis for medical decisions. Diagnostic
                tests and expert medical guidance are essential for accurate
                diagnosis and appropriate treatment. Use these predictions as a
                supplementary tool, not a substitute for professional medical
                care.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ResultPage;
