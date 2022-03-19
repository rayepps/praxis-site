import { Analytics as SegmentAnalytics, AnalyticsBrowser } from '@segment/analytics-next'
import * as t from 'src/types'

const track = <T>(key: string, analytics: SegmentAnalytics, mapper: (arg: T) => any) => {
  return (data: T) => {
    analytics.track({
      event: key,
      type: 'track',
      properties: mapper(data)
    })
  }
}

export const makeAnalytics = (analytics: SegmentAnalytics) => ({
  track_event_viewed: track('user.viewed.event', analytics, (event: t.Event) => ({
    event_id: event.id,
    event_name: event.name,
    company_id: event.training.company.id,
    company_name: event.training.company.name,
    domain: new URL(event.training.company.directLink).hostname,
    training_id: event.training.id,
    training_name: event.training.name
  })),
  track_alerts_subscription: track('user.subscribed.event-alerts', analytics, (data: t.ContactMetadata & { contact_id: string }) => data)
})

export type PraxisAnalytics = ReturnType<typeof makeAnalytics>

export default makeAnalytics
