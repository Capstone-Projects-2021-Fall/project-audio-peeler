import './Samplers.css';
import React from 'react';

function Samplers() {

    var audios = [];
    var urls = ["https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/dumsurfer.mp3",
    "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/psychokiller.mp3"];
    var pp = {};

    var globalCurrentID = 0;

    for (var i = 0; i < urls.length; i++) {
        var a = new Audio(urls[i]);
        let element = i;
        pp[element] = false;
        a.addEventListener('play', (event) => {
            pp[element] = true;
        });
        a.addEventListener('pause', (event) => {
            pp[element] = false
        });
        audios.push(a);
    }

    function play(index) {
        var elementIndex = parseInt(index);
        audios[elementIndex].play();
        if (pp[elementIndex]) {
            audios[elementIndex].pause();
        }
    }

    function download(index) {
        var url = urls[index];
        var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = filename; 
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        xhr.open('GET', url);
        xhr.send();
    }

    var getSampleComponent = function(name, i) {
        return (
            <div className="sample-component">
                {name}
                <br/>
                <div className="play-component" onClick={() => play(i)}></div>
                <div className="download-component" onClick={() => download(i)}></div>
            </div>
        )
    }

    var getSampleObject = function(name, cid) {
        var currentID = cid;
        return (
            <div className="sample">
                <div className="sample-title">{name}</div>
                <div className="components">
                    {getSampleComponent('Drums', currentID++)}
                    {getSampleComponent('Bass', currentID++)}
                    {getSampleComponent('Vocals', currentID++)}
                    {getSampleComponent('Other', currentID++)}
                </div>
            </div>
        );
    }

    return (
        <div id="page">
            <div id="main-content-samplers">
                <div id="title-area">
                    <h1>Samplers</h1>
                    <h3>Here are a few picks from the team</h3>
                </div>
                <div id="samples">
                    {getSampleObject("Snake Eater", globalCurrentID)}
                    {getSampleObject("Que Sera Sera", globalCurrentID+=4)}
                    {getSampleObject("Through the Wire", globalCurrentID+=4)}
                    {getSampleObject("Fly Me to the Moon", globalCurrentID+=4)}
                </div>
            </div>
        </div>
    )};

export default Samplers;