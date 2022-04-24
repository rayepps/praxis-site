import _ from 'radash'
import storage from 'src/local-storage'
import * as t from 'src/types'
import addSeconds from 'date-fns/addSeconds'
import useLocalStorageState from './useLocalStorageState'
import DurationFns from 'src/duration-fns'

type SessionFunctions = {
  record: (key: t.UserActivityKey, action?: any, exp?: t.Expiration) => t.SessionActivityEvent
  find: (key: t.UserActivityKey) => t.SessionActivityEvent | null
}

const useLocalSession = (): t.LocalSession & SessionFunctions & { isPersisted: boolean } => {
  const [session, setSession, isPersisted] = useLocalStorageState(storage.session, {
    contactId: null,
    timestamp: Date.now(),
    activity: []
  })

  const isExpired = (event: t.SessionActivityEvent) => {
    if (event.expiration === 'never') return false
    return event.expiresAt! < Date.now()
  }

  const record: SessionFunctions['record'] = (key: t.UserActivityKey, action: any = {}, exp: t.Expiration = 'never') => {
    const event: t.SessionActivityEvent = {
      key,
      timestamp: Date.now(),
      expiration: exp ?? 'never',
      expiresAt: exp === 'never' ? null : addSeconds(new Date(), DurationFns.parse(exp)).getTime(),
      action
    }
    if (!isPersisted) return event
    setSession({
      ...session!,
      activity: _.replaceOrAppend(session?.activity ?? [], event, ev => ev.key === key)
    })
    return event
  }

  const find: SessionFunctions['find'] = (key: t.UserActivityKey): t.SessionActivityEvent | null => {
    if (!isPersisted) return null
    const event = session?.activity.find(ev => ev.key === key)
    if (!event) {
      return null
    }
    if (isExpired(event)) {
      setSession({
        ...session!,
        activity: _.remove(session?.activity ?? [], ev => ev.key === key)
      })
      return null
    }
    return event
  }

  return {
    ...session!,
    isPersisted,
    record,
    find
  }
}

export default useLocalSession
