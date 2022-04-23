import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Footer from '../../src/components/ui/Footer'
import Header from '../../src/components/ui/Header'
import * as t from '../../src/types'
import api from '../../src/api'
import Meta from 'src/Meta'
import TrainingDetailScene from 'src/components/scenes/TrainingDetail'

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const slug = (context.params?.['slug'] as string) ?? ''
  const { error, data } = await api.trainings.findBySlug({ slug })
  if (error) {
    // TODO: Handle error
    console.error(error)
  }
  return {
    props: {
      training: data.training
    }
  }
}

type Props = {
  training: t.Training
}

const EventPage: NextPage<Props> = ({ training }) => {
  const thumbnailUrl = (() => {
    if (training.thumbnail) {
      return training.thumbnail.url
    }
    if (training.gallery?.length > 0) {
      return training.gallery[0].url
    }
    if (training.company.thumbnail) {
      return training.company.thumbnail.url
    }
    return 'https://praxisco.us/fallback-preview.jpg'
  })()
  return (
    <>
      <Head>
        <title>
          {training.name} with {training.company.name}
        </title>
        <Meta
          title={training.name}
          description={`Signup for ${training.name} with ${training.company.name}`}
          thumbnailUrl={thumbnailUrl}
        />
      </Head>
      <Header links={['about', 'search-all']} />
      <TrainingDetailScene training={training} />
      <Footer />
    </>
  )
}

export default EventPage
