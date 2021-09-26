import React, { useContext, useEffect } from "react"
import {
  useLocation
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default function PageWrapper(props) {
  const context = useContext(StoreContext)

  const location = useLocation()

  useEffect(() => {
    context.set('location', location)
  }, [location])

  return (
    <>
      {props.children}
    </>
  )
}
