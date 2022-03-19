import type { NextPage, NextPageContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import RecentlyPublishedScene from '../src/components/scenes/RecentlyPublished'
import * as t from '../src/types'
import graphcms from '../src/graphcms'
import Meta from 'src/Meta'
import api from 'src/api'
import MarketingPrompts from 'src/components/MarketingPrompts'

export async function getStaticProps(context: NextPageContext): Promise<GetStaticPropsResult<Props>> {
  const response = await api.events.recentlyPublished({ limit: 50 })
  return {
    props: {
      events: response.data.events
    },
    revalidate: 60 * 1 // every 1 minutes
  }
}

type Props = {
  events: t.Event[]
}

const Home: NextPage<Props> = ({ events }) => {
  return (
    <>
      <Head>
        <Meta
          title='Recently Added Events'
          description='The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header />
      <RecentlyPublishedScene 
        events={events}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default Home
