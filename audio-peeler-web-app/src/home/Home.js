import axios from "axios";
import './Home.css';
import React, { useState } from 'react';

function Home(){

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };


    function uploadHandler(){
        var file = document.getElementById('file').files[0];
        var url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("audio_id").src = url;

        const formData = new FormData()
        formData.append(
            'myFile',
            selectedFile,
            //this.state.selectedFile.name
        )
        axios.post('http://172.105.151.238:5000/test', formData, {
            onUploadProgress: ProgressEvent => {
                console.log(ProgressEvent.loaded / ProgressEvent.total)
            }
        })
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div >
            <header className="App-header">
                <div>
                    <h4>
                        Welcome to
                    </h4>
                    <h2>
                        AudioPeeler!
                    </h2>
                </div>

                <input title={"sup"} type="file" id="file" onChange={changeHandler} className={"file_button"}/>
                <br/>

                {isFilePicked ? (<p className={"text"}> {selectedFile.name} </p>) : (<p className={"text"}> Nothing to see here </p>)}

                <button className={"button"} onClick={uploadHandler}>
                    Submit
                </button>

                <div>
                    <audio id="audio_id" controls autoPlay loop>
                        music.mp3
                    </audio>
                </div>


                <div class="output_area">
                    All the output will be here...
                </div>
            </header>
        </div>
    )};

export default Home;
