'use client'

import Button from '@/components/Button'
import LoadingModal from '@/components/LoadingModal'
import PasswordInput from '@/components/PasswordInput'
import TextField from '@/components/TextField'
import { isLoggedAtom } from '@/store/auth.store'
import { userAtom } from '@/store/user.store'
import { LoginPayload } from '@/types/user.type'
import { notify } from '@/utils/notify'
import { isValidEmail, isValidString } from '@/utils/validations'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useState } from 'react'
import EmailIcon from '../../../../public/icons/EmailIcon'
import LockIcon from '../../../../public/icons/LockIcon'
import CardLayout from '../CardLayout'

const Login = () => {
  const setIsLogged = useSetAtom(isLoggedAtom)
  const setUser = useSetAtom(userAtom)

  const [payload, setPayload] = useState<Partial<LoginPayload>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<keyof LoginPayload, boolean>>({
    email: false,
    password: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setErrors(prev => ({
      ...prev,
      [e.target.name]: false,
    }))
  }

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()

    setErrors({
      email: !isValidEmail(payload.email || ''),
      password: !isValidString(payload.password),
    })

    if (!isValidString(payload.email || '') || !isValidString(payload.password)) {
      notify('Some fields are missing', 'error')
      return
    }

    if (!isValidEmail(payload.email || '')) {
      notify('Invalid email', 'error')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setIsLogged(true)
      const { password, ...rest } = payload
      setUser({ ...rest, userName: (payload.email || '').split('@')[0] })
      setLoading(false)
    }, 3000)
  }

  return (
    <>
      <CardLayout
        title='Login'
        description='Add your details below to get back into the app'
      >
        <form className='flex flex-col gap-4'>
          <TextField
            label='Email'
            placeholder='e.g. alex@email.com'
            startIcon={<EmailIcon />}
            value={payload.email}
            name='email'
            onChange={handleChange}
            error={errors.email}
            errorMessage={
              !isValidString(payload.email)
                ? `Can't be empty`
                : !isValidEmail(payload.email || '')
                  ? 'Invalid email'
                  : ''
            }
          />
          <PasswordInput
            label='Password'
            placeholder='Enter your password'
            startIcon={<LockIcon />}
            value={payload.password}
            name='password'
            onChange={handleChange}
            error={errors.password}
            errorMessage={!isValidString(payload.password) ? `Can't be empty` : ''}
          />

          <Button
            className='mt-4'
            type='submit'
            onClick={handleClick}
          >
            Login
          </Button>

          <p className='text-sm text-gray self-center flex flex-col items-center tablet:block'>
            Don&apos;t have an account? &nbsp;
            <Link
              href='/auth/signup'
              className='text-purple-main font-medium hover:text-purple-light transition-colors'
            >
              Create account
            </Link>
          </p>
        </form>
      </CardLayout>

      <LoadingModal open={loading} />
    </>
  )
}

export default Login
