import Loader from "react-loader-spinner";
import axios from "axios";
import './Home.css';
import React, {useContext, useState} from 'react';

function RecordUpload ({fileUrlToggleProp}) {

    <React.Fragment>
        <div id="main-content">
            <div id="title-area">
                <h2>Record</h2>
                <h1>Here</h1>
                <button id="toggle-off-button" className="left-toggle-button" onClick={() => fileUrlToggleProp(true)}>File</button>
                <button id="toggle-on-button" className="right-toggle-button"> URL</button>
            </div>

        </div>
        <div id="output-area">
            Output

        </div>

    </React.Fragment>

}


export default RecordUpload;