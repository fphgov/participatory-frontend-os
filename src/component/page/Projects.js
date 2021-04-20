import axios from "axios"
import React from "react"
import {
  Link
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import OpenBP from '../../img/nyitott_budapest_white.svg'

export default class Projects extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      count: 0,
      pageCount: 0,
      projects: [],
      error: [],
      query: '',
      theme: '',
    }

    this.context.set('loading', true, () => {
      this.getProjectData()
    })

    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.clearQuery = this.clearQuery.bind(this)
  }

  componentDidMount() {
    const search = new URLSearchParams(document.location.search)

    this.setState({
      query: search.get('query') ? search.get('query') : '',
      theme: search.get('theme') ? search.get('theme') : '',
    })
  }

  componentWillUnmount() {
    this.setState({
      query: '',
      theme: '',
    })
  }

  getProjectData() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROJECTS + window.location.search, config)
      .then(response => {
        if (response.data) {
          this.setState({
            projects: response.data._embedded.projects,
            links: response.data._links,
            count: response.data._total_items,
            pageCount: response.data._page_count,
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            projects: [],
            links: null,
            count: 0,
            pageCount: 0,
            error: error.response.data.message
          })
        }

        this.context.set('loading', false)
      })
  }

  filterByTag(tag) {
    const search = new URLSearchParams(document.location.search)

    search.delete("theme")
    search.delete("query")
    search.delete("page")
    search.set("tag", tag.id)

    window.location.search = search.toString()
  }

  clearQuery() {
    window.location.href = window.location.href.split("?")[0];
  }

  pagination(page) {
    const search = new URLSearchParams(document.location.search)

    search.set("page", page)

    window.location.search = search.toString()
  }

  search(e) {
    e.preventDefault()

    const search = new URLSearchParams(document.location.search)

    search.set("query", this.state.query)
    search.set("theme", this.state.theme)

    window.location.search = search.toString()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.search(e)
    }
  }

  hasQueryFilter() {
    return !!window.location.search
  }

  ProposalsWrapper(props) {
    const [isHover, setIsHover] = React.useState(false)

    const themeColor = props.project.campaign_theme.rgb
    const themeName = props.project.campaign_theme.name
    const shortDescription = props.project.description

    return (
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="proposal-wrapper">
          <div className="proposal-inner">
            <div className="propsal-picture"><img src={OpenBP} /></div>
            <div className="propsal-category" style={{ backgroundColor: themeColor }}>{themeName}</div>
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
                <div className="propsal-description">{shortDescription}</div>
              </div>

              <div className="propsal-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className="article-button-wrapper btn-wrapper">
                  <Link to={`/projects/${props.project.id}`} className="btn btn-secondary" style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor: 'transparent' }}>Megtekintés</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const pageRegex = new RegExp("page=(\\d+)")

    const paginationShow = this.state.pageCount > 1
    const selfPageNum = (this.state.links && this.state.links.self && pageRegex.test(this.state.links.self.href)) ? this.state.links.self.href.match(pageRegex)[1] : false
    const prevPageNum = (this.state.links && this.state.links.prev && pageRegex.test(this.state.links.prev.href)) ? this.state.links.prev.href.match(pageRegex)[1] : false
    const nextPageNum = (this.state.links && this.state.links.next && pageRegex.test(this.state.links.next.href)) ? this.state.links.next.href.match(pageRegex)[1] : false
    const firstPageNum = (this.state.links && this.state.links.first && pageRegex.test(this.state.links.first.href)) ? this.state.links.first.href.match(pageRegex)[1] : false
    const lastPageNum = (this.state.links && this.state.links.last && pageRegex.test(this.state.links.last.href)) ? this.state.links.last.href.match(pageRegex)[1] : false

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
                    <input className="form-control" type="text" name="query" value={this.state.query} placeholder="Keresés" id="search" onKeyUp={this.onKeyUp} onChange={this.handleChange} />
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
                <select name="theme" onChange={this.handleChange} value={this.state.theme}>
                  <option value="">Keresés kategória alapján</option>
                  <option disabled="disabled">----</option>
                  <option value="1">Zöld Budapest</option>
                  <option value="2">Gondoskodó Budapest</option>
                  <option value="3">Egész Budapest</option>
                </select>
              </div>

              <div className="col-md-3 col-xs-12">
              </div>

              <div className="col-md-6 col-xs-12">
                <div className="filter-wrapper">
                  {this.hasQueryFilter() && (
                    <div className="filter-clear bg-transition" onClick={this.clearQuery}>
                      Szűrő feltételek törlése
                    </div>
                  )}
                </div>
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

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {paginationShow && (
                <div className="pagination">
                  {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
                    <div onClick={() => { this.pagination(firstPageNum) }}><i className="fa fa-angle-double-left"></i></div>
                  )}
                  {prevPageNum && (
                    <div onClick={() => { this.pagination(prevPageNum) }}>{prevPageNum}</div>
                  )}
                  {selfPageNum && (
                    <div className="active">{selfPageNum}</div>
                  )}
                  {nextPageNum && (
                    <div onClick={() => { this.pagination(nextPageNum) }}>{nextPageNum}</div>
                  )}
                  {(lastPageNum && nextPageNum) && (lastPageNum !== nextPageNum) && (
                    <div onClick={() => { this.pagination(lastPageNum) }}><i className="fa fa-angle-double-right"></i></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
