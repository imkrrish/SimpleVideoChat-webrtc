import React, { useState } from 'react'
import FabIconButton from '../CustomButton/FabIconButton'
import EndCallButton from '../CustomButton/EndCallButton';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import FilterIcon from '@mui/icons-material/Filter';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    controlBar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    message: {
        position: 'absolute'
    }
}))

const Control = () => {
    // const [video, setvideo] = useState(true);
    const classes = useStyles();
    return (
        <>
            <div className={classes.controlBar}>
                <FabIconButton
                    color='secondary'
                    size='medium'
                    lable='V-Background'
                    icon={<FilterIcon fontSize='medium' />}
                />
                <FabIconButton
                    color='secondary'
                    size='medium'
                    lable='Video'
                    icon={<VideocamIcon fontSize='medium' />}
                />
                <FabIconButton
                    color='primary'
                    size='large'
                    lable='makeCall'
                    icon={<CallIcon fontSize='large' />}
                />
                {/* <EndCallButton
                    color='primary'
                    size='large'
                    lable='endCall'
                    icon={<CallIcon fontSize='large' />}
                /> */}
                <FabIconButton
                    color='secondary'
                    size='medium'
                    lable='Mic'
                    icon={<MicIcon fontSize='medium' />}
                />
                <FabIconButton
                    color='secondary'
                    size='medium'
                    lable='Screen-Share'
                    icon={<ScreenShareIcon fontSize='medium' />}
                />
            </div>
        </>
    )
}

export default Control