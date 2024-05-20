import { isLoggedAtom } from '@/store/auth.store'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

export const useAuthentication = () => {
  const isLogged = useAtomValue(isLoggedAtom)

  const [loading, setLoading] = useState<boolean>(!isLogged)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return {
    loading,
  }
}
