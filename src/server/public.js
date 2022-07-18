const http = require("http");
const express = require("express");
const ngrok = require("ngrok");
const path = require("path");
const ws = require("ws");
const cors = require("cors");
const events = require("events")

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

let main = new events.EventEmitter();

app.use(cors())
app.use(express.static(path.resolve(__dirname, "..", "scanner")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "scanner", "index.html"))
})

let cons = [];
let conhandlers = [];
wss.on("connection", (con) => {
    con.on("message", (msg) => {
        msg = JSON.parse(msg.toString());
        if(con.type == "listener") return;
        if(con.url.includes("listener")) {
            con.type = "listener";
            conhandlers.push((a) => con.send(JSON.stringify(a)))
            return;
        }
        if(msg.name) {
            con.type = "scanner";
            cons.push(msg.name)
            con.name = msg.name
            conhandlers.forEach(c => c(cons))
        }
        con.send(JSON.stringify({ message: "OK"}));
    })
    con.on("close", () => {
        cons.splice(cons.indexOf(con.name), 1);
        conhandlers.forEach(c => c(cons))
    })
})

server.listen(8081, async () => {
    console.log("Public Server Listening...")
    let url = await ngrok.connect({
        proto: "http",
        addr: 8081,
        region: "eu"
    })
    main.emit("url", url);
})

module.exports = { main };