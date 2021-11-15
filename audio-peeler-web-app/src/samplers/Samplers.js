import './Samplers.css';
import React from 'react';

function Samplers() {

    var audios = [];
    var urls = [    //snake eater
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Snake_Eater_Short/drums.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Snake_Eater_Short/bass.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Snake_Eater_Short/vocals.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Snake_Eater_Short/other.wav",
            // dum surfer
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/King+Krule+-+Dum+Surfer/drums.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/King+Krule+-+Dum+Surfer/bass.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/King+Krule+-+Dum+Surfer/vocals.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/King+Krule+-+Dum+Surfer/other.wav",
            //psycho Killer
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/PsychoKiller/drums.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/PsychoKiller/drums.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/PsychoKiller/vocals.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/PsychoKiller/other.wav",
            // Fly me to the moon
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Fly/drums.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Fly/bass.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Fly/vocals.wav",
        "https://audiopeelerfilestorage.s3.us-east-2.amazonaws.com/demucs_quantized/Fly/other.wav"
    ];
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
        if (pp[elementIndex]) {
            document.getElementById(index.toString()).classList.remove('pause-component');
            document.getElementById(index.toString()).classList.add('play-component');
            audios[elementIndex].pause();
        } else {
            document.getElementById(index.toString()).classList.add('pause-component');
            document.getElementById(index.toString()).classList.remove('play-component');
            audios[elementIndex].play();
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
                <div className="components-s">
                    <div id={i} className="play-component" onClick={() => play(i)}></div>
                    <div className="download-component" onClick={() => download(i)}></div>
                </div>
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
                    {getSampleObject("Dum Surfer", globalCurrentID+=4)}
                    {getSampleObject("Psycho Killer", globalCurrentID+=4)}
                    {getSampleObject("Fly Me to the Moon", globalCurrentID+=4)}
                </div>
            </div>
        </div>
    )};

export default Samplers;