import { useEffect } from 'react'
import TinySubscribeToAlertsModal from 'src/components/modals/TinySubscribeToAlertsModal'
import { useRecoilState } from 'recoil'
import { subscribeModalOpenState } from 'src/state/app'
import { toaster } from 'evergreen-ui'
import useAnalytics from '../hooks/useAnalytics'
import useFetch from '../hooks/data-store/useFetch'
import api from 'src/api'
import useLocalSession from 'src/hooks/useLocalSession'

export default function MarketingPrompts () {
  const [isOpen, setIsOpen] = useRecoilState(subscribeModalOpenState)
  const session = useLocalSession()
  const analytics = useAnalytics()
  const addContactRequest = useFetch(api.marketing.addContact)

  useEffect(() => {
    if (!session.isPersisted) return
    initNewEventSubscriptionPrompt()
  }, [session.isPersisted])

  const initNewEventSubscriptionPrompt = () => {
    const alreadySubscribed = session.find('user.subscribed.new-event-alerts')
    if (alreadySubscribed) {
      return
    }
    const alreadyPrompted = session.find('user.declined.new-event-alerts')
    if (alreadyPrompted) {
      return
    }
    setTimeout(() => {
      setIsOpen(true)
    }, 5000)
  }
  const subscribe = async (email: string) => {
    const { error, data } = await addContactRequest.fetch({ 
      email, 
      source: 'site.subscribe.popup' 
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    analytics?.track_alerts_subscription({
      contact_id: data.contact.id,
    })
    session.record('user.subscribed.new-event-alerts', {
      email, 
      phone: null
    })
  }
  const dismissModal = () => {
    analytics?.track_dismiss_alerts_subscription({
      contact_id: session?.contactId ?? null
    })
    session.record('user.declined.new-event-alerts', {
      prompt: 'unsure'
    }, '14 days')
    setIsOpen(false)
  }
  return (
    <>
      <TinySubscribeToAlertsModal
        open={isOpen}
        subscribed={!!session.find('user.subscribed.new-event-alerts')}
        loading={addContactRequest.loading}
        onSubmit={subscribe}
        onClose={dismissModal}
      />
    </>
  )
}