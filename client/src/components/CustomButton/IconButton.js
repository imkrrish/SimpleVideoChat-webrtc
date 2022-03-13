import React from 'react';
import Button from '@mui/material/Button';
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
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold'
                }
            }
        },
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
        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
    },
}))

const IconButton = (props) => {
    const classes = useStyles();
    return <div>
        <ThemeProvider theme={theme}>
            <Button
                className={classes.root}
                variant="contained"
                color='primary'
                startIcon={props.icon}
                size='medium'
                fontSize='inherit'
            >
                {props.content}
            </Button>
        </ThemeProvider>
    </div>
};

export default IconButton;
