import React, { useContext } from 'react'
// import { useEffect, useState, useRef } from 'react'
import Control from '../Controls/Control'
import styles from './UserVideo.module.css'
import { SocketContext } from '../../context/VideoContext'
import DisplayLottie from '../DisplayLottie'
import VideoOff from '../../assests/LottieProfile/70796-character-animation.json'
import BGAvatar from '../../assests/LottieProfile/79705-loader.json'

const UserVideo = () => {
  const {
    myVideo,
    myVideoStatus,
  } = useContext(SocketContext);
  return (
    <div id='container' className={styles.container}>
      <video
        className={styles.video}
        playsInline
        muted
        ref={myVideo}
        autoPlay
        style={{
          opacity: `${myVideoStatus ? "1" : "0"}`,
        }}
      />
      {!myVideoStatus ?
        <div className={styles.avatar}>
          <div className={styles.bg}>
            <DisplayLottie animationData={BGAvatar} />
          </div>
          <div className={styles.av}>
            <DisplayLottie animationData={VideoOff} />
          </div>
        </div>
        : null
      }
      <div className={styles.controls}>
        <Control />
      </div>
    </div>
  )
}

export default UserVideo