import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import SearchScene from 'src/components/scenes/Search'
import MarketingPrompts from 'src/components/MarketingPrompts'
import Meta from 'src/Meta'

const CaliLocationPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='California Tactical Trainings'
          description='Tactical, survival, and medical trainings in California'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head >
      <Header links='search-all' />
      <SearchScene
        thumbnail='/locations/cali-flag.webp'
        title='Training in California'
        info={`
          Tier one tactical, medical, and survival training in the state of California. New events
          added every week.
        `}
        filters={['company', 'tags', 'type', 'date']}
        overrides={{
          state: 'CA'
        }}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default CaliLocationPage
