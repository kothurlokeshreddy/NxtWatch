import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import VideoCard from '../VideoCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoItemData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  onClickRetryButton = () => {
    this.getVideoItemData()
  }

  getVideoItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedVideoData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoItemData: formattedVideoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = addVideo => {
    const {videoItemData} = this.state
    return (
      <VideoCard
        videoItemData={videoItemData}
        key={videoItemData.id}
        addVideo={addVideo}
      />
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
      <div
        data-testid="videoItemDetails"
        className="trending-failure-view"
        style={{backgroundColor: bgColor}}
      >
        <img src={imgUrl} alt="failure view" />
        <h1 style={{color: headingColor}}>Oops! Something Went Wrong</h1>
        <p style={{color: paraColor}}>
          We are having some trouble to complete your request. Please try again
          later.
        </p>
        <button type="button">Retry</button>
      </div>
    )
  }

  getRenderView = (activeTheme, addVideo, savedVideos) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(addVideo, savedVideos)
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
          const {activeTheme, savedVideos, addVideo} = value

          return (
            <>
              <Header />
              <div className="home-container">
                <NavigationBar />
                {this.getRenderView(activeTheme, addVideo, savedVideos)}
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default VideoItemDetails
