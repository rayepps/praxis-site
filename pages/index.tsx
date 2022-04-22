import type { NextPage, NextPageContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import HomeScene from '../src/components/scenes/Home'
import * as t from '../src/types'
import graphcms from '../src/graphcms'
import Meta from 'src/Meta'
import MarketingPrompts from 'src/components/MarketingPrompts'

export async function getStaticProps(context: NextPageContext): Promise<GetStaticPropsResult<Props>> {
  const featuredEvents = await graphcms.listFeaturedEvents()
  const stateTrainingCounts = await graphcms.lookupStateTrainingCount()
  return {
    props: {
      featuredEvents,
      stateTrainingCounts
    },
    revalidate: 60 * 60 // 1 hour
  }
}

type Props = {
  featuredEvents: t.Event[]
  stateTrainingCounts: Record<string, number>
}

const Home: NextPage<Props> = ({ featuredEvents, stateTrainingCounts }) => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Tactical Training'
          description='The best tactical, survival, and medical training courses in the USA. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header links={['about', 'trainings']} />
      <HomeScene
        featuredEvents={featuredEvents}
        stateTrainingCounts={stateTrainingCounts}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default Home
