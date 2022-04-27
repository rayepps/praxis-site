import type { NextPage, NextPageContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import AboutScene from 'src/scenes/About'
import * as t from 'src/types'
import graphcms from 'src/graphcms'
import Meta from 'src/Meta'
import MarketingPrompts from 'src/components/MarketingPrompts'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Tactical Training | About'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header links='trainings' />
      <AboutScene />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default Home
