import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

/* Main functional component of the web application */
function App() {
  const [file, getFile] = useState(null);
  const [fileFormatError, setErrorFileFormat] = React.useState(false); // For the error box
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  //What happend when you click on the send video Button
  const handleButtonClick = () => {
    setSuccess(false);
    //Show the loading animation
    setLoading(true);
    download();
  };
  //Styling for the Send Video Button
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  //When the user click on send video
  const download = async () => {
    //Send the video to the backend
    await onDrop();
    //Hide the loading animation and show the success one
    setLoading(false);
    setSuccess(true);
    //Download the new video to the user computer
    axios({
      method: "get",
      url: "http://localhost:3001/download",
      responseType: "blob",
      headers: {},
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Final.mp4");
        document.body.appendChild(link);
        link.click();
      })
      //if there's an error
      .catch((error) => {
        alert(error);
      });
  };

  //Send the Video to the backend
  const onDrop = async () => {
    var formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (err) {
      if (err) {
        console.log("this is the err", err);
        setErrorFileFormat(true);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="App" id="App">
      <div className="box-2">
        {/*Styling for the grey box*/}
        <Box
          sx={{
            width: "75vw",
            height: "85wh",
            backgroundColor: "rgb(57 58 66)",
            alignItems: "center",
            fontSize: "30",
            borderRadius: 2,
            marginTop: "10vw",
            textAlign: "center",
          }}
        >
          {/* Title */}
          <div className="box-title">
            <h1 className="title">SüB </h1>
          </div>
          <div className="presentation-box">
            {/* presentation */}
            <p className="presentation">
              Send us your video and we will add subtitle to it
            </p>
          </div>

          {/*This is the box to palce the files */}
          <div className="downloadBox">
            <Box
              component="span"
              sx={{ p: 1, border: "1px dashed grey", width: "40%" }}
            >
              <Button
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "white",
                  width: "100%",
                }}
              >
                <input
                  className="noFileChosenButton"
                  type="file"
                  onChange={(e) => getFile(e.target.files[0])}
                />
              </Button>
            </Box>
          </div>
          {/* Send video Button */}
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              sx={buttonSx}
              disabled={loading}
              onClick={handleButtonClick}
            >
              {success ? <p>Succes</p> : <p>Send video</p>}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </div>

      {/* This is the error box  */}
      {fileFormatError ? (
        <div className="alertDiv">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Alert severity="error">Sorry, we only accept mp4 files</Alert>
          </Box>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default App;
