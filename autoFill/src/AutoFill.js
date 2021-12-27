import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const AutoFill = (top100Films) => {

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div style={{color: "black"}}>{`InputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={top100Films.props}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="type something.." />}
      />
    </div>
  );
};
export default AutoFill;
