import React, { useEffect, useState, useContext } from 'react'
import {
  Redirect,
} from "react-router-dom"
import API from '../assets/axios'
import StoreContext from '../../StoreContext'
import ArticleCard from '../common/ArticleCard'
import HeroPage from '../common/HeroPage'
import Tabs from '../common/Tabs'

export default function Posts() {
  const context = useContext(StoreContext)

  const [ rawContent, setRawContent ] = useState(null)
  const [ error, setError ] = useState('')
  const [ tabs, setTabs ] = useState([])
  const [ redirect, setRedirect ] = useState(false)
  const [ currentTabIndex, setCurrentTabIndex ] = useState(0)

  const categories = [
    { category: { id: 0, name: 'Összes' } },
    { category: { id: 1, name: 'Hír' } },
    { category: { id: 2, name: 'Rendezvény' } },
    { category: { id: 3, name: 'Blog' } },
  ];

  const getPageContent = () => {
    setRawContent(null)
    context.set('loading', true)

    const categoryIds = [1, 2, 3]

    const data = {
      category: categoryIds,
    }

    if (currentTabIndex !== 0) {
      data['category'] = currentTabIndex;
    }

    API.get(
      process.env.REACT_APP_API_REQ_POSTS + '?' + new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data && response.data.data) {
        setRawContent(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }

      setRedirect(true)
    }).finally(() => {
      context.set('loading', false)
    })
  }

  const updateTabs = () => {
    if (! rawContent) return

    const tabs = categories.map((t) => {
      return {
        id: t.category.id,
        name: t.category.name,
      }
    }).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).sort((a, b) => a.id - b.id)

    setTabs(tabs)
  }

  const handleClickTab = (e) => {
    setCurrentTabIndex(e.currentTarget.tabIndex)
  }

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  useEffect(() => {
    getPageContent()
  }, [currentTabIndex])

  useEffect(() => {
    updateTabs()
  }, [rawContent])

  useEffect(() => {
    document.body.classList.add('page-posts')

    return () => {
      document.body.classList.remove('page-posts')
    }
  }, [])

  return (
    <div className="page-posts-section">
      {redirect ? <Redirect to="/404" /> : null}

      <HeroPage title="Hírek, rendezvények" content="A közösség költségvetéssel kapcsolatos legfrissebb hírek és tudnivalók." />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error ? <Error message={error} /> : null}

            <Tabs tabs={tabs} currentTabIndex={currentTabIndex} handleClickTab={handleClickTab} />

            <div className="posts">
              <div className="row">
                {Array.isArray(rawContent) && rawContent.map((post, i) => <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-12 article-wrapper"><ArticleCard post={post} /></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
