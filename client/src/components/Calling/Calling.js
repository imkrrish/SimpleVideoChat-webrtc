import React from 'react'
import DisplayLottie from '../DisplayLottie'
import calling from '../../assests/LottieProfile/calling.json'
import BG from '../../assests/LottieProfile/79705-loader.json'
import styles from './Calling.module.css'
// import DialingTone from '../../assests/LottieProfile/OutgoingRingtone.mp3'

const Calling = () => {
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
        </div>
    )
}

export default Calling