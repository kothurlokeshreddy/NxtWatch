import React from 'react'

const ThemeAndVideoContext = React.createContext({
  activeTheme: 'Light',
  activeTab: 'Home',
  savedVideos: [],
  changeTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
})

export default ThemeAndVideoContext
