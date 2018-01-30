import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MaterialTextField = () => (
  <MuiThemeProvider>
    <TextField
      hintText="Hint Text"
      floatingLabelText="Floating Label Text"
    />
  </MuiThemeProvider>
);

export default MaterialTextField;
