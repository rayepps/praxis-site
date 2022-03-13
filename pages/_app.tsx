import Head from 'next/head'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import np from 'nprogress'

import 'src/styles/tailwind.css'
import 'src/styles/index.css'
import 'src/styles/nprogress.css'
import Recoil, { useRecoilSnapshot } from 'recoil'
import { useEffect } from 'react'

np.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => np.start())
Router.events.on('routeChangeComplete', () => np.done())
Router.events.on('routeChangeError', () => np.done())

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug('The following atoms were modified:')
    for (const node of (snapshot as any).getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <meta content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." name="description" />
        <meta content="Praxis" property="og:title" />
        <meta content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." property="og:description" />
        <meta content="https://praxisco.us/preview.png" property="og:image" />
        <meta content="Praxis" property="twitter:title" />
        <meta content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." property="twitter:description" />
        <meta content="https://praxisco.us/preview.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="@repsofsunshine" name="twitter:creator" />
        <meta content="The best tactical, survival, and medical trainings from over a hundred companies across the US. Organized and searchable. Start training today." name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script defer data-domain="praxisco.us" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Recoil.RecoilRoot>
        <Component {...pageProps} />
        <DebugObserver />
      </Recoil.RecoilRoot>
    </>
  )
}

export default MyApp
