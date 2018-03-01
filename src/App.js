import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photoQuantity: 0,
      errorMessage: '',
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
            />
            <p
              className='error-message font-mono text-md text-red'
            >
              {this.state.errorMessage}
            </p>
            <Link to='/photoBooth'>
            <button
              id='startbutton'
              className='font-mono text-md bg-teal hover:bg-teal-dark text-white mx-auto p-4 rounded'
              disabled={!this.state.photoQuantity > 0 && this.state.photoQuantity <= 5}
            >
                Enter Photo Booth
            </button>
            </Link>
          </div>
      </div>
    );
  }
}

export default App;
