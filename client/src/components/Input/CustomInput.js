import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { SocketContext } from '../../context/VideoContext';

const CssTextField = styled(TextField)({
  '& label': {
    color: '#7D94E4'
  },
  '& label.Mui-focused': {
    color: '#7D94E4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#7D94E4',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#7D94E4',
      backgroundColor: 'rgba(39, 54, 106, 77%)',
    },
    '&:hover fieldset': {
      borderColor: '#7D94E4',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7D94E4',
    },
  },
  '& .MuiInputBase-input': {
    color: '#7D94E4',
    zIndex: '99'
  }
});

export default function CustomInput(props) {
  const {
    setName,
    setOtherUser
  } = useContext(SocketContext);

  const handleChange = (e) => {
    if (props.name === "nameInput") {
      setName(e)
    }
    if (props.name === "Id") {
      setOtherUser(e)
    }
  }
  return (
    <CssTextField
      label={props.label}
      id="custom-css-outlined-input"
      onChange={(e) => { handleChange(e.target.value) }}
      fullWidth
      autoComplete='off'
      margin="normal"
    />
  );
}