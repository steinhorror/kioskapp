const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "public")));
app.use(express.json())

app.post("/api/write", (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, "..", "..", "database.json"), JSON.stringify(req.body));
    res.json({ message: "Wrote content to file!"})
})

app.get("/api/read", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "database.json"));
})

app.get("/api/shutdown", (req, res) => {
    console.log("Shutdown!")
    res.send("Shutdown!");
})

app.listen(8081, () => console.log("Listening..."))