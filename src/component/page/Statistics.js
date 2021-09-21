import axios from "axios"
import React from "react"
import {
  Link
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default class Statistics extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      count: 0,
      currentTabIndex: 0,
      pageCount: 0,
      projects: [],
      filteredProjects: [],
      error: [],
    }

    this.context.set('loading', true, () => {
      this.getProjectData()
    })

    this.handleClickTab = this.handleClickTab.bind(this)
  }

  getProjectData() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    this.context.set('loading', true)

    axios.get(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROFILE_STATISTICS, config)
      .then(response => {
        if (response.data) {
          this.setState({
            projects: response.data._embedded.projects,
            filteredProjects: response.data._embedded.projects
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            projects: [],
            filteredProjects: [],
            error: error.response.data.message
          })
        }

        this.context.set('loading', false)
      })
  }

  handleClickTab(e) {
    const tabIndex = e.currentTarget.tabIndex
    const filteredProjects = tabIndex !== 0 ? this.state.projects.filter((t) => t.campaign_theme.id === tabIndex) : this.state.projects

    this.setState({
      filteredProjects: filteredProjects
    }, () => {
      this.setState({
        currentTabIndex: tabIndex
      })
    })
  }

  ProjectsWrapper(props) {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="stat-wrapper">
          <div className="stat-inner">
            <div className={`stat-content${props.project.win ? ' stat-content-win' : ''}`}>
              <Link to={`/projektek/${props.project.id}`}>
                <div className="stat-content-inner">
                  <div className="stat-id">{props.place + 1}.</div>
                  <div className="stat-title">{props.project.title}</div>
                </div>

                <div className="stat-content-inner">
                  <div className="stat-id" style={{ visibility: 'hidden' }}>{props.place + 1}.</div>
                  <div className="stat-count"><span>{props.project.voted} szavazat</span></div>
                  {props.project.win ? <div className="stat-win">(nyert)</div> : null}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="statistics">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Ötletekre leadott szavazatok</h1>

              <div className="tab-wrapper">
                <ul className="tab">
                  <li tabIndex={1} className={`${this.state.currentTabIndex === 1 ? 'active' : ''}`} onClick={this.handleClickTab}><a>Zöld Budapest</a></li>
                  <li tabIndex={2} className={`${this.state.currentTabIndex === 2 ? 'active' : ''}`} onClick={this.handleClickTab}><a>Gondoskodó Budapest</a></li>
                  <li tabIndex={3} className={`${this.state.currentTabIndex === 3 ? 'active' : ''}`} onClick={this.handleClickTab}><a>Egész Budapest</a></li>
                </ul>
              </div>
            </div>

            {this.state.filteredProjects.map((project, i) => <this.ProjectsWrapper key={i} project={project} place={i} />)}
          </div>
        </div>
      </div>
    )
  }
}
