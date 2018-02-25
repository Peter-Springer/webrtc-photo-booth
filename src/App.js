import React, { Component } from 'react'
import PhotoList from './PhotoList'

const COUNTDOWN = 1
const NUMBER_OF_PHOTOS = 2

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 0,
      streaming: false,
      photos: [],
      counter: COUNTDOWN,
    }
  }

  componentDidMount() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');

    video.addEventListener('canplay', () => {
      if (!this.state.streaming) {
        const height = video.videoHeight / (video.videoWidth/this.state.width)

        this.setState({ height })

        video.setAttribute('width', this.state.width);
        video.setAttribute('height', this.state.height);
        canvas.setAttribute('width', this.state.width);
        canvas.setAttribute('height', this.state.height);
        this.setState({streaming: true});
      }
    })

    this.countDown()
  }

  countDown = () => {
    setInterval(() => {
      if (this.state.streaming && this.state.counter > 0) {
        this.setState({ counter: this.state.counter - 1 })
      } else if (this.state.counter === 0) {
        if (this.state.photos.length < NUMBER_OF_PHOTOS) this.takePicture()
        this.setState({ counter: COUNTDOWN })
      }
    }, 1000)
  }

  startStream = () => {
    const video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("An error occured! " + err);
      });
  }

  takePicture = () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const photo = document.getElementById('photo');
    const video = document.getElementById('video');

    if (this.state.width && this.state.height) {
      canvas.width = this.state.width;
      canvas.height = this.state.height;
      context.drawImage(video, 0, 0, this.state.width, this.state.height);

      const data = canvas.toDataURL('image/png');

      this.setState({ photos: [...this.state.photos, data] })
    }
  }

  render() {
    return (
      <div className="app">
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <p hidden={!this.state.streaming}>{this.state.counter}</p>
          <button
            id="startbutton"
            hidden={this.state.streaming}
            onClick={this.startStream}
          >
              Enter Booth
          </button>
        </div>
        <canvas hidden={true} id="canvas"/>
        <div className="output">
          <PhotoList photos={this.state.photos} countDown={this.countDown}/>
        </div>
      </div>
    );
  }
}

export default App;
