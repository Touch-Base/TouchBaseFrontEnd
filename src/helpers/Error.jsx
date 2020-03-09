import React from 'react';

const Error = ({ touched, message, network}) => {
    if (!touched) {
        return <div className={network ? "cnxInvalid" : "invalid"}>&nbsp;</div>;
    }
    if (message) {
        return <div className={network ? "cnxInvalid" : "invalid"}>{message}</div>
    }
    return <div className="valid">&nbsp;</div>;
};

export default Error;