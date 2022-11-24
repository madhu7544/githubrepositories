import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem
  return (
    <li className="each-repo">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="repo-head">{name}</h1>
      <div className="all-repos-data">
        <div className="each-repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="image-dot"
            alt="stars"
          />
          <p className="data">{starsCount} stars</p>
        </div>
        <div className="each-repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="image-dot"
            alt="forks"
          />
          <p className="data">{forksCount} forks</p>
        </div>
        <div className="each-repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="image-dot"
            alt="open issues"
          />
          <p className="data">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
