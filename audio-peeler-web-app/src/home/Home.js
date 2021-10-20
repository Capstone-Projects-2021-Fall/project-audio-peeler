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
            'file',
            selectedFile,
            //this.state.selectedFile.name
        )
        axios({
            method: "post",
            url: "http://172.105.151.238:5000/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(function (response) {
            let urlHTML = '<a href=' + response.data + '>' + response.data + '</a>';
            document.getElementById("output").innerHTML += urlHTML + '<br>';
            
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
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
                    <audio id="audio_id" controls>
                        music.mp3
                    </audio>
                </div>


                <div id="output" class="output_area">
                </div>
            </header>
        </div>
    )};

export default Home;
