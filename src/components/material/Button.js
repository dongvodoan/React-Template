import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Button = ({ label }) => {
  return (
    <MuiThemeProvider>
      <RaisedButton label={label} primary={true} />
    </MuiThemeProvider>
  );
};

export default Button;
