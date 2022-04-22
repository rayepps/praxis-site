import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Footer from '../../src/components/ui/Footer'
import Header from '../../src/components/ui/Header'
import * as t from '../../src/types'
import api from '../../src/api'
import Meta from 'src/Meta'
import EventDetailScene from 'src/components/scenes/EventDetail'

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const slug = (context.params?.['slug'] as string) ?? ''
  const { error, data } = await api.events.findBySlug({ slug })
  if (error) {
    // TODO: Handle error
    console.error(error)
  }
  return {
    props: {
      event: data.event
    }
  }
}

type Props = {
  event: t.Event
}

const EventPage: NextPage<Props> = ({ event }) => {
  const thumbnailUrl = (() => {
    if (event.images?.length > 0) {
      return event.images[0].url
    }
    if (event.training.thumbnail) {
      return event.training.thumbnail.url
    }
    return 'https://praxisco.us/fallback-preview.jpg'
  })()
  return (
    <>
      <Head>
        <title>
          {event.name} with {event.training.company.name}
        </title>
        <Meta
          title={event.training.name}
          description={`Signup for ${event.name} with ${event.training.company.name}`}
          thumbnailUrl={thumbnailUrl}
        />
      </Head>
      <Header links={['about', 'search-all']} />
      <EventDetailScene event={event} />
      <Footer />
    </>
  )
}

export default EventPage
