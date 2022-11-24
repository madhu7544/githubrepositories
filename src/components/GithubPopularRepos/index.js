import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const stateConstants = {
  load: 'Loading',
  success: 'SUCCESSFULL',
  fail: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    filteredData: [],
    status: stateConstants.fail,
    language: 'ALL',
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    this.setState({status: stateConstants.load})
    const {language} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${language}`,
    )
    const data = await response.json()
    const updatedData = data.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    if (response.ok) {
      this.setState({filteredData: updatedData, status: stateConstants.success})
    } else {
      this.setState({status: stateConstants.fail})
    }
  }

  getFilteredLanguage = id => {
    this.setState({language: id}, this.getRepositoryData)
  }

  getRenderSuccessful = () => {
    const {filteredData} = this.state
    return (
      <ul className="repository-items">
        {filteredData.map(each => (
          <RepositoryItem repoItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getRenderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onRenderFailure = () => (
    <div className="g-d4">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="g-img1"
      />
    </div>
  )

  onRender = () => {
    const {status} = this.state
    switch (status) {
      case stateConstants.load:
        return this.getRenderLoader()
      case stateConstants.success:
        return this.getRenderSuccessful()
      default:
        return this.onRenderFailure()
    }
  }

  render() {
    const {language} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="header-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageData={each}
              filteredLanguage={this.getFilteredLanguage}
              selectedId={each.id === language}
            />
          ))}
        </ul>
        <div className="repository-items">{this.onRender()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
