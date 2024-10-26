import {Component} from 'react'
import ReactPlayer from 'react-player'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

class VideoCard extends Component {
  state = {
    selectedLikeReaction: false,
    selectedDisLikeReaction: false,
    selectedSaveReaction: false,
    saveText: false,
  }

  onClickLikeReaction = () => {
    this.setState(prevState => ({
      selectedLikeReaction: !prevState.selectedLikeReaction,
      selectedDisLikeReaction: false,
    }))
  }

  onClickDisLikeReaction = () => {
    this.setState(prevState => ({
      selectedDisLikeReaction: !prevState.selectedDisLikeReaction,
      selectedLikeReaction: false,
    }))
  }

  onClickSaveReaction = () => {
    const {addVideo, videoItemData} = this.props
    this.setState(prevState => ({
      selectedSaveReaction: !prevState.selectedSaveReaction,
      saveText: !prevState.saveText,
    }))
    addVideo(videoItemData)
  }

  render() {
    const {videoItemData} = this.props
    const {saveText} = this.state
    if (!videoItemData) {
      return null
    }

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {activeTheme} = value
          const {
            selectedLikeReaction,
            selectedDisLikeReaction,
            selectedSaveReaction,
          } = this.state

          const headingColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
          const paraColor = activeTheme === 'Light' ? '#000000' : '#7e858e'
          const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
          const reactionColor = '#2563eb'
          const inactiveReactionColor = '#64748b'

          return (
            <div
              data-testid="videoItemDetails"
              className="video-container"
              style={{backgroundColor: bgColor}}
            >
              <ReactPlayer
                url={videoItemData.videoUrl}
                className="video-player"
                controls
              />
              <div className="video-content">
                <h2 style={{color: headingColor}}>{videoItemData.title}</h2>
                <div className="views-reaction" style={{color: paraColor}}>
                  <div className="views">
                    <p>{videoItemData.viewCount} Views</p>
                    <BsDot />
                    <p>{videoItemData.publishedAt}</p>
                  </div>
                  <div className="reaction">
                    <button
                      type="button"
                      className="reaction-btn"
                      style={{
                        color: selectedLikeReaction
                          ? reactionColor
                          : inactiveReactionColor,
                      }}
                      onClick={this.onClickLikeReaction}
                    >
                      <BiLike />
                      Like
                    </button>
                    <button
                      type="button"
                      className="reaction-btn"
                      style={{
                        color: selectedDisLikeReaction
                          ? reactionColor
                          : paraColor,
                      }}
                      onClick={this.onClickDisLikeReaction}
                    >
                      <BiDislike />
                      DisLike
                    </button>
                    <button
                      type="button"
                      className="reaction-btn"
                      style={{
                        color: selectedSaveReaction ? reactionColor : paraColor,
                      }}
                      onClick={this.onClickSaveReaction}
                    >
                      <BiListPlus />
                      {saveText ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
                <hr />
                <div
                  className="channel-logo-content"
                  style={{color: headingColor}}
                >
                  <img
                    src={videoItemData.channel.profileImageUrl}
                    alt="channel logo"
                  />
                  <div className="channel-content">
                    <h3>{videoItemData.channel.name}</h3>
                    <p>{videoItemData.channel.subscriberCount} Subscribers</p>
                    <p className="large-description">
                      {videoItemData.description}
                    </p>
                  </div>
                  <div>
                    <p className="small-description">
                      {videoItemData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default VideoCard
