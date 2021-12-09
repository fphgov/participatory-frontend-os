import axios from '../assets/axios'
import React, { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import StoreContext from '../../StoreContext'
import PostListElement from '../common/PostListElement'

export default function Posts() {
  const context = useContext(StoreContext)

  const [ posts, setPosts ] = useState()

  const notify = (message) => toast.dark(message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const findNews = (e) => {
    if (e) {
      e.preventDefault()
    }

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    let link = process.env.REACT_APP_API_ADMIN_REQ_POSTS

    axios.post(process.env.REACT_APP_API_ADMIN_SERVER + link, new URLSearchParams({}), config)
      .then(response => {
        if (response.data && response.data.data) {
          setPosts(response.data.data)
        } else {
          notify('⛔️ Sikertelen adat lekérés')
        }
      })
      .catch((e) => {
        console.log(e)
        notify('⛔️ Sikertelen adat lekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  useEffect(() => {
    findNews()
  }, [])

  return (
    <div className="reports">
      <div className="container">

        <h2 className="mt-5">Hírek</h2>

        <div className="mt-4 row">
          {posts && posts.map((post, i) => <div key={i} style={{ width: "100%" }}> <PostListElement key={i} name="post" object={post} /></div>)}
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
