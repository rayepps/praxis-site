import { Wrapper } from '@googlemaps/react-wrapper'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import np from 'nprogress'
import Recoil from 'recoil'
import AdminDevTools from 'src/components/AdminDevTools'
import { useCallback, useEffect } from 'react'
import storage from 'src/local-storage'
import useAnalytics from 'src/hooks/useAnalytics'
import useLocalSession from 'src/hooks/useLocalSession'

import 'src/styles/tailwind.css'
import 'src/styles/index.css'
import 'src/styles/nprogress.css'
import 'src/components/ui/USStatesMapGrid/style.css'

np.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => np.start())
Router.events.on('routeChangeComplete', () => np.done())
Router.events.on('routeChangeError', () => np.done())

const VITE_GOOGLE_MAPS_API_KEY = 'AIzaSyBZSrk3zBYiZdBrAwRgRiwYO7YlLeEbIBk'
declare global {
  interface Window {
    iamadmin: () => void
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const session = useLocalSession()
  const analytics = useAnalytics()
  const trackPage = useCallback(
    (url: string) => {
      if (!session) return
      analytics?.track_page(getPageKey(url))
    },
    [analytics, session]
  )
  useEffect(() => {
    router.events.on('routeChangeStart', trackPage)
    return () => {
      router.events.off('routeChangeStart', trackPage)
    }
  }, [analytics, session])
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.iamadmin = () => storage.isAdmin.set(true)
  }, [])
  useEffect(() => {
    if (!analytics) return
    trackPage(window.location.pathname)
  }, [analytics])
  return (
    <>
      <Head>
        <link href="/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        {process.env.NODE_ENV !== 'development' && (
          <script defer data-domain="praxisco.us" src="https://plausible.io/js/plausible.js" />
        )}
      </Head>
      <Wrapper apiKey={VITE_GOOGLE_MAPS_API_KEY}>
        <Recoil.RecoilRoot>
          <Component {...pageProps} />
          <AdminDevTools />
        </Recoil.RecoilRoot>
      </Wrapper>
    </>
  )
}

const getPageKey = (pathname: string) => {
  if (pathname === '/') return 'px.page.home'
  if (pathname === '/about') return 'px.page.about'
  if (pathname === '/search') return 'px.page.search'
  if (pathname === '/training') return 'px.page.search'
  if (pathname === '/new') return 'px.page.recently-published'
  if (pathname.startsWith('/e/')) return 'px.page.event'
  if (pathname.startsWith('/local/')) return 'px.page.local'
  return 'px.page.untracked'
}

export default MyApp
