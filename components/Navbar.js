import React from "react";
import classes from "../styles/navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbar__logo}>
          {/* <img src="/logo.png" alt="Logo" /> */}
          <span>CCP</span>
        </div>
        <div className={classes.menu}>
          {/* <ul >
           <li><Link href={'/'}>home</Link> </li>
           <li>about</li>
         </ul> */}
          <div>Home</div>
          {/* <div>About</div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
