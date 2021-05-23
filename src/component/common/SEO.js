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
          rel: `icon`,
          href: `${(process.env.REACT_APP_BASENAME + '/icon_96x96.png').replace('//', '/')}`,
          type: `image/png`
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
