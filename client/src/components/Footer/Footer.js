import { Typography } from '@mui/material'
import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <Typography
                color='white'
                align='center'
                variant="h6"
                component="h6"
            >
                Made with <span className={styles.emoji}>❤</span> by Krishan
            </Typography>
        </div>
    )
}

export default Footer