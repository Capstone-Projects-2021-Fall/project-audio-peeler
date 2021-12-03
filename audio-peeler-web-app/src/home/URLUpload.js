import React, {useState} from 'react';
import './Home.css';
import Loader from "react-loader-spinner";

var $ = require('jquery');

function URLUpload ({fileUrlToggleProp}) {

    const [linkGiven, setLinkGiven] = useState(false);
    const [downloadLink, setDownloadLink] = useState("")
    const [downloadReady, setDownloadReady] = useState(false)
    const [parseInProgress, setParseInProgress] = useState(false);

    var link = "";

    function tryDownload() {
        console.log(downloadLink)
        console.log(downloadReady)
        if (downloadReady) window.location.href = downloadLink;
    }

    function changeHandler() {
        if (document.getElementById('link-input').value !== "") {
            setLinkGiven(true);
        }
    }

    function uploadHandler() {
        if (!linkGiven) return;
        link = document.getElementById('link-input').value;
        setDownloadLink("");
        setDownloadReady(false)
        setParseInProgress(true)
        document.getElementById('download').classList.remove('download-ready');

        $.post("https://audio-peeler-server.com/urlDownload",
        {
            youtubeUrl: link
        },
        function(response){
            setDownloadLink(response);
            setDownloadReady(true)
            setParseInProgress(false)
            document.getElementById("output-file-name").innerHTML = "Download ready!";
        });

        /*
        axios({
            method: "post",
            url: "http://127.0.0.1:5000/",
            data: formData,
            headers: { "Content-Type": "text/html; charset=UTF-8" },
        })
            .then(function (response) {
                setDownloadLink(response.data);
                setDownloadReady(true)
                setParseInProgress(false)
                document.getElementById("output-file-name").innerHTML = "Download ready!";
                /*
                let urlHTML = '<a href=' + response.data + '>' + response.data + '</a>';
                document.getElementById("output-area").innerHTML += urlHTML + '<br>';
                
            })
            .catch(function (response) {
                console.log(response);
                console.log(link);
                setParseInProgress(false);
            });
            */
    }

    return(

        <React.Fragment>
            <div id="main-content">
                <div id="title-area">
                    <h2>Welcome to</h2>
                    <h1>AudioPeeler</h1>
                    <button id="toggle-off-button" className="left-toggle-button" onClick={() => fileUrlToggleProp(true)}>File</button>
                    <button id="toggle-on-button" className="right-toggle-button"> URL</button>
                </div>
                <input type="text" id="link-input" name="youtubeUrl" placeholder="Input URL here.." onChange={changeHandler}></input>
                <button id="start-button" onClick={uploadHandler}>Start</button>
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

export default URLUpload;