import {Link} from 'react-router-dom'
import {FaHome, FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

import './index.css'

const NavigationBar = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {activeTheme, activeTab, changeTab} = value

      const onClickHomeTab = () => {
        changeTab('Home')
      }

      const onClickTrendingTab = () => {
        changeTab('Trending')
      }

      const onClickGamingTab = () => {
        changeTab('Gaming')
      }

      const onClickSavedTab = () => {
        changeTab('SavedVideos')
      }

      const bgColor = activeTheme === 'Light' ? '#ffffff' : '#313131'
      const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
      const activeTabBg = activeTheme === 'Dark' ? '#606060' : '#cbd5e1'

      return (
        <div
          className="sidebar"
          style={{backgroundColor: bgColor, color: textColor}}
        >
          <ul className="navbar">
            <Link
              to="/"
              className="nav-link"
              style={{
                backgroundColor: activeTab === 'Home' ? activeTabBg : 'none',
              }}
            >
              <li style={{color: textColor}} onClick={onClickHomeTab}>
                <FaHome
                  className="sidebar-icons"
                  color={activeTab === 'Home' ? '#ff0000' : '#616e7c'}
                />
                Home
              </li>
            </Link>
            <Link
              to="/trending"
              className="nav-link"
              style={{
                backgroundColor:
                  activeTab === 'Trending' ? activeTabBg : 'none',
              }}
            >
              <li style={{color: textColor}} onClick={onClickTrendingTab}>
                <FaFire
                  className="sidebar-icons"
                  color={activeTab === 'Trending' ? '#ff0000' : '#616e7c'}
                />
                Trending
              </li>
            </Link>
            <Link
              to="/gaming"
              className="nav-link"
              style={{
                backgroundColor: activeTab === 'Gaming' ? activeTabBg : 'none',
              }}
            >
              <li style={{color: textColor}} onClick={onClickGamingTab}>
                <SiYoutubegaming
                  className="sidebar-icons"
                  color={activeTab === 'Gaming' ? '#ff0000' : '#616e7c'}
                />
                Gaming
              </li>
            </Link>
            <Link
              to="/saved-videos"
              className="nav-link"
              style={{
                backgroundColor:
                  activeTab === 'SavedVideos' ? activeTabBg : 'none',
              }}
            >
              <li style={{color: textColor}} onClick={onClickSavedTab}>
                <RiPlayListAddFill
                  className="sidebar-icons"
                  color={activeTab === 'SavedVideos' ? '#ff0000' : '#616e7c'}
                />
                Saved videos
              </li>
            </Link>
          </ul>
          <div className="contact-us">
            <h1>CONTACT US</h1>
            <div className="sidebar-logos">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations</p>
          </div>
        </div>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default NavigationBar
