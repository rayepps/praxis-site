import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import SearchScene from '../src/components/scenes/Search'
import MarketingPrompts from 'src/components/MarketingPrompts'
import Meta from 'src/Meta'

const TrainingPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Tactical Training'
          description='Search the best tactical, survival, and medical training courses in the USA.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head >
      <Header links='about' />
      <SearchScene />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default TrainingPage
