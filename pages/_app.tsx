import Head from 'next/head'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import np from 'nprogress'

import 'src/styles/tailwind.css'
import 'src/styles/index.css'
import 'src/styles/nprogress.css'

Router.events.on('routeChangeStart', () => np.start())
Router.events.on('routeChangeComplete', () => np.done())
Router.events.on('routeChangeError', () => np.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <script defer data-domain="praxisco.us" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
