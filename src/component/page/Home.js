import React, { useEffect, useContext, useState } from 'react'
import StoreContext from '../../StoreContext'
import {
  Link,
} from "react-router-dom"
import axios from 'axios'
import API from '../assets/axios'
import TimeLineItem from '../common/TimeLineItem'
import ArticleCard from '../common/ArticleCard'
import IdeaCard from '../common/IdeaCard'
import NewsletterArea from '../common/NewsletterArea'
import CountDown from '../common/CountDown'
import TimelineIcon1 from '../../img/timeline-icon-1.svg'
import TimelineIcon2 from '../../img/timeline-icon-2.svg'
import TimelineIcon3 from '../../img/timeline-icon-3.svg'
import TimelineIcon4 from '../../img/timeline-icon-4.svg'
import generateRandomValue from '../assets/generateRandomValue'

export default function Home() {
  const context = useContext(StoreContext)

  const [posts, setPosts] = useState([])
  const [ideas, setIdeas] = useState([])

  const getPageContent = () => {
    setPosts(null)
    context.set('loading', true)

    const categoryIds = [1, 2, 3]

    const data = {
      category: categoryIds,
      limit: 3,
    }

    const requestPosts = API.get(process.env.REACT_APP_API_REQ_POSTS + '?' + new URLSearchParams(data).toString());
    const requestProjects = API.get(process.env.REACT_APP_API_REQ_PROJECTS + '?status=under_construction&limit=3&rand=' + generateRandomValue());

    axios.all([requestPosts, requestProjects]).then(axios.spread((...responses) => {
      const responsePosts = responses[0]
      const responseProjects = responses[1]

      if (responsePosts.data && responsePosts.data.data) {
        setPosts(responsePosts.data.data)
      }

      if (responseProjects.data) {
        setIdeas(responseProjects.data._embedded.projects)
      }
    })).finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-home')

    getPageContent()

    return () => {
      document.body.classList.remove('page-home')
    }
  }, [])

  return (
    <div className="page-home-section">
      <div className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Adj egy jó ötletet!</h2>

                <p>A Fővárosi Önkormányzat 2023-ban harmadik alkalommal indítja el közösségi költségvetését. A budapestiek ötletei alapján ismét 1 milliárd forint felhasználásáról dönthetnek majd a város lakói.</p>

                <Link className="btn btn-primary btn-headline btn-next" to="/bekuldesi-informacio">Ötletbeküldés</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section win-feed">
        <div className="container">
          <div className="row flex-center">
            <div className="col-md-3">
              <h2>Korábbi évek nyertes ötletei</h2>
            </div>

            <div className="col-md-9" style={{ textAlign: 'right' }}>
              <Link to="/projektek?status=under_construction" className="btn btn-primary desktop-only">További nyertes ötletek</Link>
            </div>
          </div>

          <div className="row">
            {Array.isArray(ideas) && ideas.map((idea, i) => <div key={i} className="col-md-6 col-lg-4"><IdeaCard idea={idea} ideaPreLink={'/projektek'} isBuilding={true} /></div>)}
          </div>

          <div className="mobile-only" style={{ textAlign: 'center' }}>
              <Link to="/projektek?status=under_construction" className="btn btn-primary">További nyertes ötletek</Link>
          </div>
        </div>
      </div>

      <div className="light-section fix-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Közösségi költségvetés menete</h2>
            </div>

            <div className="col-md-12">
              <div className="timeline-wrapper">
                <TimeLineItem icon={TimelineIcon1} date="2022.10.15. - 12.31." description="Ötletek beküldése" />
                <TimeLineItem icon={TimelineIcon2} date="2023. első negyedév" description="Szakmai jóváhagyás" />
                <TimeLineItem icon={TimelineIcon3} date="2023. tavasz" description="Ötletfejlesztés" />
                <TimeLineItem icon={TimelineIcon4} date="2023. nyár" description="Szavazás" />
                <TimeLineItem icon={TimelineIcon4} date="2023. ősztől" description="Megvalósítás" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="medium-section news-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2>Kiemelt híreink</h2>

              <Link to='/hirek' className="btn btn-primary btn-next desktop-only">További híreink</Link>
            </div>

            <div className="col-md-9">
              <div className="posts">
                <div className="row">
                  {Array.isArray(posts) && posts.map((post, i) => <div key={i} className="col-md-12 col-lg-4"><ArticleCard post={post} /></div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-only" style={{ textAlign: 'center' }}>
              <Link to="/hirek" className="btn btn-primary">További híreink</Link>
          </div>
        </div>
      </div>

      <NewsletterArea />
    </div>
  )
}
