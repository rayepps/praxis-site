import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HiOutlineLocationMarker, HiArrowNarrowRight, HiOutlineTag, HiOutlineBell, HiOutlineCash, HiOutlinePencil } from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from 'src/types'
import AdminSidebar from 'src/components/ui/admin/AdminSidebar'
import { toaster } from 'evergreen-ui'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'

export default function AdminTrainingsScene() {
  const listTrainingsRequest = useFetch(api.trainings.search)
  const listTrainings = async () => {
    const { error } = await listTrainingsRequest.fetch({
      order: 'created-at:asc'
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
  }
  useEffect(() => {
    listTrainings()
  }, [])
  return (
    <div className="flex flex-row bg-slate-100">
      <AdminSidebar />
      <div className="grow rounded-tl-2xl bg-white">
        
          <h1 className="font-black text-4xl pl-10 pt-10 mb-4">Trainings</h1>
          <TrainingsTable
            trainings={listTrainingsRequest.data?.trainings ?? []}
            loading={listTrainingsRequest.loading}
          />
        
      </div>
    </div>
  )
}

const TrainingsTable = ({ 
  trainings, 
  loading
}: { trainings: t.Training[]; loading: boolean }) => {
  const handleAllCheck = () => {

  }
  const handleCheck = (training: t.Training) => () => {

  }
  const gotoTraining = (training: t.Training) => () => {

  }
  return (
    <table className="w-full">
      <thead className="border-y border-slate-100">
        <tr>
          <td className="border-r border-slate-100 py-4 pl-4 pr-2">
            <input type="checkbox" onChange={handleAllCheck} />
          </td>
          <td className="border-r border-slate-100 p-4 font-bold">Title</td>
          <td className="border-r border-slate-100 p-4 font-bold">Images</td>
          <td className="border-r border-slate-100 p-4 font-bold">Price</td>
          <td className="border-r border-slate-100 p-4 font-bold">Scheduled</td>
          <td className="border-r border-slate-100 p-4 font-bold">Company</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
      {trainings.map((training, idx) => (
          <>
            <tr className={`border-b border-slate-100 ${idx % 2 === 0 && 'bg-slate-50'}`}>
              <td className="py-4 pl-4 pr-2 border-r border-slate-100">
                <input type="checkbox" onChange={handleCheck(training)} />
              </td>
              <td className="p-4 border-r border-slate-100">
                <Link href={`/hq/trainings/${training.id}`} passHref>
                  <a className="hover:underline">{training.name}</a>
                </Link>
              </td>
              <td className="p-4 border-r border-slate-100">
                <div
                  className="flex flex-row overflow-x-scroll"
                >
                  {training.gallery.map((image) => (
                    <img key={image.url} className="h-7 w-auto rounded-sm mr-4" src={image.url} />  
                  ))}
                </div>
              </td>
              <td className="p-4 border-r border-slate-100">
                {training.appointmentOnly && (`${training.displayPrice}/${training.priceUnit === 'per_hour' ? 'hour' : 'course'}`)}
                {!training.appointmentOnly && training.displayPrice}
              </td>
              <td className="p-4 border-r border-slate-100">
                {training.appointmentOnly && (
                  <div className="py-1 px-2 text-xs font-bold text-yellow-800 bg-yellow-100 rounded-sm inline-block">by-appointment</div>
                )}
                {!training.appointmentOnly && (
                  <div className="py-1 px-2 text-xs font-bold text-slate-800 bg-slate-100 rounded-sm inline-block">by-event</div>
                )}
              </td>
              <td className="p-4 border-r border-slate-100">
                <Link href={`/hq/companies/${training.id}`} passHref>
                  <a className="hover:underline">{training.company.name}</a>
                </Link>
              </td>
              <td className="py-4 pl-4 pr-1">
                <button className="rounded bg-slate-100 p-2 group hover:bg-black" onClick={gotoTraining(training)}>
                  <HiOutlinePencil className="text-slate-500 group-hover:text-white" />
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}
