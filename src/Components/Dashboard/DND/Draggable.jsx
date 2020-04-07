import React from "react";
import PropTypes from "prop-types";

export default function Draggable(props) {
  const drag = (event) => {
    event.dataTransfer.setData("transfer", event.target.id);
  };

  const noAllowDrop = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      id={props.id}
      draggable="true"
      onDragStart={drag}
      onDragOver={noAllowDrop}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

Draggable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
