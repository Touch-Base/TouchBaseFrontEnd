import React from "react";
import loader from "../../img/download.svg";
import "../../Styling/home.scss";

// this is the loader animation
function Loader(props) {
  return (
    <div className={props.loading ? "preloader" : "preloader hide"}>
      <img src={loader} alt="spinner" />
    </div>
  );
}

export default Loader;
