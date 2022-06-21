import axios from "../assets/axios"
import React, { useContext, useState, useEffect } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom";
import StoreContext from '../../StoreContext'
import ProjectWrapper from '../common/ProjectWrapper'
import ScrollTo from "../common/ScrollTo"

export default function Statistics() {
  const context = useContext(StoreContext)

  let { id } = useParams()

  const [ scroll, setScroll ] = useState(false)
  const [ project, setProject ] = useState(null)
  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  const getProjectData = () => {
    const link = process.env.REACT_APP_API_REQ_PROJECT.toString().replace(':id', id)

    axios
    .get(link)
    .then(response => {
      if (response.data) {
        setProject(response.data)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  const vote = () => {
    if (! project) {
      return
    }

    if (! context.get('token')) {
      setRedirectLogin(true)
    }

    setScroll(false)

    let data = {
      id: project.id,
      title: project.title,
      description: project.short_description
    };

    context.set('rk_modal_open', true)

    const name = `rk_vote_${project.campaignTheme.code}`
    localStorage.setItem(name, JSON.stringify(data))
    context.set(name, data)

    setScroll(true)
  }

  useEffect(() => {
    document.body.classList.add('page-project')

    context.set('loading', true, () => {
      getProjectData()
    })

    return () => {
      document.body.classList.remove('page-project')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const voteBtn = project && context.get(`rk_vote_${project.campaignTheme.code}`) && context.get(`rk_vote_${project.campaignTheme.code}`).id === project.id

  return (
    <div className="prop">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        {scroll && document.querySelector('.vote-modal') ? <ScrollTo element={document.querySelector('.vote-modal').offsetTop} /> : null}
        {error ? <Error message={error} /> : null}
        {project ? <ProjectWrapper project={project} onClickVote={vote} disableVoteButton={voteBtn} showVoteButton={false} onTipClick={() => { setScroll(true) }} /> : null}
      </div>
    </div>
  )
}
