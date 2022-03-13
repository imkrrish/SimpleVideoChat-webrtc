import React, { useContext } from 'react'
// import { useEffect, useState, useRef } from 'react'
import Control from '../Controls/Control'
import styles from './UserVideo.module.css'
import { SocketContext } from '../../context/VideoContext'


const UserVideo = () => {
  const { myVideo } = useContext(SocketContext);
  return (
    <div id='container' className={styles.container}>
      <video className={styles.video} playsInline muted ref={myVideo} autoPlay />
      <div className={styles.controls}>
        <Control />
      </div>
    </div>
  )
}

export default UserVideo