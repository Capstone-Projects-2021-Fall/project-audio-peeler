import React, { useState } from 'react';
import './App.css';
import axios from 'axios';





  function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };


    function uploadHandler(){

      const formData = new FormData()
      formData.append(
          'myFile',
          this.state.selectedFile,
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
        <div className="App">
          <header className="App-header">
            <div>
              <h4>
                Welcome to
              </h4>
              <h2>
                AudioPeeler!
              </h2>
            </div>

            <input title={"sup"} type="file" onChange={changeHandler} className={"file_button"}/>
            <br/>

            {isFilePicked ? (<p className={"text"}> {selectedFile.name} </p>) : (<p className={"text"}> Nothing to see here </p>)}

            <button className={"button"} onClick={uploadHandler}>
              Submit
            </button>


            <div class="output_area">
              All the output will be here...
            </div>
          </header>
        </div>
    );

}

export default App;
