import './Mashup.css';
import Loader from "react-loader-spinner";
import axios from "axios";
import WavReader from "../WavReader.js";
import Crunker from 'crunker'
import React, {useContext, useState} from 'react';
import { files } from 'jszip';

function Mashup(){

    var load = require('audio-loader');

    const [selectedFile, setSelectedFile] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFilePicked2, setIsFilePicked2] = useState(false);
    const [parseInProgress, setParseInProgress] = useState(false);

    var audiosComplete = [false, false];

    var FILES = ["Vocals", "Bass", "Other", "Drums"];

    var audioToggles = [];
    for (var i = 0; i < 8; i++) audioToggles.push(false);

    var globalAudios = [];

    var globalBlobs = [];

    var paused = true;

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const changeHandler2 = (event) => {
        setSelectedFile2(event.target.files[0]);
        setIsFilePicked2(true);
    };

    function createComponents(fileNames, fileOneAudios, fileTwoAudios) {
        setParseInProgress(false);
        document.getElementById('mashup-component-container').innerHTML = "";
        document.getElementById('phase-1-wrapper').innerHTML = '';
        document.getElementById('mashup-component-container').appendChild(createMashupComponent(fileNames, [fileOneAudios, fileTwoAudios]));
        document.getElementById('mashup-component-container').appendChild(createMashupControls());
    }

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
                var wr = WavReader(response);
                wr.then((result) =>  {
                    result['audios'].forEach((a, index) => {
                        fileOneAudios.push(a);
                    })
                    audiosComplete[0] = true;
                    if (!audiosComplete.includes(false)) createComponents(fileNames, fileOneAudios, fileTwoAudios);
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
                var wrInner = WavReader(response);
                wrInner.then((result) =>  {
                    result['audios'].forEach((a, index) => {
                        fileTwoAudios.push(a);
                    })
                    audiosComplete[1] = true;
                    if (!audiosComplete.includes(false)) createComponents(fileNames, fileOneAudios, fileTwoAudios);
                })
            })
            .catch(function (response) {
                console.log(response);
                setParseInProgress(false);
                document.getElementsByClassName('file-name')[0].innerHTML = "Error uploading file...";
            });
    }

    function handleToggle(elemId) {
        globalAudios.forEach((audio, index) => {
            audio.load();
        });
        document.getElementById('play-pause').classList.add('controls-play');
        document.getElementById('play-pause').classList.remove('controls-pause');
        audioToggles[elemId] = !audioToggles[elemId];
        if (audioToggles[elemId]) document.getElementById(elemId).classList.add('toggle');
        else document.getElementById(elemId).classList.remove('toggle');
    }

    function play() {
        if (!paused) {
            globalAudios.forEach((audios, index) => {
                if (audioToggles[index]) audios.pause();
            });
            document.getElementById('play-pause').classList.add('controls-play');
            document.getElementById('play-pause').classList.remove('controls-pause');
        } else {
            globalAudios.forEach((audios, index) => {
                if (audioToggles[index]) audios.play();
            });
            document.getElementById('play-pause').classList.add('controls-pause');
            document.getElementById('play-pause').classList.remove('controls-play');
        }
        paused = !paused;
    }

    function download() {
        var files = [];
        globalAudios.forEach((a, index) => {
            if (audioToggles[index]) {
                files.push(a.src);
            }
        });
        var crunker = new Crunker();
        load(files)
        .then(buffers => crunker.mergeAudio(buffers))
        .then(merged => crunker.export(merged, "audio/mp3"))
        .then(output => crunker.download(output.blob, document.getElementById('download-file-name').value))
        .catch(error => {
            throw new Error(error);
        });
    }

    function createMashupComponent(names, audios) {
        var mashupComponent = document.createElement('div');
        mashupComponent.id = 'mashup-component';
        audios.forEach((a, index) => {
            var audioParent = document.createElement('div');
            audioParent.classList.add('audio-wrapper');
            var mashupAudioTitle = document.createElement('h1');
            mashupAudioTitle.innerHTML = names[index];
            audioParent.appendChild(mashupAudioTitle);
            var mashupSounds = document.createElement('div');
            mashupSounds.classList.add('mashup-sounds');
            audioParent.appendChild(mashupSounds);
            audios[index].forEach((sound, jndex) => {
                globalAudios.push(sound);
                var cIndex = jndex + (4 * index);
                var toggleButton = document.createElement('div');
                toggleButton.id = cIndex;
                toggleButton.innerHTML = FILES[jndex];
                toggleButton.classList.add('mashup-sound');
                toggleButton.addEventListener('click', () => handleToggle(cIndex));
                mashupSounds.appendChild(toggleButton);
            });
            mashupComponent.appendChild(audioParent);
        });
        return mashupComponent;
        /*
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
        */
    }

    function createMashupControls() {
        var controlsWrapper = document.createElement('div');
        controlsWrapper.id = 'controls-wrapper';
        var textWrapper = document.createElement('div');
        textWrapper.id = 'controls-text-wrapper';
        var controlsTextField = document.createElement('input');
        controlsTextField.type = 'text';
        controlsTextField.placeholder = 'Mashup file name...'
        controlsTextField.id = 'download-file-name';
        textWrapper.appendChild(controlsTextField);
        var mp3Label = document.createElement('p');
        mp3Label.innerHTML = '.wav';
        textWrapper.appendChild(mp3Label);
        controlsWrapper.appendChild(textWrapper);
        var playButton = document.createElement('div');
        playButton.id = 'play-pause';
        playButton.classList.add('controls-play');
        playButton.addEventListener('click', play);
        controlsWrapper.appendChild(playButton);
        var downloadButton = document.createElement('div');
        downloadButton.id = 'controls-download';
        downloadButton.addEventListener('click', download);
        controlsWrapper.appendChild(downloadButton);
        return controlsWrapper;
    }

    return (
        <div id="page">
            <div id="main-content-mashup">
                <div id="phase-1-wrapper">
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
                    {parseInProgress ?
                        <Loader style={{marginTop: "10px"}} type="Bars" color="white" height={80} width={80}/> : ""}
                </div>
                <div id="mashup-component-container"></div>
            </div>
        </div>
    )};

export default Mashup;