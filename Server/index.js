const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Konnect')
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", {
            signal: data.signalData,
            from: data.from,
            name: data.name
        });
    });

    socket.on("updateMyMedia", (data) => {
        socket.broadcast.emit("updateMyMedia", {
            type: data.type,
            currentMediaStatus: data.currentMediaStatus
        });
    });

    socket.on("msgUser", (data) => {
        io.to(data.to).emit("msgRsv", {
            name: data.name,
            msg: data.msg,
            sender: data.sender
        });
    });

    socket.on("answerCall", (data) => {
        socket.broadcast.emit("updateUserMedia", {
            type: data.type,
            currentMediaStatus: data.currentMediaStatus
        });
        io.to(data.to).emit("callAccepted", data);
    });

    socket.on("endCall", ({ id }) => {
        io.to(id).emit("endCall");
    });

});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));