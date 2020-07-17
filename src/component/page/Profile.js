import axios from "axios";
import React from "react";
import StoreContext from '../../StoreContext'

export default class Profile extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      profile: null
    }
 
    this.context.set('loading', true, () => {
      this.getProfileData()
    })
  }
  
  getProfileData() {
    const config = {
      headers: {
        'Authorization': `Bearer ${this.context.get('token')}`
      }
    }

    axios.get(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROFILE, config)
      .then(response => {
        if (response.data) {
          this.setState({
            profile: response.data
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

  Error(props) {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  ProfileBox(props) {
    return (
      <div className="box-profile">
        <p><b>Név:</b> {props.profile.lastname + ' ' + props.profile.firstname}</p>
        <p><b>E-mail:</b> {props.profile.email}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Profil</h1>

              {this.state.error ? <this.Error message={this.state.error} /> : null}

              {this.state.profile ? <this.ProfileBox profile={this.state.profile} /> : null }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
