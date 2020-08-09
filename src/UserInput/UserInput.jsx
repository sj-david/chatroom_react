import React from 'react';

import TextField from '@material-ui/core/TextField';

const userInput = (props) => {
    const inputStyle = {
        width: "100%"
    };

    return (
      <div>
          <TextField
            label="Multiline"
            style={inputStyle}
            multiline
            rowsMax={4}
            value={props.currentText}
            onChange={props.changed}
            />
      </div>
    );
};

export default userInput;
