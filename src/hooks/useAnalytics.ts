import { useState, useEffect } from 'react'
import { Analytics, AnalyticsBrowser } from '@segment/analytics-next'

declare global {
  interface Window {
    segment_analytics: Analytics
  }
}

const PendingQueue = (): Pick<Analytics, 'track'> & { tracks: () => any[][] } => {
  const tracks: Record<number, any> = {}
  return {
    track: async (...args: any[]): Promise<any> => {
      tracks[Object.keys(tracks).length] = args
      return
    },
    tracks: () => Object.values(tracks)
  }
}

export const useAnalytics = (): Pick<Analytics, 'track'> => {
  const [analytics, setAnalytics] = useState<Pick<Analytics, 'track'>>(PendingQueue())
  useEffect(() => {
    load()
  }, [])
  const load = async () => {
    if ((analytics as any).initialized === true) return
    if (window.segment_analytics) {
      setAnalytics(window.segment_analytics)
      return
    }
    const [a] = await AnalyticsBrowser.load({ writeKey: 'H0jLU0Du35HX6AqumOMYjw0AcBsHLNc0' })
    window.segment_analytics = a
    for (const args of (analytics as ReturnType<typeof PendingQueue>).tracks()) {
      console.log('x--> backtracking: ', { args })
      a.track.apply(null, args as any)
    }
    setAnalytics(a)
  }
  return analytics
}

export default useAnalytics
