import React from "react";
import "../../Styling/footer.scss";

export default function Footer(props) {
  return (
    <div className={props.color ? "footerBlack" : "footerWhite"}>
      <h5>TouchBase &copy;</h5>
      <h6>All rights reserved by Anthony Vigliotta</h6>
    </div>
  );
}
