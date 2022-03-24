import { useState, useEffect } from 'react'
import storage from 'src/local-storage'
import * as t from 'src/types'
import abstract, { AbstractData } from 'src/abstract'
import addDays from 'date-fns/addDays'

const SESSION_DURATION_DAYS = 2

const useTrackedSession = (): [t.TrackedSession | null, {
  recordSubscription: (sub: t.Subscription) => void
  dismissPrompt: (key: t.SubscriptionKey) => void
}] => {
  const [session, setSession] = useState<t.TrackedSession | null>(null)
  useEffect(() => {
    const existing = storage.session.get()
    if (!existing?.timestamp) {
      createSession().then(newSession => {
        setSession(newSession)
        storage.session.set(newSession)
      })
      return
    }
    const now = new Date()
    const isExpired = now.getTime() >= existing.expiration
    if (!isExpired) {
      setSession(existing)
      return
    }
    resetSession(existing).then(newSession => {
      setSession(newSession)
      storage.session.set(newSession)
    })
  }, [])
  const resetSession = async (existing: t.TrackedSession): Promise<t.TrackedSession> => {
    const data = await abstract.inquire()
    const updatedSession: t.TrackedSession = {
      ...existing,
      timestamp: new Date().getTime(),
      expiration: addDays(new Date(), SESSION_DURATION_DAYS).getTime(),
      metadata: data ? abstractDataToMetadata(data) : null,
      prompted: []
    }
    return updatedSession
  }
  const createSession = async (): Promise<t.TrackedSession> => {
    const data = await abstract.inquire()
    const newSession: t.TrackedSession = {
      contactId: null,
      timestamp: new Date().getTime(),
      expiration: addDays(new Date(), SESSION_DURATION_DAYS).getTime(),
      subscriptions: [],
      metadata: data ? abstractDataToMetadata(data) : null,
      prompted: []
    }
    return newSession
  }
  const abstractDataToMetadata = (data: AbstractData): t.ContactMetadata => ({
    ipAddress: data.ip_address,
    city: data.city,
    state: data.region,
    stateCode: data.region_iso_code,
    country: data.country,
    countryCode: data.country_code,
    longitude: data.longitude,
    latitude: data.latitude,
    tz: data.timezone?.name,
    tzAbbreviation: data.timezone?.abbreviation,
    utcOffset: data.timezone?.gmt_offset,
    dst: data.timezone?.is_dst,
  })
  const changes = {
    recordSubscription: (sub: t.Subscription) => {
      if (!session) return
      const updatedSession: t.TrackedSession = {
        ...session,
        timestamp: new Date().getTime(),
        expiration: addDays(new Date(), SESSION_DURATION_DAYS).getTime(),
        subscriptions: [...session.subscriptions, sub]
      }
      storage.session.set(updatedSession)
      setSession(updatedSession)
    },
    dismissPrompt: (key: t.SubscriptionKey) => {
      if (!session) return
      const alreadySubscribed = session.subscriptions.find(s => s.key === key)
      if (alreadySubscribed) {
        return
      }
      const updatedSession: t.TrackedSession = {
        ...session,
        timestamp: new Date().getTime(),
        expiration: addDays(new Date(), SESSION_DURATION_DAYS).getTime(),
        prompted: [...session.prompted, {
          timestamp: new Date().getTime(),
          key
        }]
      }
      storage.session.set(updatedSession)
      setSession(updatedSession)
    }
  }
  return [session, changes]
}

export default useTrackedSession
