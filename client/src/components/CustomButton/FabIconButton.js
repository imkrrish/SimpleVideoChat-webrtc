import React from 'react'
import { Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';


const theme = createTheme({
  palette: {
    primary: {
      light: '#7281ff',
      main: '#2d55e2',
      dark: '#002daf',
      contrastText: '#ffffff',
    },
    secondary: {
      light: 'rgba(81, 91, 153, 0.50)',
      main: 'rgba(33, 50, 106, 0.50)',
      dark: 'rgba(0, 12, 63, 0.50)',
      contrastText: '#ffffff',
    }
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.50))',
        }
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
}))

const FabIconButton = (props) => {
  const classes = useStyles();
  return <>
    <ThemeProvider theme={theme}>
      <Fab
        className={classes.root}
        color={props.color}
        aria-label={props.lable}
        size={props.size}
      >
        {props.icon}
      </Fab>
    </ThemeProvider>
  </>
}

export default FabIconButton