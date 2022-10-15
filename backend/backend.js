/*
This file is where the server receive his instructions
*/ 

const express = require('express')

const cors = require('cors');
const fileUpload = require('express-fileupload');

app = express();
app.use(express.json());
app.use(fileUpload());

//for the form data
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))

const PORT = 3001;
var PATH = "";
var FILENAME = "";

// Running the python script
let runPy = function () {
  const { spawn } = require("child_process");
  const pyprog = spawn("python", [
    "FromSpeechToSubtitle/speech/backend/speech.py",
  ]);
};

//This function is used to download the final video file
app.get("/download", function (req, res) {
  const file = `./result/Final.mp4`;
  res.download(file); // Set disposition and send it.
});

//GET the video from the user
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  const fileName = req.files.file.name;
  PATH = getPath(fileName);

  // check if the video is in the good format
  if (PATH != ".mp4") {
    return res.status(500).send({ message: "bad file format" });
  } else {
    FILENAME = file.name;
    // moving the file to a folder
    file.mv(`${__dirname}/client/${FILENAME}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        //create a python shell to run the script
        const PythonShell = require("python-shell").PythonShell;
        //run the python script
        PythonShell.run("speech.py", null, function (err) {
          if (err) throw err;
          res.json({ fileName: file.name, filePath: `/client/${FILENAME}` });
        });
      }
    });
  }
});

//Get the extension of a folder
const getPath = (folder) => {
  var path = require("path");
  var extenstion = path.extname(folder);
  return extenstion;
};

// The server is listening on the PORT
app.listen(PORT, function () {
  console.log("Listening on Port " + PORT);
});
