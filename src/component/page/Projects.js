import axios from "axios"
import React from "react"
import {
  Link
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

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
      location: '',
    }

    this.queryRef = React.createRef()

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
      location: search.get('location') ? search.get('location') : '',
    })
  }

  componentWillUnmount() {
    this.setState({
      query: '',
      theme: '',
      location: '',
    })
  }

  getProjectData() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    this.context.set('loading', true)

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
    search.delete("location")
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

    search.delete("page")
    search.set("query", this.state.query)
    search.set("theme", this.state.theme)
    search.set("location", this.state.location)

    window.location.search = search.toString()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.queryRef.current.focus()
    })
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.search(e)
    }
  }

  hasQueryFilter() {
    const onlyPageParam = /^\?page=\d+$/.test(document.location.search)

    return !!window.location.search && !onlyPageParam || this.state.query !== '' || this.state.theme !== '' || this.state.location !== ''
  }

  ProjectsWrapper(props) {
    const [isHover, setIsHover] = React.useState(false)

    const themeColor = props.project.campaign_theme.rgb
    const themeName = props.project.campaign_theme.name
    const shortDescription = props.project.description

    return (
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="prop-wrapper">
          <div className="prop-inner">
            <div className="prop-picture"></div>
            <div className="prop-category" style={{ backgroundColor: themeColor }}>{themeName}</div>
            <div className="prop-content-wrapper" style={{ borderColor: themeColor }}>
              <div className="prop-content">
                <div className="prop-tags-wrapper">
                  <div className="prop-tags">{props.project.tags.map((tag, i) => {
                    return (
                      <div key={i} className="filter-tag bg-transition" style={{ backgroundColor: themeColor }} onClick={() => props.tagClick(tag)}>#{tag.name}</div>
                    )
                  })}</div>
                </div>

                <div className="prop-title">
                  <Link to={`/projektek/${props.project.id}`}>{props.project.title}</Link>
                </div>
                <div className="prop-line" style={{ backgroundColor: themeColor }}></div>
                <div className="prop-description">{shortDescription}</div>
              </div>

              <div className="prop-more" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className="article-button-wrapper btn-wrapper">
                  <Link to={`/projektek/${props.project.id}`} className="btn btn-secondary" style={{ borderColor: themeColor, color: isHover ? '#fff' : themeColor, backgroundColor: isHover ? themeColor: 'transparent' }}>Megtekintés</Link>
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
                <h1>Mely projekteket látná szívesen megvalósulni?</h1>

                <div className="form-group">
                  <label className="sr-only" htmlFor="search">Keresés</label>
                  <div className="input-group">
                    <input className="form-control" type="text" name="query" value={this.state.query} placeholder="Keresés" id="search" ref={this.queryRef} onKeyUp={this.onKeyUp} onChange={this.handleChange} />
                    <span className="input-group-btn">
                      <button id="btn-search" className="btn btn-search form-control" type="submit" title="Keresés" onClick={this.search}>
                        <FontAwesomeIcon icon={faSearch} />
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
                <select name="location" onChange={this.handleChange} value={this.state.location}>
                  <option value="">Keresés kerület alapján</option>
                  <option disabled="disabled">----</option>
                  <option value="1">Nem köthető konkrét helyszínhez (32)</option>
                  <option value="2">I. kerület (0)</option>
                  <option value="3">II. kerület (0)</option>
                  <option value="4">III. kerület (5)</option>
                  <option value="5">IV. kerület (0)</option>
                  <option value="6">V. kerület (0)</option>
                  <option value="7">VI. kerület (1)</option>
                  <option value="8">VII. kerület (3)</option>
                  <option value="9">VIII. kerület (4)</option>
                  <option value="10">IX. kerület (2)</option>
                  <option value="11">X. kerület (2)</option>
                  <option value="12">XI. kerület (2)</option>
                  <option value="13">XII. kerület (0)</option>
                  <option value="14">XIII. kerület (1)</option>
                  <option value="15">XIV. kerület (4)</option>
                  <option value="16">XV. kerület (0)</option>
                  <option value="17">XVI. kerület (0)</option>
                  <option value="18">XVII. kerület (0)</option>
                  <option value="19">XVIII. kerület (0)</option>
                  <option value="20">XIX. kerület (0)</option>
                  <option value="21">XX. kerület (0)</option>
                  <option value="22">XXI. kerület (1)</option>
                  <option value="23">XXII. kerület (0)</option>
                  <option value="24">Margit sziget (1)</option>
                </select>
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
            {this.state.projects.map((project, i) => <this.ProjectsWrapper key={i} project={project} tagClick={this.filterByTag} />)}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {paginationShow && (
                <div className="pagination">
                  {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
                    <div onClick={() => { this.pagination(firstPageNum) }}><FontAwesomeIcon icon={faAngleDoubleLeft} /></div>
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
                    <div onClick={() => { this.pagination(lastPageNum) }}><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
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
