import React, { useContext } from 'react'
import { SocketContext } from '../../context/VideoContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#ffffff',
        },
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
        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
    },
}))

const CancelButton = (props) => {
    const classes = useStyles();
    const {
        setCreateMyId,
        setmakeCall
    } = useContext(SocketContext);

    const handleClick = () => {
        if (props.name === 'generateId') {
            setCreateMyId(false);
        }
        if (props.name === 'MakeCall') {
            setmakeCall(false);
            setCreateMyId(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                className={classes.root}
                size='large'
                color='primary'
                onClick={() => {
                    handleClick();
                }}
            >
                <CancelIcon fontSize='large' />
            </IconButton>
        </ThemeProvider>
    )
}

export default CancelButton