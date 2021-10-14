import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
class App extends Component {

  state = { selectedFile: null }

  fileChangedHandler = (event) => {
    const file = event.target.files[0];
  }

  uploadHandler = () => {
    console.log(this.state.selectedFile)
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
          <input type="file" onChange={this.fileChangedHandler} />
          <br/>
          
          
          <button onClick={this.uploadHandler}>
            Submit
          </button>
          <div>
            music.mp3
            (the are will play audio file later)
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
