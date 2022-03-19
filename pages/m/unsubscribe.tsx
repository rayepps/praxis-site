import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Footer from '../../src/components/ui/Footer'
import Header from '../../src/components/ui/Header'
import api from '../../src/api'
import { useFetch } from 'src/hooks'
import { useEffect } from 'react'
import { toaster } from 'evergreen-ui'
import storage from 'src/local-storage'

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  return {
    props: {
      id: context.query.id as string | undefined
    }
  }
}

type Props = {
  id: string | undefined
}

const UnsubscribePage: NextPage<Props> = ({ id }) => {
  const unsubscribeRequest = useFetch(api.marketing.unsubscribe)
  useEffect(() => {
    unsubscribe()
  }, [])
  const unsubscribe = async () => {
    if (!id) {
      return
    }
    const { error } = await unsubscribeRequest.fetch({ id })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
  }
  return (
    <>
      <Head>
        <title>Unsubscribe</title>
      </Head>
      <Header />
      <div>
        <h1>Unsubscribe</h1>
        <p>
          Sorry to see you go. If you found our communications annoying or useless please let me know at{' '}
          <a href="mailto:ray@praxisco.us">ray@praxisco.us</a> or{' '}
          <a href="https://twitter.com/praxiscous">@praxisco.us</a>.
        </p>
        {unsubscribeRequest.loading && <span>Unsubscribing you...</span>}
        {unsubscribeRequest.success && <span>You have been unsubscribed!</span>}
      </div>
      <Footer />
    </>
  )
}

export default UnsubscribePage
