const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require("cors");


const app = express(); //ok

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.json(box);
    })
});//ok


mongoose.connect('mongodb+srv://OmniStack:OmniStack@cluster0-wta4w.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    }) //ok

app.use((req, res, next) => {
    req.io = io;

    return next();
});


app.use(express.json()); //ok
app.use(express.urlencoded({ extended: true })); //ok
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp"))); // ok

app.use(require("./routes")); //ok

//app.listen(3333); //ok
server.listen(process.env.PORT || 3333)