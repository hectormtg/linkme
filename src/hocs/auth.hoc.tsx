'use client'

import LoadingModal from '@/components/LoadingModal'
import { useAuthentication } from '@/hooks/auth.hooks'
import { isLoggedAtom } from '@/store/auth.store'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { ComponentType, FC } from 'react'

export const withAuthentication = (
  WrappedComponent: ComponentType,
  LoadingComponent?: ComponentType
): ComponentType => {
  const AuthorizedComponent: FC = props => {
    const router = useRouter()
    const { loading: authLoading } = useAuthentication()
    const isLogged = useAtomValue(isLoggedAtom)
    // const userId = authResponse?.userId || ''
    // const { loading: userLoading, response: userResponse } = useProfile(userId)

    // const isAuthErrored = !authLoading && !authResponse
    // const isLoading = authLoading || userLoading

    if (authLoading) {
      return LoadingComponent ? <LoadingComponent {...props} /> : <LoadingModal open />
    }

    // const user = userResponse

    const isInBrowser = typeof window !== 'undefined'
    if (isInBrowser) {
      if (!authLoading && !isLogged) {
        router.replace('/auth/login')
      }
    }

    return <WrappedComponent {...props} />
  }

  return AuthorizedComponent
}

export const withoutAuthentication = (WrappedComponent: ComponentType): ComponentType => {
  const UnauthorizedComponent: FC = props => {
    const isLogged = useAtomValue(isLoggedAtom)
    const router = useRouter()
    const { loading } = useAuthentication()
    // const accessToken = response?.accessToken || ''
    const isInBrowser = typeof window !== 'undefined'

    if (isInBrowser && !loading && isLogged) {
      router.replace('/')
    }

    return <WrappedComponent {...props} />
  }
  return UnauthorizedComponent
}
