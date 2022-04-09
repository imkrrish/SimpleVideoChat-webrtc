import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../../context/VideoContext';
import CopyTOClipboard from 'react-copy-to-clipboard';


const theme = createTheme({
    palette: {
        primary: {
            light: '#7281ff',
            main: '#2d55e2',
            dark: '#002daf',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ff5a36',
            main: '#ff0000',
            dark: '#c20000',
            contrastText: '#ffffff',
        }
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
    const {
        CreateId,
        callUser,
        otherUser,
        me,
        answerCall
    } = useContext(SocketContext);

    const handleClick = () => {
        if (props.name === "CreateId") {
            CreateId();
        }
        if (props.name === "MakeCall") {
            callUser(otherUser);
        }
        if (props.name === "RejectCall") {
            window.location.reload();
        }
        if (props.name === "AcceptCall") {
            answerCall();
        }
    }
    return <div>
        <ThemeProvider theme={theme}>
            {props.name === "copyId" ?
                <CopyTOClipboard text={me}>
                    <Button
                        className={classes.root}
                        variant="contained"
                        color='primary'
                        startIcon={props.icon}
                        size='medium'
                        fontSize='inherit'
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        {props.content}
                    </Button>
                </CopyTOClipboard> :
                <Button
                    className={classes.root}
                    variant="contained"
                    color={props.color}
                    startIcon={props.icon}
                    size='medium'
                    fontSize='inherit'
                    onClick={() => {
                        handleClick();
                    }}
                >
                    {props.content}
                </Button>
            }
        </ThemeProvider>
    </div>
};

export default IconButton;
