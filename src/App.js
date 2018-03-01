import React, { Component } from 'react'
import PhotoList from './PhotoList'

const COUNTDOWN = 5

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 0,
      streaming: false,
      photos: [],
      counter: COUNTDOWN,
      photoQuantity: 0,
      errorMessage: '',
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
        if (this.state.photos.length < this.state.photoQuantity) this.takePicture()
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
        console.log('An error occured! ' + err);
      });
  }

  takePicture = () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');

    if (this.state.width && this.state.height) {
      canvas.width = this.state.width;
      canvas.height = this.state.height;
      context.drawImage(video, 0, 0, this.state.width, this.state.height);

      const data = canvas.toDataURL('image/png');

      this.setState({ photos: [...this.state.photos, data] })
    }
  }

  validatePhotoQuantity = (e) => {
    if (e.target.value === '') {
      this.setState({ errorMessage: '', photoQuantity: '' })
    }
    else if (parseInt(e.target.value, 10) > 0 && parseInt(e.target.value, 10) <= 5) {
        this.setState({
                        photoQuantity: parseInt(e.target.value, 10),
                        errorMessage: ''
                      })
    } else {
      this.setState({
                    photoQuantity: '',
                    errorMessage: 'Enter a photo quantity between 1 and 5'
                  })
    }
  }

  render() {
    return (
      <div className='app'>
          <video id='video'>Video stream not available.</video>
          <p
            hidden={!this.state.streaming || this.state.photos.length === this.state.photoQuantity}
          >
            {this.state.counter}
          </p>
          <div className='enter-booth-container'>
            <h1
              className='font-mono text-md text-grey-darkest text-center'
            >
              WebRTC Photo Booth
            </h1>
            <input
              className='number-of-photos font-mono text-grey-darkest text-center'
              placeholder='Enter Number Of Photos'
              onChange={(e) => this.validatePhotoQuantity(e)}
              hidden={this.state.streaming}
            />
            <p
              className='error-message font-mono text-md text-red'
            >
              {this.state.errorMessage}
            </p>
            <button
              id='startbutton'
              hidden={this.state.streaming}
              onClick={this.startStream}
              className='font-mono text-md bg-teal hover:bg-teal-dark text-white mx-auto p-4 rounded'
              disabled={!this.state.photoQuantity > 0 && this.state.photoQuantity <= 5}
            >
                Enter Photo Booth
            </button>
          </div>
        <canvas hidden={true} id='canvas'/>
        <div className='output'>
          <PhotoList photos={this.state.photos} countDown={this.countDown}/>
        </div>
      </div>
    );
  }
}

export default App;
