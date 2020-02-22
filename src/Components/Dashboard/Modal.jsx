import React, { Component } from "react";
import '../../Styling/dashboard/formmodal.scss'

class Modal extends Component {

  render() {
    if(!this.props.visible){
          return null;
    } else {
    return <div className="modal">
                {this.props.children}
            </div>;
    }
  }
}

export default Modal;