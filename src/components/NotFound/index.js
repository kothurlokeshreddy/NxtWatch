import Header from '../Header'
import NavigationBar from '../NavigationBar'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

import './index.css'

const NotFound = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {activeTheme} = value

      const bgColor = activeTheme === 'Light' ? '#f1f1f1' : '#000000'
      const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'

      return (
        <>
          <Header />
          <div className="home-container">
            <NavigationBar />
            <div
              className="not-found-container"
              style={{backgroundColor: bgColor, color: textColor}}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
              />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default NotFound
