import React from "react";
import PropTypes from "prop-types";

export default function Droppable(props) {
  const drop = (event) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("transfer");
    event.target.appendChild(document.getElementById(data));
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div id={props.id} onDrop={drop} onDragOver={allowDrop} style={props.style}>
      {props.children}
    </div>
  );
}

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
