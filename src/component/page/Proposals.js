import axios from "axios";
import React from "react";
import {
  Link
} from "react-router-dom";
import StoreContext from '../../StoreContext'

export default class Proposals extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      proposals: []
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

    axios.get(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROPOSALS, config)
      .then(response => {
        if (response.data) {
          this.setState({
            proposals: response.data
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

  ProposalsWrapper(props) {
    return (
      <div className="col-md-4">
        <div className="proposal-wrapper">
          <div className="proposal-inner">
            <div className="propsal-category">Általános</div>
            <div className="propsal-content">
              <div className="propsal-location"><i className="fa fa-map-marker-alt" aria-hidden="true"></i> {props.proposal.location}</div>

              <div className="propsal-title">{props.proposal.title}</div>
              <div className="propsal-description">{props.proposal.short_description}</div>
            </div>

            <div className="propsal-more">
              <div className="article-button-wrapper btn-wrapper">
                <Link to={`/javaslat/${props.proposal.hashId}`} className="btn btn-secondary">Javaslat bemutatása</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="proposals">
        <div className="container">
          <h1>Beküldött javaslatok</h1>

          <div className="row">
            {this.state.proposals.map((proposal, i) => <this.ProposalsWrapper key={i} proposal={proposal} />)}
          </div>
        </div>
      </div>
    )
  }
}
