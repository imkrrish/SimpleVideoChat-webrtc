import React, { useContext } from 'react';
import styles from './AppBar.module.css';
import logo from '../../lg-konnectlogo.svg';
import AssignmentIcon from '@mui/icons-material/Assignment';
import IconButton from '../CustomButton/IconButton';
import { SocketContext } from '../../context/VideoContext';

const AppBar = () => {
    const {
        CreateMyId
    } = useContext(SocketContext);
    return <>
        <div className={styles.container}>
            <div className={styles.nav}>
                <img src={logo} alt="Konnect-logo" />
                {!CreateMyId ?
                    <IconButton name="CreateId" content="CREATE YOUR ID" icon={<AssignmentIcon />} />
                    : null}
            </div>
        </div>
    </>;
};



export default AppBar;