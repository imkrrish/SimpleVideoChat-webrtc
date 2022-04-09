import React, { useContext } from 'react'
// import { useEffect, useState, useRef } from 'react'
import Control from '../Controls/Control'
import styles from './UserVideo.module.css'
import { SocketContext } from '../../context/VideoContext'
import DisplayLottie from '../DisplayLottie'
import VideoOff from '../../assests/LottieProfile/70796-character-animation.json'
import BGAvatar from '../../assests/LottieProfile/79705-loader.json'
import Overlay from '../Overlay/Overlay'
import GenerateId from '../GenerateId/GenerateId'
import MakeCall from '../MakeCall/MakeCall'
import Calling from '../Calling/Calling'
import ReceivingCall from '../ReceivingCall/ReceivingCall'

const UserVideo = () => {
  const {
    myVideo,
    myVideoStatus,
    userVideoStatus,
    callAccepted,
    callEnded,
    CreateMyId,
    makeCall,
    calling,
    call,
    userVideo
  } = useContext(SocketContext);

  const CamOffIcon = (name) => {
    return (
      <div className={styles.avatar}>
        <div className={styles.bg}>
          <DisplayLottie animationData={BGAvatar} />
        </div>
        <div className={styles.av}>
          <DisplayLottie animationData={VideoOff} />
        </div>
      </div>);
  }

  return (
    <div id='container' className={styles.container}>
      <div className={styles.videoContainer}>
        <div
          className={
            callAccepted && !callEnded ? styles.mySamllVideoContainer : styles.myvideo
          }>
          <video
            className={
              callAccepted && !callEnded ? styles.myVideosmall : styles.myVideo
            }
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{
              opacity: `${myVideoStatus ? "1" : "0"}`,
            }}
          />
          {!myVideoStatus ?
            <CamOffIcon />
            : null
          }
        </div>
        {callAccepted && !callEnded ?
          <div className={styles.userVideoContainer}>
            <video
              className={styles.userVideo}
              playsInline
              muted
              ref={userVideo}
              autoPlay
              style={{
                opacity: `${userVideoStatus ? "1" : "0"}`,
              }}
            />
            {!userVideoStatus ?
              <CamOffIcon />
              : null
            }
          </div>
          : null}
      </div>

      {CreateMyId && !makeCall ? <Overlay><GenerateId /></Overlay> : null}
      {makeCall ? <Overlay><MakeCall /></Overlay> : null}
      {calling ? <Overlay><Calling /></Overlay> : null}
      {call.isReceivingCall && !callAccepted ? <Overlay><ReceivingCall /></Overlay> : null}

      <div className={styles.controls}>
        <Control />
      </div>
    </div>
  )
}

export default UserVideo