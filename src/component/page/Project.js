import axios from "axios"
import React from "react"
import {
  Link,
} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import StoreContext from '../../StoreContext'
import nFormatter from '../assets/nFormatter'

export default class Project extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      project: null
    }

    this.context.set('loading', true, () => {
      this.getProposalsData()
    })
  }

  getProposalsData() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_REQ_PROJECT.toString().replace(':id', this.props.match.params.id)

    axios.get(process.env.REACT_APP_API_SERVER + link, config)
      .then(response => {
        if (response.data) {
          this.setState({
            project: response.data
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          })
        }
      })
  }

  ProposalWrapper(props) {
    const theme = props.project.campaign_theme;

    const images = props.project.medias.map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item)
      return { original: link }
    });

    return (
      <div className="prop-inner-wrapper">
        <div className="prop-inner-header" style={{ backgroundColor: theme.rgb }}>
          {theme.name}
        </div>
        <div className="prop-inner-content" style={{ borderColor: theme.rgb }}>
          <div className="row">
            <div className="col-md-8">
              <div className="prop-single-wrapper prop-single-body">
                <div className="prop-single-inner">
                  <div className="prop-single-content">
                    <div className="prop-location"><i className="fa fa-map-marker-alt" aria-hidden="true"></i> {props.project.location}</div>

                    <h1 className="prop-single-title" style={{ color: theme.rgb }}>{props.project.title}</h1>
                    <div className="prop-single-description" dangerouslySetInnerHTML={{ __html: props.project.description }} />

                    <h3 style={{ color: theme.rgb }}>Mire megoldás?</h3>
                    <div className="prop-single-solution" dangerouslySetInnerHTML={{ __html: props.project.solution }} />

                    {props.project.video || (props.project.medias && props.project.medias.length > 0) ? (
                      <>
                        <h3 style={{ color: theme.rgb }}>Média</h3>
                      </>
                    ) : null}

                    {props.project.video ? (
                      <>
                        <div className="media-sep">
                          <div className="prop-single-video" dangerouslySetInnerHTML={{ __html: `<iframe width="100%" height="315" src="${props.project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />
                        </div>
                      </>
                    ): null}

                    {props.project.medias && props.project.medias.length > 0 ? (
                      <>
                        <div className="media-sep">
                          <ImageGallery items={images} showFullscreenButton={false} showNav={false} showPlayButton={false} showBullets={true} showThumbnails={false} />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="prop-single-wrapper prop-single-sidebar">
                <div className="prop-single-content">
                  <button className="btn btn-primary btn-vote" style={{ backgroundColor: theme.rgb }}>Szavazom</button>

                  <h2>Projekt</h2>

                  {props.project.campaign ? (
                    <div className="prop-single-campaign">Kampány: <b>{props.project.campaign.title}</b></div>
                  ) : null}

                  <div className="prop-single-published">{props.project.published}</div>

                  <div className="prop-single-cost">
                    <div className="prop-info-title">Becsült ráfordítás</div>
                    <div className="prop-info-content">
                      {! props.project.cost ? <b>Nincs becsült ráfordítás</b> : <b>{nFormatter(props.project.cost)}</b>}
                    </div>
                  </div>

                  <div className="prop-single-ideas">
                    <div className="prop-info-title">Kapcsolódó ötletek</div>
                    <div className="prop-info-content">
                      {props.project.ideas.length === 0 ? <b>Nincs kapcsolodó ötlet</b> : null}
                      {props.project.ideas.map((idea, i) => {
                        return (<div className="idea" key={i}>
                          <a style={{ backgroundColor: theme.rgb }} href={`https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=proposal&campaign=A&proposal=${idea}`}>{idea}</a>
                        </div>)
                      })}
                    </div>
                  </div>

                  <div className="prop-single-tags">
                    <div className="prop-info-title">Címkék</div>
                    <div className="prop-info-content">
                      {props.project.tags.map((tag, i) => {
                        return (<div className="tag" key={i}>
                          <Link to={`/projects?tag=${tag.id}`} style={{ backgroundColor: theme.rgb }}>#{tag.name}</Link>
                        </div>)
                      })}
                    </div>
                  </div>

                </div>
              </div>

              { props.project.submitter ? (
                <div className="prop-single-wrapper">
                  <div className="widget-title">Beküldésről</div>
                  <div className="prop-single-content">
                    <div className="prop-single-submitter">{props.project.submitter.lastname} {props.project.submitter.firstname}</div>
                    <div className="prop-single-submited">{new Date(props.project.createdAt.date).toLocaleString() }</div>
                  </div>
                </div>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="prop">
        <div className="container">
          {this.state.project ? <this.ProposalWrapper project={this.state.project} /> : null}
        </div>
      </div>
    )
  }
}
