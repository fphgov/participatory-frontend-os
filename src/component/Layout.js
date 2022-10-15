import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Page from "./Page"
import ScrollToTop from "./common/ScrollToTop"

export default function Layout({ children, withScrollTop = true }) {
  return (
    <>
      {withScrollTop ? <ScrollToTop>
        <Header />
          <Page>
            {children}
          </Page>
        <Footer />
      </ScrollToTop> : <>
        <Header />
          <Page>
            {children}
          </Page>
        <Footer />
      </>}
    </>
  )
}
