import React, {Component} from 'react'
import PhotoList from './PhotoList'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PhotoBooth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 300,
      height: 0,
      streaming: false,
      photos: [],
      counter: 5,
      photoQuantity: 2,
      errorMessage: '',
    }
  }


  componentDidMount() {
    this.startStream()
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');

    video.addEventListener('canplay', () => {
        const height = video.videoHeight / (video.videoWidth/this.state.width)

        this.setState({ height })

        video.setAttribute('width', this.state.width);
        video.setAttribute('height', this.state.height);
        canvas.setAttribute('width', this.state.width);
        canvas.setAttribute('height', this.state.height);
        this.setState({streaming: true});
    })

    this.countDown()
  }

  countDown = () => {
    setInterval(() => {
      if (this.state.counter > 0) {
        this.setState({ counter: this.state.counter - 1 })
      } else if (this.state.counter === 0) {
        if (this.state.photos.length < this.props.photoQuantity) this.takePicture()
        this.setState({ counter: 5 })
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

  render() {
    return (
      <div>
        <div className='video-container'>
            <p
            className='counter font-mono text-md text-grey-darkest'
            hidden={this.props.photoQuantity === this.state.photos.length}
            >
              {this.state.counter}
            </p>
            <video id='video' className='video-capturing'>
              Video stream not available.
            </video>
            <p
              className='counter font-mono text-grey-darkest'
              hidden={this.props.photoQuantity === this.state.photos.length}
            >
              {this.state.counter}
            </p>
        </div>
        <Link to='/'>
          <button
            className='new-photo-btn font-mono text-md bg-teal hover:bg-teal-dark text-white mx-auto p-4 rounded'
            hidden={this.props.photoQuantity !== this.state.photos.length}
          >
            Take New Photos
          </button>
        </Link>
        <canvas hidden={true} id='canvas'/>
        <div className='output'>
          <PhotoList photos={this.state.photos} countDown={this.countDown}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photoQuantity: state.photoQuantity
  };
};

export default connect(mapStateToProps)(PhotoBooth);
