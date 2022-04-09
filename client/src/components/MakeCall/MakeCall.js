import React from 'react';
import styles from './MakeCall.module.css';
import CancelButton from '../CustomButton/CancelButton';
import CustomInput from '../Input/CustomInput';
import IconButton from '../CustomButton/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';

const MakeCall = () => {
    return (
        <div className={styles.makeCallContainer}>
            <div className={styles.cancelButton}>
                <CancelButton name="MakeCall" />
            </div>

            <div className={styles.form}>
                <CustomInput
                    label="Enter Your Name"
                    name="nameInput"
                />
                <CustomInput
                    label="Paste Their Id"
                    name="Id"
                />

                <div className={styles.button}>
                    <IconButton
                        name="MakeCall"
                        content="Call"
                        icon={<PhoneIcon />}
                    />
                </div>
            </div>
        </div>
    )
}

export default MakeCall