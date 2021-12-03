import Loader from "react-loader-spinner";
import axios from "axios";
import './Home.css';
import React, {useState} from 'react';

function FileUpload({fileUrlToggleProp}) {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [downloadLink, setDownloadLink] = useState("")
    const [downloadReady, setDownloadReady] = useState(false)
    const [parseInProgress, setParseInProgress] = useState(false);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    function tryDownload() {
        console.log(downloadLink)
        console.log(downloadReady)
        if (downloadReady) window.location.href = downloadLink;
    }

    function uploadHandler() {
        if (!isFilePicked) return;
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
                setParseInProgress(false);
                document.getElementsByClassName('file-name')[0].innerHTML = "Error uploading file...";
            });
    }

    return (
        <React.Fragment>
            <div id="main-content">
                <div id="title-area">
                    <h2>Welcome to</h2>
                    <h1>AudioPeeler</h1>
                    <button id="toggle-on-button" className="left-toggle-button">File</button>
                    <button id="toggle-off-button" className="middle-toggle-button" onClick={() => fileUrlToggleProp("url")}>URL</button>
                    <button id="toggle-off-button" className="right-toggle-button" onClick={() => fileUrlToggleProp("record")}>Rec</button>
                </div>
                <input type="file" onChange={changeHandler} id="browse-button"/>
                {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (
                    <p id={"file-name"}>No file selected...</p>)}
                <button id="start-button" onClick={uploadHandler}>Start</button>
                <audio id="audio_id" controls></audio>
            </div>
            <div id="output-area">
                Output
                <div id="output-file-name">No download ready...</div>
                <button id="download" onClick={tryDownload}>Download</button>
                {parseInProgress ?
                    <Loader style={{marginTop: "10px"}} type="Bars" color="white" height={80} width={80}/> : ""}
            </div>
        </React.Fragment>
    )
}

export default FileUpload;