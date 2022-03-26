import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import Call from '@mui/icons-material/Call';

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

        socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
            if (currentMediaStatus !== null || currentMediaStatus !== []) {
                switch (type) {
                    case "video":
                        setUserVideoStatus(currentMediaStatus);
                        break;
                    case "mic":
                        setUserMicStatus(currentMediaStatus);
                        break;
                    default:
                        setUserMicStatus(currentMediaStatus[0]);
                        setUserVideoStatus(currentMediaStatus[1]);
                        break;
                }
            }
        });

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.on("msgRsv", ({ name, msg: value, sender }) => {
            setMsgRsv({ value, sender });
            setTimeout(() => {
                setMsgRsv({});
            }, 2000);
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);
        setOtherUser(call.from);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", {
                signal: data,
                to: Call.from,
                userName: name,
                type: "both",
                myMediaStatus: [myMicStatus, myVideoStatus],
            });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });
        setOtherUser(id);
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userTOCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", ({ signal, userName }) => {
            setCallAccepted(true);
            setUserName(userName);
            peer.signal(signal);
            socket.emit("updateMyMedia", {
                type: "both",
                currentMediaStatus: [myMicStatus, myVideoStatus],
            });
        });

        connectionRef.current = peer;
    };

    const updateVideo = () => {
        setMyVideoStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "video",
                currentMediaStatus: !currentStatus,
            });
            stream.getVideoTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const updateMic = () => {
        setMyMicStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "mic",
                currentMediaStatus: !currentStatus,
            });
            stream.getAudioTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    const leaveCall = () => {
        setcallEnded(true);

        connectionRef.current.destroy();
        socket.emit("endCall", { id: otherUser });
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            setOtherUser,
            userName,
            myVideoStatus,
            setMyVideoStatus,
            userVideoStatus,
            setUserVideoStatus,
            updateVideo,
            myMicStatus,
            userMicStatus,
            updateMic,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };