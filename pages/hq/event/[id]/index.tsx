import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import AdminEventDetailScene from 'src/scenes/Admin/EventDetail'
import Meta from 'src/Meta'
import api from 'src/api'
import * as t from 'src/types'

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const id = (context.params?.['id'] as string) ?? ''
  return {
    props: {
      eventId: id
    }
  }
}

type Props = {
  eventId: string
}

const AdminEventDetailPage: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <Meta
          title="Praxis Admin | Event"
          description="Tactical, survival, and medical trainings from companies across the US. Organized and searchable."
          thumbnailUrl="https://praxisco.us/preview.png"
        />
      </Head>
      <AdminEventDetailScene eventId={props.eventId} />
    </>
  )
}

export default AdminEventDetailPage
