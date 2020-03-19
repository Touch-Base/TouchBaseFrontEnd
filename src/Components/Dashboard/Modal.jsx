import React, { Component } from "react";
import "../../Styling/dashboard/formmodal.scss";

class Modal extends Component {
  render() {
    return (
      <div className={this.props.visible ? "modal" : "modal hide"}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
