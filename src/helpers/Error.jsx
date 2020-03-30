import React from "react";

const Error = ({ touched, message, network, event }) => {
  if (!touched) {
    return <div className={network ? "cnxInvalid" : "invalid"}>&nbsp;</div>;
  }
  if (message && !event) {
    return <div className={network ? "cnxInvalid" : "invalid"}>{message}</div>;
  }

  if (message && event) {
    return (
      <div className={network ? "cnxInvalid" : "evtinvalid"}>{message}</div>
    );
  }

  return <div className="valid">&nbsp;</div>;
};

export default Error;
