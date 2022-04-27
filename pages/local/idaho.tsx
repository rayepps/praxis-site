import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import SearchScene from 'src/scenes/Search'
import MarketingPrompts from 'src/components/MarketingPrompts'
import Meta from 'src/Meta'

const IdahoLocationPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title="Idaho Tactical Trainings"
          description="Search tactical, survival, and medical trainings in Idaho"
          thumbnailUrl="https://praxisco.us/preview.png"
        />
      </Head>
      <Header links='search-all' />
      <SearchScene
        thumbnail="/locations/idaho-flag.png"
        title="Training in Idaho"
        info={`
          Tier one tactical, medical, and survival training in the great state of Idaho. New events
          added every week.
        `}
        filters={['company', 'tags', 'type', 'date']}
        overrides={{
          state: 'ID'
        }}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default IdahoLocationPage
