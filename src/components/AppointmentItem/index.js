import './index.css'

const Create = props => {
  const {details, toggledStar} = props
  const {title, formattedDate, id, isFavorite} = details

  const clickedOnStar = () => {
    toggledStar(id)
  }

  const starImageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starImageAlt = isFavorite ? 'star' : 'star'

  /*  const likeButtonColor = isLiked ? 'active-like' : ''

  const likeButtonText = isLiked ? 'Liked' : 'Like' */

  return (
    <li className="appointment-box">
      <div className="title-container">
        <p className="title">{title}</p>
        <button className="starbtn" testid="star">
          <img
            src={starImageUrl}
            className="star"
            alt={starImageAlt}
            onClick={clickedOnStar}
          />
        </button>
      </div>
      <p className="formattedDate">{formattedDate}</p>
    </li>
  )
}

export default Create
