import { documentMimes } from './mimeTypes'

export function dateConverter(date) {
  let tdate = new Date(date)

  let dd = tdate.getDate().toString().padStart(2, '0')
  let mm = (tdate.getMonth() + 1).toString().padStart(2, '0')
  let yyyy = tdate.getFullYear()

  let hour = tdate.getHours().toString().padStart(2, '0')
  let minute = tdate.getMinutes().toString().padStart(2, '0')
  let s = tdate.getSeconds().toString().padStart(3, '0')

  return `${yyyy}.${mm}.${dd}. ${hour}:${minute}:${s}`
}

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
