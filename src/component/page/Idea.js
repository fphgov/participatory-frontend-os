import axios from "../assets/axios"
import React, { useContext, useState, useEffect } from "react"
import {
  Link,
  useParams,
} from "react-router-dom";
import StoreContext from '../../StoreContext'
import IdeaWrapper from '../common/IdeaWrapper'
import HeroPage from '../common/HeroPage'

export default function Idea() {
  const context = useContext(StoreContext)

  let { id } = useParams()

  const [ idea, setIdea ] = useState(null)
  const [ error, setError ] = useState('')

  const getProjectData = () => {
    const link = process.env.REACT_APP_API_REQ_IDEA.toString().replace(':id', id)

    axios
    .get(link)
    .then(response => {
      if (response.data) {
        setIdea(response.data)
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

  useEffect(() => {
    document.body.classList.add('page-idea')

    context.set('loading', true, () => {
      getProjectData()
    })

    return () => {
      document.body.classList.remove('page-idea')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  return (
    <div className="prop">
      {idea ? <>
        <HeroPage title={idea.title} link={<Link className="link-attention" to="/otletek">Vissza</Link>} />
      </> : null}

      <div className="container">
        {error ? <Error message={error} /> : null}
        {idea ? <IdeaWrapper idea={idea} /> : null}
      </div>
    </div>
  )
}
