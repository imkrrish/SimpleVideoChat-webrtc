import React, { useContext } from 'react';
import { SocketContext } from '../../context/VideoContext';
import styles from './ReceivingCall.module.css';
import BG from '../../assests/LottieProfile/79705-loader.json';
import calling from '../../assests/LottieProfile/65044-call.json';
import DisplayLottie from '../DisplayLottie';
import Typography from '@mui/material/Typography'
import IconButton from '../CustomButton/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';

const ReceivingCall = () => {
    const {
        call
    } = useContext(SocketContext);
    return (
        <div>
            <div className={styles.calling}>
                <div className={styles.bg}>
                    <DisplayLottie animationData={BG} />
                </div>
                <div className={styles.call}>
                    <DisplayLottie animationData={calling} />
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.typography}>
                    <Typography variant="h5" color="white">
                        {call.name} is calling
                        <span className={styles.span} id={styles.span1}> .</span>
                        <span className={styles.span} id={styles.span2}> .</span>
                        <span className={styles.span} id={styles.span3}> .</span>
                    </Typography>
                </div>

                <div className={styles.buttons}>
                    <IconButton
                        name="RejectCall"
                        content="Decline..."
                        color="secondary"
                        icon={<PhoneIcon />}
                    />
                    <IconButton
                        name="AcceptCall"
                        content="Answer..."
                        icon={<PhoneIcon />}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReceivingCall