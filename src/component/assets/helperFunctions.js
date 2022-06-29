import { documentMimes } from './mimeTypes'

export function getImages(medias) {
  if (!Array.isArray(medias)) return

  return medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return link
  })
}

export function getDocuments(medias) {
  if (!Array.isArray(medias)) return

  return medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

    return { original: link }
  })
}

export function getWafInfo(htmlContent) {
  const el = document.createElement('html')

  el.innerHTML = htmlContent

  if (el.getElementsByTagName('p') && el.getElementsByTagName('p')[ 1 ]) {
    const infos = el.getElementsByTagName('p')[ 1 ].innerText.match(/^URL: (.*)Client IP: (.*)Attack ID: (.*)Message ID: (.*)$/)

    return {
      url: infos[ 1 ],
      attackId: infos[ 3 ],
      messageId: infos[ 4 ]
    }
  }

  return null
}
