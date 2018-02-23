import React, { Component } from 'react'
import PhotoList from './PhotoList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 0,
      streaming: false,
      photos: [],
      counter: 10
    }
  }

  componentDidMount() {
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    video.addEventListener('canplay', () => {
      if (!this.state.streaming) {
        this.setState({height: video.videoHeight / (video.videoWidth/this.state.width)})
        video.setAttribute('width', this.state.width);
        video.setAttribute('height', this.state.height);
        canvas.setAttribute('width', this.state.width);
        canvas.setAttribute('height', this.state.height);
        this.setState({streaming: true});
      }
    })
      // if (this.state.photos.length < 3 && this.state.streaming) {
      //     setTimeout(this.takePicture, 10000)
      // }
    this.countDown()
  }

  // componentDidUpdate() {
  //   if (this.state.photos.length < 3) {
  //   this.state.streaming && setTimeout(this.takePicture, 10000)
  //   }
  // }

  countDown = () => {
      let self = this
      setInterval(function() {
        if (self.state.streaming && self.state.counter > 0) {
        self.setState({counter: self.state.counter - 1})
      } else if (self.state.counter === 0) {
        if (self.state.photos.length < 3){
        setTimeout(self.takePicture, 10000)
        }
        self.setState({counter: 10})
      }
      }, 1000)
  }

  startStream = () => {
    let video = document.getElementById('video');
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
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let photo = document.getElementById('photo');
    let video = document.getElementById('video');
    if (this.state.width && this.state.height) {
      canvas.width = this.state.width;
      canvas.height = this.state.height;
      context.drawImage(video, 0, 0, this.state.width, this.state.height);

      let data = canvas.toDataURL('image/png');
      this.setState({photos: [...this.state.photos, data]})
    }
  }

  render() {
    return (
      <div className="app">
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <p>{this.state.counter}</p>
          <button
            id="startbutton"
            hidden={this.state.streaming}
            onClick={this.startStream}>
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
