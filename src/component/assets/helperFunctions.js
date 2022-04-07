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
    const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

    return { original: link }
  })
}
