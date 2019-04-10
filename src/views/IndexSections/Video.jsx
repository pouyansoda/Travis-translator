import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import '../../assets/css/video.css'

 
class Video extends Component {
  render () {
    return (
    <div className='player-wrapper'>  
        <ReactPlayer
        className='react-player'
        url='https://youtu.be/i_V7FrB85SY'
        width='70%'
        height='600px'    
        />  
    </div>       
    )
  }
}
export default Video;