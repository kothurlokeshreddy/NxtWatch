import {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import ThemeAndVideoContext from './Context/ThemeAndVideoContext'

// Replace your code here
class App extends Component {
  state = {
    activeTheme: 'Light',
    activeTab: 'Home',
    savedVideos: [],
  }

  changeTab = activeTab => {
    this.setState({activeTab})
  }

  changeTheme = activeTheme => {
    if (activeTheme === 'Light') {
      this.setState({activeTheme: 'Dark'})
    } else {
      this.setState({activeTheme: 'Light'})
    }
  }

  addVideo = videoDetails => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(
      eachVideo => eachVideo.id === videoDetails.id,
    )
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    } else {
      this.setState({savedVideos})
    }
  }

  render() {
    const {activeTheme, activeTab, savedVideos} = this.state
    return (
      <ThemeAndVideoContext.Provider
        value={{
          activeTheme,
          activeTab,
          savedVideos,
          changeTheme: this.changeTheme,
          changeTab: this.changeTab,
          addVideo: this.addVideo,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default withRouter(App)
