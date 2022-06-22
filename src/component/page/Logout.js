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

      context.set('loading', false)
      setRedirect(true)
    })
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
