import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 100,
      streaming: false,
      video: null,
      canvas: null,
      photo: null,
      startbutton: null
    }
  }

  componentDidMount() {
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    video.addEventListener('canplay', (ev) => {
      if (!this.state.streaming) {
        this.setState({height: video.videoHeight / (video.videoWidth/this.state.width)})

        video.setAttribute('width', this.state.width);
        video.setAttribute('height', this.state.height);
        canvas.setAttribute('width', this.state.width);
        canvas.setAttribute('height', this.state.height);
        this.setState({streaming: true});
      }
    }, false);
  }

  startStream() {
    let video = document.getElementById('video');
    let photo = document.getElementById('photo');
    let startbutton = document.getElementById('startbutton');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occured! " + err);
    });
  }

  render() {
    return (
      <div className="app">
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button id="startbutton" onClick={() => this.startStream()}>Take photo</button>
        </div>
        <canvas id="canvas">
        </canvas>
        <div className="output">
          <img id="photo" alt="The screen capture will appear in this box."/>
        </div>
      </div>
    );
  }
}

export default App;
