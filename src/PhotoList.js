import React from 'react'

const PhotoList = ({photos}) => {
  return (
      photos.map((photo, i) => {
        return <img
                  className='captured-photo'
                  id='photo'
                  key={i}
                  alt='The screen capture will appear in this box.'
                  src={photo}
                />
      })
  )
}

export default PhotoList;
