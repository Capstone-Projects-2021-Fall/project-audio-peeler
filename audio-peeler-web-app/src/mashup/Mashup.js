import './Mashup.css';
import Loader from "react-loader-spinner";
import axios from "axios";
import WavReader from "../WavReader.js";
import React, {useContext, useState} from 'react';

function Mashup(){

    const [selectedFile, setSelectedFile] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFilePicked2, setIsFilePicked2] = useState(false);
    const [parseInProgress, setParseInProgress] = useState(false);
    const [parseInProgress2, setParseInProgress2] = useState(false);

    var audiosComplete = [false, false];

    var audioToggles = [];
    for (var i = 0; i < 8; i++) audioToggles.push(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const changeHandler2 = (event) => {
        setSelectedFile2(event.target.files[0]);
        setIsFilePicked2(true);
    };

    function uploadHandler() {
        if (!isFilePicked || !isFilePicked2) return;
        setParseInProgress(true)

        var fileNames = [selectedFile.name, selectedFile2.name];

        var fileOneAudios = [];
        var fileTwoAudios = [];

        const formData = new FormData()
        formData.append(
            'file',
            selectedFile,
            //this.state.selectedFile.name
        );

        const formData2 = new FormData()
        formData2.append(
            'file',
            selectedFile2,
            //this.state.selectedFile.name
        );

        axios({
            method: "post",
            url: "https://audio-peeler-server.com/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log('file 1 response received');
                var wr = WavReader(response);
                wr.then((result) =>  {
                    result.forEach((a, index) => {
                        fileOneAudios.push(a);
                    })
                    audiosComplete[0] = true;
                    if (!audiosComplete.includes(false)) document.getElementById('mashup-files-container').innerHTML = handleMashupComponent(createMashupComponent(fileNames, [fileOneAudios, fileTwoAudios]));
                })
            })
            .catch(function (response) {
                console.log(response);
                setParseInProgress(false);
                document.getElementsByClassName('file-name')[0].innerHTML = "Error uploading file...";
            });

        axios({
            method: "post",
            url: "https://audio-peeler-server.com/",
            data: formData2,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log('file 2 response received');
                var wrInner = WavReader(response);
                wrInner.then((result) =>  {
                    result.forEach((a, index) => {
                        fileTwoAudios.push(a);
                    })
                    audiosComplete[1] = true;
                    if (!audiosComplete.includes(false)) document.getElementById('mashup-files-container').innerHTML = handleMashupComponent(createMashupComponent(fileNames, [fileOneAudios, fileTwoAudios]));
                })
            })
            .catch(function (response) {
                console.log(response);
                setParseInProgress(false);
                document.getElementsByClassName('file-name')[0].innerHTML = "Error uploading file...";
            });
    }

    function handleToggle(elemId) {
        audioToggles[elemId] = !audioToggles[elemId];
        if (audioToggles[elemId]) document.getElementById(elemId).classList.add('toggle');
        else document.getElementById(elemId).classList.remove('toggle');
    }

    function createMashupComponent(names, audios) {
        return (
            <div id="mashup-component">
                {
                    audios.forEach((a, index) => {
                        <div id="audio-parent">
                            <div id="mashup-audio-title">{names[index]}</div>
                            {
                                audios[index].forEach((sound, jndex) => {
                                    var cIndex = jndex + (4 * index);
                                    <div id={cIndex} className="mashup-sound" onClick={() => handleToggle(cIndex)}></div>
                                })
                            }
                        </div>
                    }) 
                }
            </div>
        )
    }

    function handleMashupComponent(mashupComponent) {
        return (
            {mashupComponent}
        )
    }

    return (
        <div id="page">
            <div id="main-content-mashup">
                <div id="title-area">
                    <h1>Mash it up!</h1>
                    <br/>
                    <h3>Pick Two Songs</h3>
                    <h3>And We'll Give You Every Variation between the Two</h3>
                </div>
                <div id="mashup-files-container">
                    <div className="mashup-file">
                        <input type="file" onChange={changeHandler} id="browse-button"/>
                        {isFilePicked ? (<p className={"file-name"}> {selectedFile.name} </p>) : (<p id={"file-name"}>No file selected...</p>)}
                    </div>
                    <div className="mashup-file">
                        <input type="file" onChange={changeHandler2} id="browse-button-2"/>
                        {isFilePicked2 ? (<p className={"file-name"}> {selectedFile2.name} </p>) : (<p id={"file-name-2"}>No file selected...</p>)}
                    </div>    
                </div>
                <button id="start-button" onClick={uploadHandler}>Start</button>
            </div>
        </div>
    )};

export default Mashup;