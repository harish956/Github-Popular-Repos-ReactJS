import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const viewsObj = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    reposList: [],
    view: viewsObj.initial,
  }

  componentDidMount() {
    this.setState({view: viewsObj.inProgress})
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({view: viewsObj.inProgress})
    const {activeId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({reposList: updatedData, view: viewsObj.success})
    } else if (response.status === 401) {
      this.setState({view: viewsObj.failure})
    }
  }

  filterItem = activeItemId => {
    this.setState({activeId: activeItemId}, this.getDetails)
  }

  renderSuccessView = () => {
    const {activeId, reposList} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <div>
          <ul className="selectContainer">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                activeId={activeId}
                key={eachItem.id}
                optionItem={eachItem}
                filterItem={this.filterItem}
              />
            ))}
          </ul>
        </div>
        <div className="container">
          <ul className="repositoryItemsContainer">
            {reposList.map(repoItem => (
              <RepositoryItem repoItem={repoItem} key={repoItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  progressView = () => (
    <div data-testid="loader" className="main-container">
      <Loader
        type="ThreeDots"
        color="#0284c7"
        height={80}
        width={80}
        style={{marginTop: '50px'}}
      />
    </div>
  )

  failureView = () => {
    const {activeId} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <div>
          <ul className="selectContainer">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                activeId={activeId}
                key={eachItem.id}
                optionItem={eachItem}
                filterItem={this.filterItem}
              />
            ))}
          </ul>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1>Something Wnt Wrong</h1>
        </div>
      </div>
    )
  }

  render() {
    const {view} = this.state
    switch (view) {
      case viewsObj.success:
        return this.renderSuccessView()
      case viewsObj.failure:
        return this.failureView()
      case viewsObj.inProgress:
        return this.progressView()
      default:
        return null
    }
  }
}
export default GithubPopularRepos
