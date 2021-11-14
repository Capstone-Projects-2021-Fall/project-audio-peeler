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
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        retrieveZip("gobou").then(data => {
            setData(data);
            console.log(data)
        })
        setLoading(false)
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

            </div>
            <div id="output-area">
                Output

                {loading ? <p>"loading"</p> : <p>{data[0].entryName}</p>}

            </div>

        </React.Fragment>
    )
}

export default URLUpload;