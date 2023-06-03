import React, { useState } from "react";
// import { FiUpload } from "react-icons/fi";
import { DropzoneArea } from "react-dropzone";
import HeroSection from "./HeroSection";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [probabilities, setProbabilities] = useState([]);

  const handleFileChange = (files) => {
    console.log(files);
    setSelectedFile(files);
  };

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
    <div className="file-upload">
      {/* <DropzoneArea
        onChange={handleFileChange}
        acceptedFiles={["image/*"]}
        dropzoneText="Drag and drop an image here or click"
        filesLimit={1}
      /> */}
      <HeroSection />
      {/* <input type="file" onChange={(e) => handleFileChange(e.target.value)} />
      <button onClick={handleUpload}>
        Upload
      </button> */}
      {/* <FiUpload />  */}

      {probabilities.length > 0 && (
        <div>
          <h2>Prediction Results</h2>
          <ul>
            <li>Probability 1: {probabilities[0]}</li>
            <li>Probability 2: {probabilities[1]}</li>
            <li>Probability 3: {probabilities[2]}</li>
          </ul>
        </div>
      )}

      <style jsx>{`
        .file-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .file-upload button {
          margin-top: 10px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
