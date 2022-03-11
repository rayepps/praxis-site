import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import HomeScene from '../src/components/scenes/Home'
import * as t from '../src/types'
import graphcms from '../src/graphcms'

export async function getStaticProps(context: NextPageContext) {
  // const popularTrainings = await graphcms.listFeaturedTrainings()
  // const featuredTags = await graphcms.listFeaturedTags()
  const featuredEvents = await graphcms.listFeaturedEvents()
  console.log(featuredEvents)
  return {
    props: {
      // popularTrainings,
      featuredEvents,
      // featuredTags
    }
  }
}

const Home: NextPage<{
  popularTrainings: t.Training[]
  featuredTags: t.FeatureTag[]
  featuredEvents: t.Event[]
}> = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <title>Praxis | Tactical &amp; Apparel</title>
        <meta
          name="description"
          content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomeScene 
        featuredEvents={featuredEvents}
      />
      <Footer />
    </>
  )
}

export default Home
