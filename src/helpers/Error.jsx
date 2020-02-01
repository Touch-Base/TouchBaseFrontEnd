import React from 'react';

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div className="invalid">&nbsp;</div>;
    }
    if (message) {
        return <div className="invalid">{message}</div>
    }
    return <div className="valid">&nbsp;</div>;
};

export default Error;