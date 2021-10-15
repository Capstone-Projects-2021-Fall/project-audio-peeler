import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {

  state = { selectedFile: null }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedfile : event.target.files[0]
    })
    
  }

  uploadHandler = () => {
    var file = document.getElementById('file').files[0];
    var url = URL.createObjectURL(file);
    console.log(url);
    document.getElementById("audio_id").src = url;

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
  render() {
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
          <input type="file" id="file" onChange={this.fileSelectedHandler} />
          <br />


          <button onClick={this.uploadHandler}>
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
    );
  }
}

export default App;
