import { useState, useEffect, ReactNode, memo } from 'react'
import createAnalytics, { PraxisAnalytics } from 'src/analytics'
import { Analytics, AnalyticsBrowser } from '@segment/analytics-next'
import storage from 'src/local-storage'
import config from 'src/config'
import TinySubscribeToAlertsModal from 'src/components/modals/TinySubscribeToAlertsModal'
import { useRecoilState } from 'recoil'
import { subscribeModalOpenState } from 'src/state/app'
import * as t from 'src/types'
import abstract, { AbstractData } from 'src/abstract'
import addDays from 'date-fns/addDays'
import { toaster } from 'evergreen-ui'
import useAnalytics from '../hooks/useAnalytics'
import useFetch from '../hooks/data-store/useFetch'
import api from 'src/api'
import useTrackedSession from 'src/hooks/useTrackedSession'

export default function MarketingPrompts () {
  const [isOpen, setIsOpen] = useRecoilState(subscribeModalOpenState)
  const [session, changeSession] = useTrackedSession()
  const analytics = useAnalytics()
  const addContactRequest = useFetch(api.marketing.addContact)

  useEffect(() => {
    if (!session) return
    initPrompts()
  }, [session?.timestamp])

  const initPrompts = () => {
    initNewEventSubscriptionPrompt()
  }
  const initNewEventSubscriptionPrompt = () => {
    const alreadySubscribed = session?.subscriptions?.find(s => s.key === 'new-event-alerts')
    if (alreadySubscribed) {
      return
    }
    const alreadyPrompted = session?.prompted?.find(s => s.key === 'new-event-alerts')
    if (alreadyPrompted) {
      return
    }
    setTimeout(() => {
      setIsOpen(true)
    }, 5000)
  }
  const subscribe = async (email: string) => {
    const { error, data } = await addContactRequest.fetch({ email, source: 'site.subscribe.popup' })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    analytics?.track_alerts_subscription({
      ...session!.metadata!,
      contact_id: data.contact.id,
    })
    changeSession.recordSubscription({
      timestamp: new Date().getTime(),
      key: 'new-event-alerts',
      email
    })
  }
  const dismissModal = () => {
    analytics?.track_dismiss_alerts_subscription({
      ...session!.metadata!,
      contact_id: session?.contactId ?? null
    })
    changeSession.dismissPrompt('new-event-alerts')
    setIsOpen(false)
  }
  return (
    <>
      <TinySubscribeToAlertsModal
        open={isOpen}
        subscribed={!!session?.subscriptions.find(s => s.key === 'new-event-alerts')}
        loading={addContactRequest.loading}
        onSubmit={subscribe}
        onClose={dismissModal}
      />
    </>
  )
}
