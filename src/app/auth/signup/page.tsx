'use client'

import Button from '@/components/Button'
import LoadingModal from '@/components/LoadingModal'
import PasswordInput from '@/components/PasswordInput'
import TextField from '@/components/TextField'
import { isLoggedAtom } from '@/store/auth.store'
import { userAtom } from '@/store/user.store'
import { SignupPayload } from '@/types/user.type'
import { notify } from '@/utils/notify'
import { isValidEmail, isValidString } from '@/utils/validations'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useState } from 'react'
import EmailIcon from '../../../../public/icons/EmailIcon'
import LockIcon from '../../../../public/icons/LockIcon'
import CardLayout from '../CardLayout'

const Signup = () => {
  const setIsLogged = useSetAtom(isLoggedAtom)
  const setUser = useSetAtom(userAtom)

  const [payload, setPayload] = useState<Partial<SignupPayload>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<keyof SignupPayload, boolean>>({
    email: false,
    password: false,
    userName: false,
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

    const errors = {
      email: !isValidEmail(payload.email || ''),
      password: !isValidString(payload.password),
      userName: !isValidString(payload.userName),
    }
    setErrors(errors)

    if (Object.values(errors).some(Boolean)) {
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
      setUser(rest)
      setLoading(false)
    }, 3000)
  }

  return (
    <>
      <CardLayout
        title='Create Account'
        description={`Let's get you started sharing your links!`}
      >
        <form className='flex flex-col gap-4'>
          <TextField
            label='Email'
            placeholder='e.g. alex@email.com'
            startIcon={<EmailIcon />}
            value={payload.email}
            name='email'
            onChange={handleChange}
            disabled={loading}
            error={errors.email}
            errorMessage={!isValidString(payload.email) ? `Can't be empty` : 'Invalid email'}
          />
          <TextField
            label='Username'
            placeholder='Username'
            startIcon={<EmailIcon />}
            value={payload.userName}
            name='userName'
            onChange={handleChange}
            disabled={loading}
            error={errors.userName}
            errorMessage={`Can't be empty`}
          />
          <PasswordInput
            label='Password'
            placeholder='At least 8 characters'
            startIcon={<LockIcon />}
            value={payload.password}
            name='password'
            onChange={handleChange}
            disabled={loading}
            error={errors.password}
            errorMessage={`Can't be empty`}
          />

          <p className='text-xs text-gray mt-4'>Password must cotain at least 8 characters</p>

          <Button
            className='mt-4'
            type='submit'
            onClick={handleClick}
            disabled={loading}
            loading={loading}
          >
            Create new account
          </Button>

          <p className='text-sm text-gray self-center flex flex-col items-center tablet:block'>
            Already have an account? &nbsp;
            <Link
              href='/auth/login'
              className='text-purple-main font-medium hover:text-purple-light transition-colors'
            >
              Login
            </Link>
          </p>
        </form>
      </CardLayout>

      <LoadingModal open={loading} />
    </>
  )
}

export default Signup
