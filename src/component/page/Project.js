import axios from "axios"
import React from "react"
import StoreContext from '../../StoreContext'
import NumberFormat from 'react-number-format'

export default class Proposal extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      proposal: null
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
            proposal: response.data
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
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="proposal-single-wrapper">
            <div className="proposal-single-inner">
              <div className="widget-title">Általános</div>
              <div className="propsal-single-content">
                <div className="propsal-location"><i className="fa fa-map-marker-alt" aria-hidden="true"></i> {props.proposal.location}</div>

                <div className="propsal-single-title">{props.proposal.title}</div>
                <div className="propsal-single-description" dangerouslySetInnerHTML={{ __html: props.proposal.description }} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="proposal-single-wrapper">
            <div className="widget-title">Javaslatról</div>
            <div className="propsal-single-content">
              {props.proposal.campaign ? (
                <div className="propsal-single-campaign">Kampány: <b>{props.proposal.campaign.title}</b></div>
              ) : null}
              <div className="propsal-single-published">{props.proposal.published}</div>
              <div className="propsal-single-cost">Becsült költség: <b><NumberFormat value={props.proposal.cost} displayType={'text'} thousandSeparator={" "} decimalSeparator={","} suffix={' Ft'} /></b></div>
            </div>
          </div>

          { props.proposal.submitter ? (
            <div className="proposal-single-wrapper">
              <div className="widget-title">Beküldésről</div>
              <div className="propsal-single-content">
                <div className="propsal-single-submitter">{props.proposal.submitter.lastname} {props.proposal.submitter.firstname}</div>
                <div className="propsal-single-submited">{ new Date(props.proposal.createdAt.date).toLocaleString() }</div>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="proposal">
        <div className="container">
          <h1>Beküldött javaslat</h1>

          {this.state.proposal ? <this.ProposalWrapper proposal={this.state.proposal} /> : null}
        </div>
      </div>
    )
  }
}
