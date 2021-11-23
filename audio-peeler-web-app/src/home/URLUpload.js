import React, {useContext, useState} from 'react';
import './Home.css';
import FileUrlContext from "../FileUrlContext";
import Loader from "react-loader-spinner";

function URLUpload ({fileUrlToggleProp}) {


    return(

        <React.Fragment>
            <div id="main-content">
                <div id="title-area">
                    <h2>URL</h2>
                    <h1>Here</h1>
                    <button id="toggle-off-button" className="left-toggle-button" onClick={() => fileUrlToggleProp(true)}>File</button>
                    <button id="toggle-on-button" className="right-toggle-button"> URL</button>
                </div>

            </div>
            <div id="output-area">
                Output

            </div>

        </React.Fragment>
    )
}

export default URLUpload;