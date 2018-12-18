import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const modal = props => (
  <>
    <Backdrop show={props.show} modalClose={props.backdropClicked} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </>
);

export default modal;
