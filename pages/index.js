import React from "react";
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      {/* <nav>
        <h1>Navbar</h1>
      </nav> */}
      {/* Add your navbar content here */}

      <HeroSection />
    </div>
  );
};

export default Home;
