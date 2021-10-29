import axios from "axios";
import './Samplers.css';
import React, { useState } from 'react';
import Icon from '@mdi/react'
import {mdiPlay} from '@mdi/js'
import {mdiDownload} from '@mdi/js'
import Home from "../home/Home";

function Samplers(){

    var getSampleComponent = function(name) {
        return (
            <div class="sample-component">
                {name}
                <br/>
                <div class="play-component"><Icon className="icon" path={mdiPlay} size={1.5}/></div>
                <div class="download-component"><Icon className="icon" path={mdiDownload} size={1.5}/></div>
            </div>
        )
    }

    var getSampleObject = function(name) {
        return (
            <div class="sample">
                <div class="sample-title">{name}</div>
                <div class="components">
                    {getSampleComponent('Drums')}
                    {getSampleComponent('Bass')}
                    {getSampleComponent('Vocals')}
                    {getSampleComponent('Other')}
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
                    {getSampleObject("Snake Eater")}
                    {getSampleObject("Que Sera Sera")}
                    {getSampleObject("Through the Wire")}
                    {getSampleObject("Fly Me to the Moon")}
                </div>
            </div>
        </div>
    )};

export default Samplers;