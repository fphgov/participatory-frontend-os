import { IMedia } from '@/models/media.model'
import { documentMimes } from '@/utilities/mimeTypes'

export function getImages(medias: IMedia[]): string[]|undefined {
  if (!Array.isArray(medias)) return

  return medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
    const link = process.env.NEXT_PUBLIC_URL + (process.env.NEXT_PUBLIC_API_REQ_MEDIA || '').toString().replace(':id', item.id)

    return link
  })
}

export function getDocuments(medias: IMedia[]): { original: string }[]|undefined {
  if (!Array.isArray(medias)) return

  return medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
    const link = process.env.NEXT_PUBLIC_URL + (process.env.NEXT_PUBLIC_API_REQ_MEDIA_DOWNLOAD || '').toString().replace(':id', item.id)

    return { original: link }
  })
}

export function getWafInfo(htmlContent: string): { url: string, attackId: string, messageId: string }|null {
  const el = document.createElement('html')

  el.innerHTML = htmlContent

  if (el.getElementsByTagName('p') && el.getElementsByTagName('p')[ 1 ]) {
    const infos = el.getElementsByTagName('p')[1].innerText.match(/^URL: (.*)Client IP: (.*)Attack ID: (.*)Message ID: (.*)$/)

    return {
      url: infos ? infos[1] : '',
      attackId: infos ? infos[3] : '',
      messageId: infos ? infos[4] : '',
    }
  }

  return null
}
