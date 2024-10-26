import {Component} from 'react'
import {RiPlayListAddFill} from 'react-icons/ri'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import TrendingVideoCard from '../TrendingVideoCard'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

class SavedVideos extends Component {
  renderNoVideoView = activeTheme => {
    const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
    const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
    return (
      <div
        data-testid="savedVideos"
        className="no-saved-videos-container"
        style={{backgroundColor: bgColor, color: textColor}}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <h2>No Saved Videos Found</h2>
        <p>You can save your videos while watching them.</p>
      </div>
    )
  }

  renderSuccessView = (savedVideos, activeTheme) => {
    const logoBgColor = activeTheme === 'Light' ? '#ebebeb' : '#383838'
    const iconBgColor = activeTheme === 'Light' ? '#d7dfe9' : '#000000'
    const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
    const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'

    return (
      <div data-testid="savedVideos" className="trending-container">
        <div className="logo" style={{backgroundColor: logoBgColor}}>
          <div className="icon-bg" style={{backgroundColor: iconBgColor}}>
            <RiPlayListAddFill className="icon" />
          </div>
          <h2 style={{color: textColor}}>Saved Videos</h2>
        </div>
        <div
          className="trending-videos-container"
          style={{backgroundColor: bgColor}}
        >
          {savedVideos.map(eachVideo => (
            <TrendingVideoCard cardDetails={eachVideo} key={eachVideo.id} />
          ))}
        </div>
      </div>
    )
  }

  getRenderView = (activeTheme, savedVideos) => {
    if (savedVideos.length === 0) {
      return this.renderNoVideoView(activeTheme)
    }
    return this.renderSuccessView(savedVideos, activeTheme)
  }

  render() {
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {activeTheme, savedVideos} = value

          return (
            <>
              <Header />
              <div className="home-container">
                <NavigationBar />
                {this.getRenderView(activeTheme, savedVideos)}
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default SavedVideos
