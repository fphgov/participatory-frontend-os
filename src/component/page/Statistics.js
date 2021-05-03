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
      pageCount: 0,
      projects: [],
      error: [],
    }

    this.context.set('loading', true, () => {
      this.getProjectData()
    })
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
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            projects: [],
            error: error.response.data.message
          })
        }

        this.context.set('loading', false)
      })
  }

  ProjectsWrapper(props) {
    const themeColor = props.project.campaign_theme.rgb
    const themeName = props.project.campaign_theme.name

    return (
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="prop-wrapper">
          <div className="prop-inner">
            <div className="prop-picture"></div>
            <div className="prop-category" style={{ backgroundColor: themeColor }}>{themeName}</div>
            <div className="prop-content-wrapper" style={{ borderColor: themeColor }}>
              <div className="prop-content">
                <Link to={`/projektek/${props.project.id}`}>
                  <div className="prop-title">{props.project.title}</div>
                </Link>

                <div className="prop-count">Leadott szavazatok:<br /><span>{props.project.voted} db</span></div>
              </div>
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
            {this.state.projects.map((project, i) => <this.ProjectsWrapper key={i} project={project} />)}
          </div>
        </div>
      </div>
    )
  }
}
