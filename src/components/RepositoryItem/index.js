import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem

  return (
    <li className="reposItem">
      <img className="avatarImg" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div>
        <div className="starts-container">
          <img
            className="starsImg"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="forks-container">
          <img
            className="forksImg"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="issues-container">
          <img
            className="openIssuesImg"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
