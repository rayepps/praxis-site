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
  return {
    props: {
      featuredEvents
    },
    revalidate: 60 * 60 // 1 hour
  }
}

type Props = {
  featuredEvents: t.Event[]
}

const Home: NextPage<Props> = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis | Tactical &amp; Apparel'
          description='The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header />
      <HomeScene 
        featuredEvents={featuredEvents}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default Home
