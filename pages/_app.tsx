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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300400600700900&display=swap"
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
