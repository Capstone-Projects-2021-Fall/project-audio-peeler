import React, { useContext, useState } from 'react';
import axios from "axios";
import Loader from "react-loader-spinner";
import FileUrlContext from "../FileUrlContext";

function RecordUpload({ fileUrlToggleProp }) {
  const [downloadLink, setDownloadLink] = useState("")
  const [downloadReady, setDownloadReady] = useState(false)
  const [parseInProgress, setParseInProgress] = useState(false);

  // const recordBtn = document.getElementById("record-btn");

  // const player = document.getElementById("audio-player");

  if (navigator.mediaDevices.getUserMedia) {
    var chunks = [];
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        console.log('getUserMedia supported.');

        const mediaRecorder = new MediaRecorder(stream);


        var recordBtn = document.getElementById("record-btn");

        var player = document.getElementById("audio-player");
        recordBtn.onclick = () => {
          if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            recordBtn.textContent = "record";
            console.log("record stopped");
          } else {
            mediaRecorder.start();
            console.log("recording...");
            recordBtn.textContent = "stop";
          }
          console.log("recorder sate:", mediaRecorder.state);
        };

        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = e => {
          var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          var audioURL = window.URL.createObjectURL(blob);
          player.src = audioURL;
        };
      },
      () => {
        console.error("'Did not getUserMedia supported.'");
      }
    );
  } else {
    console.error("Browser not support getUserMedia");
  }

  function tryDownload() {
    console.log(downloadLink)
    console.log(downloadReady)
    if (downloadReady) window.location.href = downloadLink;
  }

  function uploadHandler() {

  }

  return (

    <React.Fragment>
      <div id="main-content" id="sampler-main-content">
        <div id="title-area">
          <h2>Welcome to</h2>
          <h1>AudioPeeler</h1>
          <button id="toggle-off-button" className="left-toggle-button" onClick={() => fileUrlToggleProp(true)}>File</button>
          <button id="toggle-on-button" className="right-toggle-button"> Record</button>
        </div>

        <button id="record-btn" >Record</button>
        <button id="start-button" onClick={uploadHandler}>Start</button>
        <audio controls id="audio-player"></audio>
      </div>
      <div id="output-area">
        Output
        <div id="output-file-name">No download ready...</div>
        <button id="download" onClick={tryDownload}>Download</button>
        {parseInProgress ?
          <Loader style={{ marginTop: "10px" }} type="Bars" color="white" height={80} width={80} /> : ""}
      </div>
      <script src="./recorder.js"></script>
    </React.Fragment>
  )
}

export default RecordUpload;