import './globals.css'
import "normalize.css"
import "bootstrap-4-grid/css/grid.min.css"
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
// import 'modernizr'
import 'url-polyfill'
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ScrollContent from '@/components/common/ScrollContent'
import { config } from "@fortawesome/fontawesome-svg-core"
import { cookies } from 'next/headers'

config.autoAddCss = false

const font = Source_Sans_3({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Közösségi költségvetés',
    default: 'Közösségi költségvetés',
  },
  description: 'Mire költsön 1 milliárd forintot Budapest?',
  icons: {
    icon: [
      '/manifest/favicon.ico'
    ],
    apple: [
      '/manifest/apple-touch-icon.png'
    ],
    shortcut: [
      '/manifest/apple-touch-icon.png'
    ],
  },
  manifest: '/manifest/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  return (
    <html lang="hu">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Cache-control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />

      <body className={`app ${font.className}`}>
        <Header loggedIn={typeof cookieStore.get('token')?.value === 'string'} />

        {children}

        <Footer />

        <ScrollContent />
      </body>
    </html>
  )
}
