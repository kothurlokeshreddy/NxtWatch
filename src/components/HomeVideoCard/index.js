import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

const HomeVideoCard = props => {
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
            style={{textDecoration: 'none'}}
          >
            <li className="video-card">
              <img
                className="thumbnail"
                src={cardDetails.thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="card-text-content">
                <img
                  className="channel-logo"
                  src={cardDetails.channel.profileImageUrl}
                  alt="channel logo"
                />
                <div className="text-details">
                  <h2 style={{color: headingColor}}>{cardDetails.title}</h2>
                  <p style={{color: paraColor}}>{cardDetails.channel.name}</p>
                  <div className="views-time">
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

export default HomeVideoCard
