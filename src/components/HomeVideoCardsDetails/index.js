import HomeVideoCard from '../HomeVideoCard'

import './index.css'

const HomeVideoCardsDetails = props => {
  const {videoDetailsListItems} = props

  return (
    <ul className="videos-container">
      {videoDetailsListItems.map(eachVideo => (
        <HomeVideoCard cardDetails={eachVideo} key={eachVideo.id} />
      ))}
    </ul>
  )
}

export default HomeVideoCardsDetails
