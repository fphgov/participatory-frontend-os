import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({ description, lang, meta, title }) {
  const siteMetaData = {
    title: 'Részvételi költségvetés',
    description: 'Mire költsön 1 milliárd forintot Budapest?',
    author: 'Fővárosi Önkormányzat',
    image: 'https://otlet.budapest.hu:443/pb/images/og_image.png'
  }

  const metaDescription = description || siteMetaData.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetaData.title}`}
      link={[
        {
          rel: `apple-touch-icon`,
          sizes: `57x57`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-57x57.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `60x60`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-60x60.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `72x72`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-72x72.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `76x76`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-76x76.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `114x114`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-114x114.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `120x120`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-120x120.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `144x144`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-144x144.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `152x152`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-152x152.png').replace('//', '/')}`
        },
        {
          rel: `apple-touch-icon`,
          sizes: `180x180`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/apple-icon-180x180.png').replace('//', '/')}`
        },
        {
          rel: `icon`,
          href: `${(process.env.REACT_APP_BASENAME + '/favicon.ico').replace('//', '/')}`
        },
        {
          rel: `icon`,
          sizes: `192x192`,
          type: `image/png`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/android-icon-192x192.png').replace('//', '/')}`
        },
        {
          rel: `icon`,
          sizes: `96x96`,
          type: `image/png`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/favicon-96x96.png').replace('//', '/')}`
        },
        {
          rel: `icon`,
          sizes: `32x32`,
          type: `image/png`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/favicon-32x32.png').replace('//', '/')}`
        },
        {
          rel: `icon`,
          sizes: `16x16`,
          type: `image/png`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest/favicon-16x16.png').replace('//', '/')}`
        },
        {
          rel: `manifest`,
          href: `${(process.env.REACT_APP_BASENAME + '/manifest.json').replace('//', '/')}`
        },
      ]}
      meta={[
        {
          charset: 'utf-8'
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
        {
          name: `msapplication-TileColor`,
          content: `#ffffff`,
        },
        {
          name: `msapplication-TileImage`,
          content: `${(process.env.REACT_APP_BASENAME + '/manifest/ms-icon-144x144.png').replace('//', '/')}`,
        },
        {
          name: `theme-color`,
          content: `#ffffff`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: siteMetaData.image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetaData.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `hu`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
