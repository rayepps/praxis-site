import type { NextPage } from 'next'
import Head from 'next/head'
import AdminDashboardScene from 'src/scenes/Admin/Dashboard'
import Meta from 'src/Meta'
import AdminHeader from 'src/components/ui/admin/AdminHeader'

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Admin | Dashboard'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <AdminHeader />
      <AdminDashboardScene />
    </>
  )
}

export default AdminLoginPage
