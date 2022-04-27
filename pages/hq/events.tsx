import type { NextPage } from 'next'
import Head from 'next/head'
import AdminEventsScene from 'src/scenes/Admin/Events'
import Meta from 'src/Meta'
import AdminHeader from 'src/components/ui/admin/AdminHeader'

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Admin | Events'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      {/* <AdminHeader /> */}
      <AdminEventsScene />
    </>
  )
}

export default AdminLoginPage
