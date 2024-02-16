const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const dirName = path.join(__dirname, "timeStamps");

// Create directory if it doesn't exist
if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
}

app.get("/", (req, res) => {
    res.send("Hi, This is my web server");
});

app.get("/date-time", (req, res) => {
    const date = new Date();
    const currentTime = date.toUTCString().slice(0, -3);
    const filename = currentTime.replace(/[: ]/g, "-") + ".txt";
    const content = `The Current Timestamp is: ${currentTime}`;

    fs.writeFile(path.join(dirName, filename), content, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error writing file");
        } else {
            res.send("File created successfully");
        }
    });
});

app.listen(8000, () => console.log("Server started on localhost:8000"));
