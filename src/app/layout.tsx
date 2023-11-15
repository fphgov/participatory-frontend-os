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
import CookieConsentPopup from '@/components/common/CookieConsentPopup'
import Modal from '@/components/common/Modal'
import { ModalContextProvider } from '@/context/modal'

config.autoAddCss = false

const font = Source_Sans_3({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ''),
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
  manifest: '/manifest/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    title: {
      template: '%s | Közösségi költségvetés',
      default: 'Közösségi költségvetés',
    },
    url: process.env.NEXT_PUBLIC_URL || '',
    siteName: 'Közösségi költségvetés',
    description: 'Mire költsön 1 milliárd forintot Budapest?',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  return (
    <html lang="hu">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />

        <CookieConsentPopup />

        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL ? <>
          <script type="text/plain" data-cookiecategory="marketing" defer dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
            { if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}');
            fbq('track', 'PageView');` }}>
          </script>

          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <noscript><img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}&ev=PageView&noscript=1`}/></noscript>
        </> : null}
      </head>

      <ModalContextProvider>
        <body className={`app ${font.className}`}>
          <Modal />

          <Header loggedIn={typeof cookieStore.get('token')?.value === 'string'} />

          {children}

          <Footer />

          <ScrollContent />
        </body>
      </ModalContextProvider>
    </html>
  )
}
