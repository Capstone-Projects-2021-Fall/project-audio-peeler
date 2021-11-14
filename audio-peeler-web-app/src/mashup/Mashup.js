import './Mashup.css';
import React from 'react';
import axios from "axios";
import  { useState } from 'react';
import Loader from "react-loader-spinner";





function Mashup(){


    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [downloadLink, setDownloadLink] = useState("")
    const [downloadReady, setDownloadReady] = useState(false)
    const [parseInProgress, setParseInProgress] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    function uploadHandler() {
        var file = document.getElementById('browse-button').files[0];
        setDownloadLink("");
        setDownloadReady(false)
        setParseInProgress(true)
        document.getElementById('download').classList.remove('download-ready');
        document.getElementById("output-file-name").innerHTML = "No download ready...";
        var url = URL.createObjectURL(file);
        document.getElementById("audio_id").src = url;

        const formData = new FormData()
        formData.append(
            'file',
            selectedFile,
            //this.state.selectedFile.name
        )

        axios({
            method: "post",
            url: "https://audio-peeler-server.com/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setDownloadLink(response.data);
                setDownloadReady(true)
                setParseInProgress(false)
                document.getElementById("output-file-name").innerHTML = "Download ready!";
                /*
                let urlHTML = '<a href=' + response.data + '>' + response.data + '</a>';
                document.getElementById("output-area").innerHTML += urlHTML + '<br>';
                */
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    function tryDownload() {
        console.log(downloadLink)
        console.log(downloadReady)
        if (downloadReady) window.location.href = downloadLink;
    }
   

    return (
        <div id="page">
            <div id="main-content">
                <div id="title-area">
                    <h1>Mash it up!</h1>
                    <br/>
                    <h3>Pick Two Songs</h3>
                    <h3>And We'll Give You Every Variation between the Two</h3>
                </div>
                <div id="mashup-files-container">
                    <div class="mashup-file">
                        <input type="file" onChange={changeHandler} id="browse-button"/>
                        {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (<p id={"file-name"}>No file selected...</p>)}
                    </div>
                    <div class="mashup-file">
                        <input type="file" onChange={changeHandler} id="browse-button"/>
                        {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (<p id={"file-name"}>No file selected...</p>)}
                    </div>
                </div>
                <button id="start-button" onClick={uploadHandler}>Start</button>
            </div>
            <div id="output-area">
                Output
                <div id="output-file-name">No download ready...</div>
                <button id="download" onClick={tryDownload}>Download</button>
                {parseInProgress ? <Loader style={{marginTop:"10px"}} type="Bars" color="white" height={80} width={80}/> : ""}
            </div>
        </div>
    )};

export default Mashup;