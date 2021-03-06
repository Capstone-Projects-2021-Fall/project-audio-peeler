import React, { useContext, useState } from 'react';
import axios from "axios";
import Loader from "react-loader-spinner";
import FileUrlContext from "../FileUrlContext";
import WavReader from "../WavReader.js";
import { compressSync } from 'fflate';

function RecordUpload({ fileUrlToggleProp }) {
  const [selectedFile, setSelectedFile] = useState();
  const [downloadLink, setDownloadLink] = useState("")
  const [downloadReady, setDownloadReady] = useState(false)
  const [parseInProgress, setParseInProgress] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

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
            recordBtn.textContent = "Record";
            console.log("record stopped");
          } else {
            mediaRecorder.start();
            console.log("recording...");
            recordBtn.textContent = "Stop";
          }
          console.log("recorder sate:", mediaRecorder.state);
        };

        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data);
          
        };

        mediaRecorder.onstop = e => {
          var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          
          chunks = [];
          var audioURL = URL.createObjectURL(blob);
          player.src = audioURL;
          console.log('audioURL:' + audioURL)
          // var audio_file = blobToFile(blob,"recording.ogg");
          var audio_file = new File([blob],"recording.ogg");

          setSelectedFile(audio_file);
          setIsFilePicked(true);
        };
      },
      () => {
        console.error("'Did not getUserMedia supported.'");
      }
    );
  } else {
    console.error("Browser not support getUserMedia");
  }

  // function blobToFile(blob,fileName){
  //   blob.lastModifiedDate = new Date();
  //   blob.name = fileName;
  //   return blob;
  // }

  function tryDownload() {
    console.log(downloadLink)
    console.log(downloadReady)
    if (downloadReady) window.location.href = downloadLink;
  }

  function uploadHandler() {
    if (!isFilePicked) return;
    setDownloadLink("");
    setDownloadReady(false)
    setParseInProgress(true)
    document.getElementById('download').classList.remove('download-ready');
    document.getElementById("output-file-name").innerHTML = "No download ready...";
    console.log('Selected file: ' + selectedFile);

    const formData = new FormData()
    formData.append(
      'file',
      selectedFile,
    )
    axios({
      method: "post",
      url: "https://audio-peeler-server.com/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        var wr = WavReader(response);

        setDownloadLink(response.data);
        setDownloadReady(true)
        setParseInProgress(false)
        document.getElementById("output-file-name").innerHTML = "Download ready!";
      })
      .catch(function (response) {
        console.log(response);
        setParseInProgress(false);
      });


  }

  return (

    <React.Fragment>
      <div id="main-content" id="sampler-main-content">
        <div id="title-area">
          <h2>Welcome to</h2>
          <h1>AudioPeeler</h1>
          <button id="toggle-off-button" className="left-toggle-button" onClick={() => fileUrlToggleProp("file")}>File</button>
            <button id="toggle-off-button" className="middle-toggle-button" onClick={() => fileUrlToggleProp("url")}>URL</button>
          <button id="toggle-on-button" className="right-toggle-button"> Rec</button>
        </div>

        <button id="record-btn" >Record</button>
        {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (
            <p id={"file-name"}>No file selected...</p>)}
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