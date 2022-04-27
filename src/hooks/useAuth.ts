import { useState, useEffect } from 'react'
import storage from 'src/local-storage'

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)

  const loadToken = () => {
    const tokenInStorage = storage.token.get()
    if (!tokenInStorage) return
    setToken(tokenInStorage)
  }

  useEffect(() => {
    loadToken()
  }, [])

  return {
    token,
    refresh: loadToken
  }
}
