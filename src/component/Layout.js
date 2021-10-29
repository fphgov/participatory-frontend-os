import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Page from "./Page"

export default function Layout({ children }) {
  return (
    <>
      <Header />
        <Page>
          {children}
        </Page>
      <Footer />
    </>
  )
}
