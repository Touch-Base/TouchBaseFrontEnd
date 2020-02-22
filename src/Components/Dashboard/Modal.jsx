import React, { Component } from "react";

class Modal extends Component {

  render() {
    if(!this.props.visible){
          return null;
    } else {
    return <div>{this.props.children}</div>;
    }
  }
}

export default Modal;