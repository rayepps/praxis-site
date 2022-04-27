import type { NextPage } from 'next'
import Head from 'next/head'
import AdminLoginScene from 'src/scenes/Admin/Login'
import Meta from 'src/Meta'
import AdminHeader from 'src/components/ui/admin/AdminHeader'

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title='Praxis Admin | Login'
          description='Tactical, survival, and medical trainings from companies across the US. Organized and searchable.'
          thumbnailUrl='https://praxisco.us/preview.png'
        />
      </Head>
      <AdminHeader />
      <AdminLoginScene />
    </>
  )
}

export default AdminLoginPage
