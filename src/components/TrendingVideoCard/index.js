import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const TrendingVideoCard = props => {
  const {cardDetails} = props
  const formattedDate = formatDistanceToNow(new Date(cardDetails.publishedAt))
  const yearNumber = formattedDate.replace(/[^0-9]/g, '')

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
            <li className="trending-video-card">
              <img
                className="trending-thumbnail"
                src={cardDetails.thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="card-text-content">
                <img
                  src={cardDetails.channel.profileImageUrl}
                  alt="profile"
                  className="channel-photo"
                />
                <div className="trending-text-details">
                  <h2 style={{color: headingColor}}>{cardDetails.title}</h2>
                  <p style={{color: paraColor}}>{cardDetails.channel.name}</p>
                  <div className="trending-views-time">
                    <p style={{color: paraColor}}>
                      {cardDetails.viewCount} views
                    </p>
                    <BsDot style={{color: paraColor}} />
                    <p style={{color: paraColor}}>{yearNumber} years ago</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default TrendingVideoCard
