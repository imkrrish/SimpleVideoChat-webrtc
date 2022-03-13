import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://localhost:5000');


const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setcallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [chat, setChat] = useState([]);
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [userName, setUserName] = useState("");
    const [otherUser, setOtherUser] = useState("");
    const [myVideoStatus, setMyVideoStatus] = useState(true);
    const [userVideoStatus, setUserVideoStatus] = useState();
    const [myMicStatus, setMyMicStatus] = useState(true);
    const [userMicStatus, setUserMicStatus] = useState();
    const [msgRcv, setMsgRsv] = useState("");
    const [screenShare, setScreenSahre] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const screenTrackRef = useRef();

    useEffect(() => {
        const height = document.getElementById('container').clientHeight;
        const width = document.getElementById('container').clientWidth;
        navigator.mediaDevices.getUserMedia({
            video: {
                width: {
                    min: width,
                    ideal: width,
                    max: width,
                },
                height: {
                    min: height,
                    ideal: height,
                    max: height
                },
            }, audio: true
        }).then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        });
        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }

        socket.on("me", (id) => setMe(id));

        socket.on("endCall", () => {
            window.location.reload();
        });

        socket.on();
    }, []);

    return (
        <SocketContext.Provider value={{
            myVideo
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };