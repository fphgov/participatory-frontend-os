import React from "react"
import ReactDOM from "react-dom"
import App from "./component/App"
import store from 'store'
import "./index.css"
import "normalize"
import "grid"
import StoreContext from './StoreContext'
import Loading from './component/common/Loading'
import 'url-polyfill'
import 'modernizr'

class AppWithContext extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      token: false,
      map: false,
      get: (key) => {
        return typeof store.get('state') !== 'undefined' && typeof store.get('state')[key] !== 'undefined' ? store.get('state')[key] : this.state[key]
      },
      set: (key, value, cb) => {
        const state = this.state

        state[key] = value

        if (typeof cb === 'function') {
          this.setState(state, cb)
        } else {
          this.setState(state)
        }
      },
      remove: (key, cb) => {
        const state = this.state
        delete state[ key ]

        if (typeof cb === 'function') {
          this.setState(state, cb)
        } else {
          this.setState(state)
        }
      },
      storeGet: (contextName) => {
        return typeof store.get(contextName) !== 'undefined' ? store.get(contextName) : null
      },
      storeSave: (contextName, key, value) => {
        const state = this.state

        state[key] = value

        store.set(contextName, { ...store.get(contextName), [key]: value })

        this.setState(state)
      },
      storeRemove: (contextName) => {
        store.remove(contextName)
      }
    }
  }

  UNSAFE_componentWillMount() {
    const state = store.get('state')

    this.setState(state)
  }

  render() {
    const { loading } = this.state

    return (
      <StoreContext.Provider value={this.state}>
        {loading ? <Loading /> : null}

        <App />
      </StoreContext.Provider>
    )
  }
}

ReactDOM.render(<AppWithContext />, document.getElementById("root"))
