import * as t from 'src/types'
import api from 'src/api'
import config from './config'

// Docs: https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload
const URL = 'https://upload.imagekit.io/api/v1/files/upload'

type Image = {
  url: string
  fileId: string
}

export const uploadByFile = async (files: File[]): Promise<t.Asset[]> => {
  const assets: t.Asset[] = []
  for (const file of files) {
    const { data } = await api.assets.authenticate({})
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('publicKey', config.imageKitPublicKey!)
    formData.append('signature', data.signature)
    formData.append('expire', `${data.expire}`)
    formData.append('token', data.token)
    formData.append('fileName', file.name)
    const response = await fetch(URL, {
      method: 'POST',
      body: formData
    })
    const image = (await response.json()) as Image
    assets.push({
      url: image.url,
      id: image.fileId
    })
  }
  return assets
}

export const uploadByUrl = async (urls: string[]): Promise<t.Asset[]> => {
  const assets: t.Asset[] = []
  for (const url of urls) {
    const { data } = await api.assets.authenticate({})
    console.log(url)
    const formData = new FormData()
    formData.append('file', url)
    formData.append('publicKey', config.imageKitPublicKey!)
    formData.append('signature', data.signature)
    formData.append('expire', `${data.expire}`)
    formData.append('token', data.token)
    formData.append('fileName', url.split('/').pop() ?? 'linked-image')
    const response = await fetch(URL, {
      method: 'POST',
      body: formData
    })
    const image = (await response.json()) as Image
    assets.push({
      url: image.url,
      id: image.fileId
    })
  }
  return assets
}

export default {
  upload: {
    file: uploadByFile,
    url: uploadByUrl
  }
}
