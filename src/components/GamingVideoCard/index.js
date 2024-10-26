import {Link} from 'react-router-dom'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const GamingVideoCard = props => {
  const {cardDetails} = props

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {activeTheme} = value

        const headingColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
        const paraColor = activeTheme === 'Light' ? '#000000' : '#606060'

        return (
          <Link
            to={`/videos/${cardDetails.id}`}
            style={{textDecoration: 'none', color: 'black'}}
          >
            <div className="gaming-video-card">
              <img
                className="gaming-thumbnail"
                src={cardDetails.thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="gaming-card-text-content">
                <h2 style={{color: headingColor}}>{cardDetails.title}</h2>
                <p style={{color: paraColor}}>
                  {cardDetails.viewCount} Watching worldwide
                </p>
              </div>
            </div>
          </Link>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default GamingVideoCard
