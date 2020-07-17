import React from "react";

export default class Proposal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      redirect: false,
      title: '',
      description: '',
      cost: '',
    }
  }

  componentDidMount() {
    document.body.classList.add('page-proposal')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-proposal')
  }
  
  handleChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handleOnlyNumberChangeInput(e) {
    const numberRegex = /[^0-9]+/g;

    let value = e.target.value

    if (numberRegex.test(value)) {
      value = value.replace(numberRegex, '');
    }

    this.setState({ error: '', [ e.target.name ]: e.target.value.replace(numberRegex, '') || "" })
  }

  submitLogin() {
    const data = {
      title: this.state.title,
      description: this.state.description,
      cost: this.state.cost,
    }

    axios.post(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_NEW_PROPOSAL, qs.stringify(data))
      .then(response => {
        if (response.data) {
          this.setState({
            redirect: true
          })
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

  Error(props) {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="proposal">
        <div className="container">
          <h1>Javaslat</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, aut eum qui necessitatibus molestiae ratione cum eos impedit incidunt voluptas rem delectus, laboriosam doloremque explicabo debitis voluptatibus ullam odit.</p>
          
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, aut eum qui necessitatibus molestiae ratione cum eos impedit incidunt voluptas rem delectus, laboriosam doloremque explicabo debitis voluptatibus ullam odit.</p>

          {this.state.error ? <this.Error message={this.state.error} /> : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <label htmlFor="title">Rövid megnevezés</label>
              <div className="input-tipp">Adjon meg egy címet a javaslatának.</div>
              <input type="text" placeholder="Rövid megnevezés" name="title" id="title" value={this.state.title} onChange={this.handleChangeInput.bind(this)} />
            </div>

            <div className="input-wrapper">
              <label htmlFor="description">Leírás</label>
              <div className="input-tipp">Fejtse ki, hogy miről szól a projekt.</div>
              <textarea placeholder="Leírás" name="description" id="description" value={this.state.description} onChange={this.handleChangeInput.bind(this)} />
            </div>
            
            <div className="input-wrapper">
              <label htmlFor="cost">Költség</label>
              <div className="input-tipp">Adja meg a javaslat becsült költségét. A költség értéke forintban értendő, ezres kerekítés nélkül.</div>
              <input type="text" placeholder="1000000" name="cost" id="cost" value={this.state.cost} onChange={this.handleOnlyNumberChangeInput.bind(this)} />
            </div>

            <input type="submit" value="Beküldés" className="btn btn-primary" onClick={this.submitLogin.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
