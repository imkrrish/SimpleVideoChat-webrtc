import React from 'react';
import styles from './AppBar.module.css';
import logo from '../../lg-konnectlogo.svg';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '../CustomButton/IconButton';



const AppBar = () => {
    return <>
        <div className={styles.container}>
            <div className={styles.nav}>
                <img src={logo} alt="Konnect-logo" />
                <IconButton content="CREATE YOUR ID" icon={<AssignmentIcon />} />
                {/* <IconButton content="COPY ID" icon={<PhoneIcon />} /> */}
            </div>
        </div>
    </>;
};



export default AppBar;