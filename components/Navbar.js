import React from "react";
import classes from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <>
     <nav className={classes.navbar}>
      <div className={classes.menu}>
        <ul >
       <div className={classes.navbar__logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
           <li>home</li>
           <li>about</li>
         </ul>
       </div>
    </nav>
    </>
  );
};

export default Navbar;
