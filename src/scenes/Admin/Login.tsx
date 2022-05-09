import { KeyboardEventHandler, useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineLocationMarker,
  HiArrowNarrowRight,
  HiOutlineTag,
  HiOutlineBell,
  HiOutlineCash
} from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from 'src/types'
import { useFormation } from 'src/hooks/useFormation'
import * as yup from 'yup'
import { toaster } from 'evergreen-ui'
import { useRouter } from 'next/router'
import storage from 'src/local-storage'

export default function AdminLoginScene() {

  const router = useRouter()
  const loginRequest = useFetch(api.auth.login)
  const form = useFormation({
    email: yup.string().email().required(),
    password: yup.string().required()
  }, {
    email: '',
    password: ''
  })

  const submit = async (formData: { email: string, password: string }) => {
    const { error, data } = await loginRequest.fetch({
      email: formData.email,
      password: formData.password
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    storage.token.set(data.idToken)
    router.push('/hq/dashboard')
  }

  const submitHandler = form.createHandler(submit)

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') submitHandler()
  }

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-slate-50">
      <div className="bg-white p-8 my-20 rounded-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
        <div className="mb-4">
          <input 
            className="border border-black rounded p-2 w-full"
            disabled={loginRequest.loading}
            placeholder="ray@unishine.dev" 
            {...form.register('email')}
          />
          {form.errors.email?.message && (
            <span className="text-red-700 text-small">{form.errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input 
            className="border border-black rounded p-2 w-full"
            disabled={loginRequest.loading}
            placeholder="**********"
            onKeyUp={handleKeyUp}
            {...form.register('password')}
          />
          {form.errors.password?.message && (
            <span className="text-red-700 text-small">{form.errors.password.message}</span>
          )}
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded" 
          disabled={loginRequest.loading}
          onClick={submitHandler}
        >
          Login
        </button>
      </div>
    </div>
  )
}
