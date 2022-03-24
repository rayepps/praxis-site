import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import SearchScene from 'src/components/scenes/Search'
import MarketingPrompts from 'src/components/MarketingPrompts'
import Meta from 'src/Meta'

const IdahoLocationPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Search Idaho Tactical Trainings'
          description='Search tactical, survival, and medical trainings from companies in Idaho'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head >
      <Header showTrainingsLink dark trainingLinkLabel='View All Trainings' />
      <SearchScene
        thumbnail='/locations/idaho-square-color.jpg'
        title='Idaho Tactical Training'
        info={`
          Tier one tactical, medical, and survival training in the great state of Idaho. New events and events
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
