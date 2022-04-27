import type { NextPage } from 'next'
import Head from 'next/head'
import AdminTrainingsScene from 'src/scenes/Admin/Trainings'
import Meta from 'src/Meta'
import AdminHeader from 'src/components/ui/admin/AdminHeader'

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Admin | Trainings'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      {/* <AdminHeader /> */}
      <AdminTrainingsScene />
    </>
  )
}

export default AdminLoginPage
