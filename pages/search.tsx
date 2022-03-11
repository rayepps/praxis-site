import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../src/components/ui/Footer'
import Header from '../src/components/ui/Header'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import SearchScene from '../src/components/scenes/Search'

// const DynamicComponentWithNoSSR = dynamic(() => import(''), {
//   ssr: false
// })

const SearchPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Praxis | Trainings</title>
        <meta
          name="description" 
          content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head >
      <Header showTrainingsLink={false} />
      <SearchScene />
      <Footer />
      {/* <Script strategy="lazyOnload" type="text/javascript"  src="https://apiv2.popupsmart.com/api/Bundle/373333" async /> */}
    </>
  )
}

export default SearchPage
