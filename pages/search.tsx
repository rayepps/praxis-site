import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import SearchScene from '../src/components/scenes/Search'
import MarketingPrompts from 'src/components/MarketingPrompts'

const SearchPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Search Trainings</title>
        <meta
          name="description" 
          content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head >
      <Header showTrainingsLink={false} />
      <SearchScene />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default SearchPage
