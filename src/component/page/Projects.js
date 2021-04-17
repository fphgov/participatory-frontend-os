import axios from "axios";
import React from "react";
import {
  Link
} from "react-router-dom";
import StoreContext from '../../StoreContext'
import OpenBP from '../../img/nyitott_budapest_white.svg'

export default class Projects extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      count: 0,
      projects: [],
      error: [],
      inputSearch: ''
    }

    this.context.set('loading', true, () => {
      this.getProjectData()
    })

    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
  }

  getProjectData() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROJECTS, config)
      .then(response => {
        if (response.data) {
          this.setState({
            projects: response.data.projects,
            count: response.data.count,
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          });
        }
      });
  }

  filterByTag(tag) {
    console.log(tag);
    console.log(this);
  }

  search(e) {
    e.preventDefault();

  }

  handleChange(event) {
    this.setState({ inputSearch: event.target.value });
  }

  ProposalsWrapper(props) {
    const [isHover, setIsHover] = React.useState(false);

    const themeColor = props.project.campaignTheme.rgb;

    return (
      <div className="col-md-4">
        <div className="proposal-wrapper">
          <div className="proposal-inner">
            <div className="propsal-picture"><img src={OpenBP} /></div>
            <div className="propsal-category" style={{ backgroundColor: themeColor }}>{props.project.campaignTheme.name}</div>
            <div className="propsal-content-wrapper" style={{ borderColor: themeColor }}>
              <div className="propsal-content">
                <div className="propsal-tags-wrapper">
                  <div className="propsal-tags">{props.project.tags.map((tag, i) => {
                    return (
                      <div key={i} className="filter-tag bg-transition" style={{ backgroundColor: themeColor }} onClick={() => props.tagClick(tag)}>#{tag.name}</div>
                    )
                  })}</div>
                </div>

                <div className="propsal-title">{props.project.title}</div>
                <div className="propsal-line" style={{ backgroundColor: themeColor }}></div>
                <div className="propsal-description">{props.project.shortDescription}</div>
              </div>

              <div className="propsal-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className="article-button-wrapper btn-wrapper">
                  <Link to={`/project/${props.project.hashId}`} className="btn btn-secondary" style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor: 'transparent' }}>Megtekintés</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="projects">
        <div className="search-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Mely projekteket látni szívesen megvalósulni?</h1>

                <div className="form-group">
                  <label className="sr-only" htmlFor="search">Keresés</label>
                  <div className="input-group">
                    <input className="form-control" type="text" name="query" value={this.state.inputSearch} placeholder="Keresés" id="search" onChange={this.handleChange} />
                    <span className="input-group-btn">
                      <button id="btn-search" className="btn btn-search form-control" type="submit" title="Keresés" onClick={this.search}>
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-xs-12">
                <select>
                  <option value="" selected="selected">Keresés helyszín alapján</option>
                  <option disabled="disabled">----</option>
                  <option value="">I. kerület</option>
                  <option value="">II. kerület</option>
                </select>
              </div>

              <div className="col-md-3 col-xs-12">
                <select>
                  <option value="" selected="selected">Keresés kategória alapján</option>
                  <option disabled="disabled">----</option>
                  <option value="">Egész Budapest</option>
                  <option value="">Gondoskodó Budapest</option>
                  <option value="">Zöld Budapest</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="search-result">
            {this.state.count} találat
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.state.projects.map((project, i) => <this.ProposalsWrapper key={i} project={project} tagClick={this.filterByTag} />)}
          </div>
        </div>
      </div>
    )
  }
}
