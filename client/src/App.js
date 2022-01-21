import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import Fab from '@material-ui/core/Fab'
import PhoneIcon from "@material-ui/icons/Phone"
import VideocamIcon from '@material-ui/icons//Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./App.css"
import logo from './konnectlogo.svg'
import { makeStyles } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#C87CF2',
      dark: '#D06FE8',
    },
    secondary: {
      main: '#FFFFFF',
    },
    type: 'dark'
  },
});

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    color: "#454545",
    "&.Mui-focused": {
      color: "white"
    }
  },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "white" //default
    },
    "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "white" //hovered
    },
    "&$cssFocused $notchedOutline": {
      borderColor: "white" //focused
    }
  },
}));

const socket = io.connect('http://localhost:5000')
function App() {
  const [me, setMe] = useState("")
  const [stream, setStream] = useState()
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")
  const [audio, setaudio] = useState("true");
  const [video, setvideo] = useState("true");
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream
    })

    socket.on("me", (id) => {
      setMe(id)
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true)
      setCaller(data.from)
      setName(data.name)
      setCallerSignal(data.signal)
    })
  }, [])

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      })
    })
    peer.on("stream", (stream) => {

      userVideo.current.srcObject = stream

    })
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      document.getElementById('videocontainer').classList.add("callaccepted")
      document.getElementById('video').classList.add("callaccepted")
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    document.getElementById('videocontainer').classList.add("callaccepted")
    document.getElementById('video').classList.add("callaccepted")
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const handleVideo = () => {
    const videoTracks = stream.getTracks().find(track => track.kind === "video");
    if (videoTracks.enabled) {
      videoTracks.enabled = false;
      setvideo(false);
    } else {
      videoTracks.enabled = true;
      setvideo(true);
    }
  }

  const handleAudio = () => {
    const audioTracks = stream.getTracks().find(track => track.kind === "audio");
    if (audioTracks.enabled) {
      audioTracks.enabled = false;
      setaudio(false);
    } else {
      audioTracks.enabled = true;
      setaudio(true);
    }
  }

  const leaveCall = () => {
    setCallEnded(true)
    document.getElementById('videocontainer').classList.remove("callaccepted")
    document.getElementById('video').classList.remove("callaccepted")
    connectionRef.current.destroy()
  }

  const classes = useStyles();

  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1 className="branding">Konnect</h1>
          </div>
          <CopyToClipboard text={me}>
            <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
              Copy YOUR ID
            </Button>
          </CopyToClipboard>
        </div>
        <div className="card">
          <div id='videocontainer' className="video-container">
            {/* className={`video-container ${callAccepted ? callaccepted : ""}`} */}
            <div id="video" className="video">
              {stream && <video playsInline muted ref={myVideo} autoPlay />}
            </div>
            <div className="callervideo">
              {callAccepted && !callEnded ?
                <video playsInline ref={userVideo} autoPlay /> :
                null}
            </div>

            <div className="streamControls">
              <ThemeProvider theme={theme}>
                <div className="iconbutton">
                  <IconButton onClick={handleVideo}>
                    {video ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
                  </IconButton>
                </div>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <IconButton onClick={handleAudio}>
                  {audio ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
                </IconButton>
              </ThemeProvider>
            </div>
          </div>

          <div className="myId">
            <ThemeProvider theme={theme}>
              <div className="input">
                <TextField
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  color='secondary'
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }
                  }}
                />
              </div>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <div className="input">
                <TextField
                  id="outlined-basic"
                  label="ID to call"
                  variant="outlined"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  color='secondary'
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }
                  }}
                />
              </div>
            </ThemeProvider>
            <div className="call-button">
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" onClick={leaveCall}>
                  End Call
                </Button>
              ) : (
                <Fab color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                  <PhoneIcon fontSize="large" />
                </Fab>
              )}
            </div>
          </div>
          <div>
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <h1 >{name} is calling...</h1>
                <Button variant="contained" color="primary" onClick={answerCall}>
                  Answer
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default App