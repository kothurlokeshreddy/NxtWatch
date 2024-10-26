import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import HomeVideoCardsDetails from '../HomeVideoCardsDetails'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    closeBanner: false,
    searchInput: '',
    videoDetailsListItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  onCloseBanner = () => {
    this.setState({closeBanner: true})
  }

  onChangeSearchQuery = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    console.log('Enter CLicked')
    this.getVideoDetails()
  }

  onRetryButton = () => this.getVideoDetails()

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedVideoData = data.videos.map(eachVideo => ({
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videoDetailsListItems: formattedVideoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => {
    const {closeBanner} = this.props
    const videosHeight = closeBanner ? '78.3vh' : '44vh'
    return (
      <div
        className="loader-container"
        data-testid="loader"
        style={{height: videosHeight}}
      >
        <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = activeTheme => {
    const bgColor = activeTheme === 'Light' ? '#f1f1f1' : '#000000'
    const headingColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
    const paraColor = activeTheme === 'Light' ? '#383838' : '#606060'
    const imgUrl =
      activeTheme === 'Light'
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    const {closeBanner} = this.props
    const videosHeight = closeBanner ? '85vh' : '55vh'

    return (
      <div
        className="trending-failure-view"
        style={{backgroundColor: bgColor, height: videosHeight}}
      >
        <img src={imgUrl} alt="failure view" />
        <h1 style={{color: headingColor}}>Oops! Something Went Wrong</h1>
        <p style={{color: paraColor}}>We are having some trouble</p>
        <button type="button" onClick={this.onRetryButton}>
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = activeTheme => {
    const {videoDetailsListItems, searchInput, searchEntered} = this.state
    const bgColor = activeTheme === 'Light' ? '#f1f1f1' : '#000000'
    const headingColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
    const paraColor = activeTheme === 'Light' ? '#383838' : '#606060'
    const {closeBanner} = this.props
    const videosHeight = closeBanner ? '85vh' : '55vh'
    if (videoDetailsListItems.length === 0) {
      return (
        <div
          className="trending-failure-view"
          style={{backgroundColor: bgColor, height: videosHeight}}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="failure"
          />
          <h1 style={{color: headingColor}}>No Search Results Found</h1>
          <p style={{color: paraColor}}>
            Try searching different key words or remove search filter
          </p>
          <button type="button" onClick={this.onRetryButton}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <HomeVideoCardsDetails
        videoDetailsListItems={videoDetailsListItems}
        searchInput={searchInput}
        searchEntered={searchEntered}
      />
    )
  }

  getRenderView = activeTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(activeTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView(activeTheme)
      default:
        return apiStatusConstants.initial
    }
  }

  render() {
    const {closeBanner, searchInput} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {activeTheme} = value

          const bgColor = activeTheme === 'Light' ? '#f9f9f9' : '#181818'
          const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'

          return (
            <div data-testid="home">
              <Header />
              <div className="home-container">
                <NavigationBar />
                <div className="home-videos-ad-container">
                  {closeBanner ? (
                    ''
                  ) : (
                    <div className="ad-container" data-testid="banner">
                      <div className="ad-container-details">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p>Buy Nxt Watch Premium plans with UPI</p>
                        <button type="button" className="premium-btn">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        type="button"
                        data-testid="close"
                        className="close-btn"
                      >
                        <AiOutlineClose
                          className="close"
                          onClick={this.onCloseBanner}
                        />
                      </button>
                    </div>
                  )}
                  <div
                    className="search-videos-container"
                    style={{backgroundColor: bgColor}}
                  >
                    <div className="search-input-icon">
                      <input
                        type="search"
                        placeholder="Search"
                        onChange={this.onChangeSearchQuery}
                        value={searchInput}
                        style={{color: textColor, backgroundColor: bgColor}}
                      />
                      <button
                        type="button"
                        onClick={this.onClickSearch}
                        style={{backgroundColor: bgColor}}
                        data-testid="searchButton"
                      >
                        <AiOutlineSearch style={{color: textColor}} />
                      </button>
                    </div>
                    {this.getRenderView(activeTheme)}
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

export default Home
