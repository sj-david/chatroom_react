import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>{props.chatText}</p>
        </div>
    );
};

export default userOutput;
