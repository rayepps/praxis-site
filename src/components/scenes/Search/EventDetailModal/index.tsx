import Modal from 'src/components/ui/Modal'
import EventDetailScene from 'src/components/scenes/EventDetail'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentEventIdState, currentEventSelector } from 'src/state/events'

export default function EventDetailModal() {
  const setCurrentEventId = useSetRecoilState(currentEventIdState)
  const event = useRecoilValue(currentEventSelector)

  const closeModal = () => {
    setCurrentEventId(null)
  }

  if (!event) return null

  return (
    <Modal open onClose={closeModal} title={event.training.name}>
      <EventDetailScene event={event} onClose={closeModal} />
    </Modal>
  )
}
