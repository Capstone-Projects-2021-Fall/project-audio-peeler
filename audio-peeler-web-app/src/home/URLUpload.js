import React, {useContext, useState, useEffect} from 'react';
import './Home.css';
import JSZip from "jszip";

const zip = new JSZip();

async function retrieveZip(filename) {
    const response = await fetch("http://localhost:5000/zip/" + filename);
    const jsonData = await response.json();


    return jsonData;
}

function URLUpload ({fileUrlToggleProp}) {
    const [data, setData] = React.useState([]);
    const [text, setText] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        retrieveZip("gobou").then(data => {
            setData(data);
            setLoading(false)
            data.forEach((x) =>{setText(text => [...text, <p>{x.entryName}</p>])})
            console.log(data)
        })

    }, [])


    return(

        <React.Fragment>
            <div id="main-content">
                <div id="title-area">
                    <h2>Welcome to</h2>
                    <h1>AudioPeeler</h1>
                    <button id="toggle-off-button" onClick={() => fileUrlToggleProp(true)}>File</button>
                    <button id="toggle-on-button"> URL</button>
                </div>
                {loading ? <p>"loading"</p> : text}
            </div>
            <div id="output-area">
                Output



            </div>

        </React.Fragment>
    )
}

export default URLUpload;