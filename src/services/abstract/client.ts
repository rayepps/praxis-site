import _ from 'radash'
import config from '../../config'
import type { AbstractData } from './types'

export const abstract = (key: string) => ({
  inquire: async (): Promise<[Error, AbstractData]> => {
    const [err, data] = await _.try(async () => {
      const res = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${key}`)
      return await res.json()
    })()
    if (err) {
      console.error(err)
      return [err, null] as any as [Error, AbstractData]
    }
    if (data.error) {
      console.error(data.error)
      return [data.error, null] as any as [Error, AbstractData]
    }
    return [null, data as AbstractData] as any as [Error, AbstractData]
  }
})

export default abstract(config.abstractApiKey as string)
