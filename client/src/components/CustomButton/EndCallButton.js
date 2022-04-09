import React, { useContext } from 'react'
import { SocketContext } from '../../context/VideoContext';
import { Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';


const theme = createTheme({
    palette: {
        primary: {
            light: '#ff5a36',
            main: '#ff0000',
            dark: '#c20000',
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

const EndCallButton = (props) => {
    const {
        leaveCall
    } = useContext(SocketContext);
    const classes = useStyles();
    const handleClick = () => {
        leaveCall();
    }
    return <>
        <ThemeProvider theme={theme}>
            <Fab
                className={classes.root}
                color={props.color}
                aria-label={props.lable}
                size={props.size}
                onClick={() => {
                    handleClick();
                }}
            >
                {props.icon}
            </Fab>
        </ThemeProvider>
    </>
}

export default EndCallButton