import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import GamingVideoCard from '../GamingVideoCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    videoListItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  onRetryButton = () => this.getVideoDetails()

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedVideoData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videoListItems: formattedVideoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = activeTheme => {
    const {videoListItems} = this.state

    const logoBgColor = activeTheme === 'Light' ? '#ebebeb' : '#383838'
    const iconBgColor = activeTheme === 'Light' ? '#d7dfe9' : '#000000'
    const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
    const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'

    return (
      <>
        <div className="logo" style={{backgroundColor: logoBgColor}}>
          <div className="icon-bg" style={{backgroundColor: iconBgColor}}>
            <SiYoutubegaming className="icon" />
          </div>
          <h2 style={{color: textColor}}>Gaming</h2>
        </div>
        <div
          className="gaming-videos-container"
          style={{backgroundColor: bgColor}}
        >
          {videoListItems.map(eachVideo => (
            <GamingVideoCard cardDetails={eachVideo} key={eachVideo.id} />
          ))}
        </div>
      </>
    )
  }

  renderLoader = activeTheme => {
    const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
    return (
      <div
        className="trending-loader-container"
        data-testid="loader"
        style={{backgroundColor: bgColor}}
      >
        <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = activeTheme => {
    const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#0f0f0f'
    const headingColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
    const paraColor = activeTheme === 'Light' ? '#383838' : '#606060'
    const imgUrl =
      activeTheme === 'Light'
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

    return (
      <div className="trending-failure-view" style={{backgroundColor: bgColor}}>
        <img src={imgUrl} alt="failure view" />
        <h1 style={{color: headingColor}}>Oops! Something Went Wrong</h1>
        <p style={{color: paraColor}}>
          We are having some trouble to complete your request. Please try again
          later.
        </p>
        <button type="button" onClick={this.onRetryButton}>
          Retry
        </button>
      </div>
    )
  }

  getRenderView = activeTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(activeTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoader(activeTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(activeTheme)
      default:
        return apiStatusConstants.initial
    }
  }

  render() {
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {activeTheme} = value

          return (
            <>
              <Header />
              <div className="home-container">
                <NavigationBar />
                <div data-testid="gaming" className="trending-container">
                  {this.getRenderView(activeTheme)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Gaming
