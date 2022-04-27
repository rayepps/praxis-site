import type { NextPage, NextPageContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Footer from 'src/components/ui/Footer'
import Header from 'src/components/ui/Header'
import HomeScene from 'src/scenes/Home'
import * as t from 'src/types'
import graphcms from 'src/graphcms'
import Meta from 'src/Meta'
import MarketingPrompts from 'src/components/MarketingPrompts'
import { useEffect } from 'react'

const Shop: NextPage = () => {
  useEffect(() => {
    (window as any).xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-73541899");
  }, [])
  return (
    <>
      <Head>
        <Meta
          title='Praxis | Shop'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <Header />
      <div id="my-store-73541899"></div>
      <div>
      <script id="testix" data-cfasync="false" type="text/javascript" src="https://app.ecwid.com/script.js?73541899&data_platform=code&data_date=2022-03-19" charSet="utf-8"></script>
      </div>
      <MarketingPrompts />
    </>
  )
}

export default Shop