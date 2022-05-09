import _ from 'radash'
import { useEffect, useState } from 'react'
import * as t from 'src/types'
import useAbstract from './useAbstract'
import storage from 'src/local-storage'

// This is a hybrid broswer geolocation + abstract API
// hook that requests location access from the browser
// to get the longitude/latitude coordinates. It also
// makes a fetch request to the abstract API to get the
// readable city/state/country name.

type GeoState = {
  coords: t.GeoLocation | null
  error: GeolocationPositionError | null
}

type GeoLocationState = GeoState & {
  refresh: () => void
  disable: () => void
  enable: () => void
  
  // city: string | null
  // state: string | null
  ready: boolean
  disabled: boolean
}

export default function useGeolocation(): GeoLocationState {
  // const abs = useAbstract()
  const [disabled, setDisabled] = useState(false)
  const [geo, setGeo] = useState<GeoState>({
    coords: null,
    error: null
  })

  const refresh = async () => {
    const [err, location] = await _.try(getBrowserLocation)()
    if (err) {
      console.warn(err)
      setGeo({
        error: err as any as GeolocationPositionError,
        coords: null
      })
      return
    }
    storage.geolocation.set({
      location,
      disabled: false
    })
    setGeo({
      error: null,
      coords: location
    })
  }

  useEffect(() => {
    if (!navigator?.geolocation?.getCurrentPosition) return
    const existing = storage.geolocation.get()
    if (existing) {
      setDisabled(existing.disabled)
      setGeo({
        error: null,
        coords: existing.location
      })
      return
    }
    refresh()
  }, [])

  const enable = () => {
    setDisabled(false)
    storage.geolocation.set({
      location: geo.coords!,
      disabled: false
    })
  }

  const disable = () => {
    setDisabled(true)
    storage.geolocation.set({
      location: geo.coords!,
      disabled: true
    })
  }

  // Ready if the abstract hook has produced data
  // and the geo has produced coords without an
  // error
  return {
    refresh,
    disable,
    enable,
    disabled,
    coords: geo.coords,
    error: geo.error,
    // city: abs.data?.city ?? null,
    // state: abs.data?.region ?? null,
    ready: !geo.error && !!geo.coords
  }
}

const getBrowserLocation = async (): Promise<t.GeoLocation> => {
  return new Promise((res, rej) => {
    const handlePosition: PositionCallback = (position) => {
      const location: t.GeoLocation = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }
      res(location)
    }
    const handleError: PositionErrorCallback = (err) => {
      rej(err)
    }
    navigator.geolocation.getCurrentPosition(handlePosition, handleError, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 1000 * 60 * 30
    })
  })
}