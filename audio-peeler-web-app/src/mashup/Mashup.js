import './Mashup.css';
import React from 'react';

function Mashup(){

    var changeHandler = function() {

    }

    var uploadHandler = function() {

    }

    var isFilePicked = false;
    var selectedFile = null;


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
                <button id="download">Download</button>
            </div>
        </div>
    )};

export default Mashup;