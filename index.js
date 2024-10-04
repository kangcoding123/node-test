const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/sound/:name", (req, res) => {
  const { name } = req.params;
  let soundPath = "";

  if (name === "dog") {
    soundPath = path.join(__dirname, "sounds/dog.mp3");
    res.json({ sound: "멍멍" });
  } else if (name === "cat") {
    soundPath = path.join(__dirname, "sounds/cat.mp3");
    res.json({ sound: "야옹" });
  } else if (name === "pig") {
    soundPath = path.join(__dirname, "sounds/pig.mp3");
    res.json({ sound: "꾸엑" });
  } else {
    return res.json({ sound: "알수없음" });
  }

  if (soundPath) {
    exec(`start ${soundPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error playing sound: ${error}`);
        return res.status(500).send("Error playing sound");
      }
      console.log(`Sound played: ${stdout}`);
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
