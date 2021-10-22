import axios from "axios";
import './Home.css';
import React, { useState } from 'react';

function Home(){

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };


    function uploadHandler(){
        var file = document.getElementById('browse-button').files[0];
        var url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("audio_id").src = url;

        const formData = new FormData()
        formData.append(
            'file',
            selectedFile,
            //this.state.selectedFile.name
        )
        axios({
            method: "post",
            url: "http://172.105.151.238:5000/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(function (response) {
            let urlHTML = '<a href=' + response.data + '>' + response.data + '</a>';
            document.getElementById("output-area").innerHTML += urlHTML + '<br>';
          })
          .catch(function (response) {
              console.log(response);
          });
    }

    return (
        <div id="page">
            <div id="main-content">
                <div id="title-area">
                    <h2>Welcome to</h2>
                    <h1>AudioPeeler</h1>
                </div>
                <input type="file" onChange={changeHandler} id="browse-button"/>
                {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (<p id={"file-name"}>No file selected...</p>)}
                <button id="start-button" onClick={uploadHandler}>Start</button>
                <audio id="audio_id" controls></audio>
            </div>
            <div id="output-area">
                Output
                <div id="output-file-name">No download ready...</div>
                <button id="download">Download</button>
            </div>
        </div>
    )};

export default Home;
