import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <style jsx>{`
        .navbar {
          // background-color: #333;
          // color: #fff;
          padding: 10px;
          display: "flex";
          justifycontent: "center";
        }

        .navbar__logo img {
          width: 100px;
          height: auto;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
