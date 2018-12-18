import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = props =>
  props.show ? (
    <div
      className={classes.Backdrop}
      style={{
        display: props.show ? "block" : "none"
      }}
      onClick={props.modalClose}
    />
  ) : null;

export default backdrop;
