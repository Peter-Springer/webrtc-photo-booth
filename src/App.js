import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 0,
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

  startStream = () => {
    let video = document.getElementById('video');
    let startbutton = document.getElementById('startbutton');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.log("An error occured! " + err);
    });
  }

  takepicture = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let photo = document.getElementById('photo');
    let video = document.getElementById('video');
    if (this.state.width && this.state.height) {
      canvas.width = this.state.width;
      canvas.height = this.state.height;
      context.drawImage(video, 0, 0, this.state.width, this.state.height);

      let data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }

  clearphoto = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let photo = document.getElementById('photo');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  render() {
    return (
      <div className="app">
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button
            id="startbutton"
            hidden={this.state.streaming}
            onClick={this.startStream}>
              Enter Booth
          </button>
        </div>
        <canvas hidden={true} id="canvas"></canvas>
        <div className="output">
          <img id="photo" alt="The screen capture will appear in this box."/>
        </div>
        <button onClick={this.takepicture}>Take Photo</button>
      </div>
    );
  }
}

export default App;
