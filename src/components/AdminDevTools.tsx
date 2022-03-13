import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function AdminDevTools() {
  const [state, setState] = useState({
    isAdmin: false,
    skipCache: false
  })

  useEffect(() => {
    setState({
      isAdmin: localStorage.getItem('px.is-dev-admin') === 'yes',
      skipCache: localStorage.getItem('px.dev-tools.skip-cache') === 'yes'
    })
  }, [])

  if (!state.isAdmin) {
    return null
  }

  const handleBustCacheChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const shouldSkipCache = event.target.checked
    localStorage.setItem('px.dev-tools.skip-cache', shouldSkipCache ? 'yes' : 'no')
    setState({ ...state, skipCache: shouldSkipCache })
  }

  return (
    <div className="fixed bottom-2 left-2 bg-slate-900 rounded-lg p-4">
      <h4 className="text-slate-100 font-bold text-lg border-b border-b-slate-50 mb-2 pr-6">Admin Tools</h4>
      <div>
        <div className="flex flex-row items-center">
          <input onChange={handleBustCacheChange} checked={state.skipCache} type="checkbox" className="w-4 h-4 border-slate-100" />
          <span className="text-slate-100 block ml-2">Skip Cache</span>
        </div>
      </div>
    </div>
  )
}
