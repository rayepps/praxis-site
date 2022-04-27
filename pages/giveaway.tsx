import type { NextPage, NextPageContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import GiveawayScene from 'src/scenes/Giveaway'
import * as t from 'src/types'
import graphcms from 'src/graphcms'
import Meta from 'src/Meta'
import MarketingPrompts from 'src/components/MarketingPrompts'
import api from 'src/api'

// export async function getStaticProps(context: NextPageContext): Promise<GetStaticPropsResult<Props>> {
//   const { error, data } = await api.marketing.getActiveGiveaway({})
//   if (error) {
//     console.error(error)
//   }
//   return {
//     props: {
//       giveaway: data.giveaway
//     }
//   }
// }

type Props = {
  giveaway: t.Giveaway | null
}

const Giveaway: NextPage<Props> = ({ giveaway }) => {
  return (
    <>
      <Head>
        <Meta
          title={`Praxis ${giveaway?.name ?? 'Giveaway'}`}
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header />
      <GiveawayScene
        giveaway={giveaway}
      />
      <Footer />
      <MarketingPrompts />
    </>
  )
}

export default Giveaway