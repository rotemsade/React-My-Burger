import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../ToggleButton/ToggleButton";

import classes from "./Toolbar.module.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <ToggleButton clicked={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
