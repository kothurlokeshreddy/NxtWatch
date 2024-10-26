import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {MdMenu} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineClose} from 'react-icons/ai'
import {FaHome, FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

import './index.css'

const Header = props => {
  const onConfirmButton = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {activeTheme, activeTab, changeTab, changeTheme} = value
        const onChangeTheme = () => {
          changeTheme(activeTheme)
        }

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

        const logo =
          activeTheme === 'Light'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        const bgColor = activeTheme === 'Light' ? '#ffffff' : '#313131'
        const buttonColor =
          activeTheme === 'Light' ? 'logout-btn' : 'dark-logout-btn'
        const mobileThemeColor =
          activeTheme === 'Light'
            ? 'mobile-header-theme'
            : 'mobile-dark-header-theme'
        const themeColor =
          activeTheme === 'Light' ? 'header-theme' : 'dark-header-theme'
        const popupBgColor =
          activeTheme === 'Light'
            ? 'logout-popup-container'
            : 'dark-logout-popup-container'
        const popupHeadingColor =
          activeTheme === 'Light'
            ? 'logout-popup-container-heading'
            : 'dark-logout-popup-container-heading'
        const popupCancelButtonColor =
          activeTheme === 'Light'
            ? 'cancel-button-light-color'
            : 'cancel-button-dark-color'
        const menuBgColor = activeTheme === 'Light' ? '#ffffff' : '#313131'
        const activeTabBg = activeTheme === 'Dark' ? '#606060' : '#cbd5e1'
        const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'

        return (
          <>
            <div className="mobile-header" style={{backgroundColor: bgColor}}>
              <Link to="/">
                <img
                  src={logo}
                  alt="website logo"
                  className="mobile-header-logo"
                />
              </Link>
              <div className="mobile-header-components">
                {activeTheme === 'Light' ? (
                  <button
                    type="button"
                    style={{backgroundColor: 'transparent', border: 'none'}}
                    data-testid="theme"
                  >
                    <BsMoon
                      className={mobileThemeColor}
                      onClick={onChangeTheme}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{backgroundColor: 'transparent', border: 'none'}}
                    data-testid="theme"
                  >
                    <BsBrightnessHigh
                      className={mobileThemeColor}
                      onClick={onChangeTheme}
                    />
                  </button>
                )}
                <Popup
                  modal
                  trigger={<MdMenu className={mobileThemeColor} />}
                  className="menu-popup"
                >
                  {close => (
                    <div
                      className="menu-popup-content"
                      style={{backgroundColor: menuBgColor}}
                    >
                      <button type="button" className="menu-close-btn">
                        <AiOutlineClose
                          className="menu-close"
                          onClick={() => close()}
                          style={{color: textColor}}
                        />
                      </button>
                      <ul className="navbar">
                        <Link
                          to="/"
                          className="nav-link"
                          style={{
                            backgroundColor:
                              activeTab === 'Home' ? activeTabBg : 'none',
                          }}
                        >
                          <li
                            style={{color: textColor}}
                            onClick={onClickHomeTab}
                          >
                            <FaHome
                              className="sidebar-icons"
                              color={
                                activeTab === 'Home' ? '#ff0000' : '#616e7c'
                              }
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
                          <li
                            style={{color: textColor}}
                            onClick={onClickTrendingTab}
                          >
                            <FaFire
                              className="sidebar-icons"
                              color={
                                activeTab === 'Trending' ? '#ff0000' : '#616e7c'
                              }
                            />
                            Trending
                          </li>
                        </Link>
                        <Link
                          to="/gaming"
                          className="nav-link"
                          style={{
                            backgroundColor:
                              activeTab === 'Gaming' ? activeTabBg : 'none',
                          }}
                        >
                          <li
                            style={{color: textColor}}
                            onClick={onClickGamingTab}
                          >
                            <SiYoutubegaming
                              className="sidebar-icons"
                              color={
                                activeTab === 'Gaming' ? '#ff0000' : '#616e7c'
                              }
                            />
                            Gaming
                          </li>
                        </Link>
                        <Link
                          to="/saved-videos"
                          className="nav-link"
                          style={{
                            backgroundColor:
                              activeTab === 'SavedVideos'
                                ? activeTabBg
                                : 'none',
                          }}
                        >
                          <li
                            style={{color: textColor}}
                            onClick={onClickSavedTab}
                          >
                            <RiPlayListAddFill
                              className="sidebar-icons"
                              color={
                                activeTab === 'SavedVideos'
                                  ? '#ff0000'
                                  : '#616e7c'
                              }
                            />
                            Saved videos
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Popup>
                <Popup
                  modal
                  trigger={<FiLogOut className={mobileThemeColor} />}
                  className="popup-content"
                >
                  {close => (
                    <div className={popupBgColor}>
                      <h3 className={popupHeadingColor}>
                        Are you sure, you want to logout?
                      </h3>
                      <div className="popup-buttons-container">
                        <button
                          type="button"
                          className={`cancel-button ${popupCancelButtonColor}`}
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onConfirmButton}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
            <div className="header" style={{backgroundColor: bgColor}}>
              <Link to="/">
                <img src={logo} alt="" className="header-logo" />
              </Link>
              <div className="header-components">
                {activeTheme === 'Light' ? (
                  <BsMoon className={themeColor} onClick={onChangeTheme} />
                ) : (
                  <BsBrightnessHigh
                    className={themeColor}
                    onClick={onChangeTheme}
                  />
                )}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="header-profile"
                />
                <Popup
                  modal
                  trigger={
                    <button type="button" className={buttonColor}>
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div className="logout-popup-container">
                      <h3>Are you sure, you want to logout?</h3>
                      <div className="popup-buttons-container">
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onConfirmButton}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Header)
