import _ from 'radash'
import config from './config'

/**
 * Abstract returns more properties than these. These
 * are all we need and probably will ever need.
 */
export interface AbstractData {
  ip_address: string
  city: string
  region: string
  region_iso_code: string
  postal_code: string
  country: string
  country_code: string
  longitude: number
  latitude: number
  timezone: {
    name: string
    abbreviation: string
    gmt_offset: number
    current_time: string
    is_dst: true
  }
  currency: {
    currency_name: string
    currency_code: string
  }
}

export const abstract = (key: string) => ({
  inquire: async (): Promise<AbstractData | null> => {
    const [err, data] = await _.try(async () => {
      const res = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${key}`)
      return await res.json()
    })()
    if (err) {
      console.error(err)
      return null
    }
    return data as AbstractData
  }
})

export default abstract(config.abstractApiKey as string)
