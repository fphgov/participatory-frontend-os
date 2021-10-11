import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default function Logout() {
  const context = useContext(StoreContext)

  const [redirect, setRedirect] = useState(false)

  const submitLogout = () => {
    context.set('token', null, () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('rk_voted')
      localStorage.removeItem('rk_vote_CARE')
      localStorage.removeItem('rk_vote_WHOLE')
      localStorage.removeItem('rk_vote_GREEN')

      context.set('loading', false)
      setRedirect(true)
    })
    context.set('rk_vote_CARE', null)
    context.set('rk_vote_WHOLE', null)
    context.set('rk_vote_GREEN', null)
    context.set('successVote', null)
  }

  useEffect(() => {
    document.body.classList.add('page-logout')

    context.set('loading', true, () => {
      submitLogout()
    })

    return () => {
      document.body.classList.remove('page-logout')
    }
  }, [])

  return (
    redirect ? <Redirect to='/' /> : ''
  )
}
