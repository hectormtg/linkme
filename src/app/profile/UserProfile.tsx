'use client'

import Button from '@/components/Button'
import FileInput from '@/components/FileInput'
import TextField from '@/components/TextField'
import { userAtom } from '@/store/user.store'
import { FilePreview } from '@/types/common.type'
import { User } from '@/types/user.type'
import { notify } from '@/utils/notify'
import { isValidEmail, isValidString } from '@/utils/validations'
import { useAtom } from 'jotai'
import { ChangeEvent, useState } from 'react'
import Section from './Section'

const UserProfile = () => {
  const [user, setUser] = useAtom(userAtom)

  const [payload, setPayload] = useState<Partial<User>>(user)
  const [errors, setErrors] = useState<Partial<Record<keyof User, boolean>>>({})

  const handleSave = () => {
    try {
      const errors = {
        name: !isValidString(payload.name),
        lastName: !isValidString(payload.lastName),
        email: !isValidString(payload.email) || !isValidEmail(payload.email || ''),
      }
      setErrors(errors)
      if (payload.image) {
        setUser({ ...user, image: payload.image })
      }
      if (Object.values(errors).some(Boolean)) throw Error()
      setUser({ ...payload, userName: user.userName })
      notify('Profile info updated', 'success')
    } catch (err) {
      notify('Some fields are missing', 'error')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (isValidString(e.target.value)) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: false,
      }))
    }
  }

  const handleImageChange = (file: FilePreview | undefined) => {
    setPayload(prev => ({
      ...prev,
      image: file?.preview,
    }))
  }

  return (
    <div className='bg-white rounded-xl p-4 flex flex-col flex-grow gap-10 overflow-auto'>
      <section className='flex flex-col gap-2'>
        <h2 className='font-bold text-[32px]'>Profile Details</h2>
        <h3 className='text-gray'>Add your details to create a personal touch to your profile.</h3>
      </section>

      <section className='flex flex-col gap-6 overflow-auto flex-grow'>
        <Section
          items={[
            {
              title: 'Profile Picture',
              content: (
                <FileInput
                  className='bg-white'
                  onFileChange={handleImageChange}
                  value={user.image}
                />
              ),
            },
          ]}
        />

        <Section
          items={[
            {
              title: 'First name*',
              content: (
                <TextField
                  placeholder='e.g. John'
                  onChange={handleChange}
                  name='name'
                  value={payload.name}
                  required
                  error={errors.name}
                  errorMessage={`Can't be empty`}
                />
              ),
            },
            {
              title: 'Last name*',
              content: (
                <TextField
                  placeholder='e.g. Appleseed'
                  onChange={handleChange}
                  name='lastName'
                  value={payload.lastName}
                  required
                  error={errors.lastName}
                  errorMessage={`Can't be empty`}
                />
              ),
            },
            {
              title: 'Email*',
              content: (
                <TextField
                  placeholder='e.g. email@example.com'
                  onChange={handleChange}
                  name='email'
                  value={payload.email}
                  required
                  error={errors.email}
                  errorMessage={!isValidString(payload.email) ? `Can't be empty` : 'Invalid email'}
                />
              ),
            },
          ]}
        />
      </section>

      <section className='border-t border-low-gray pt-4 flex flex-row-reverse'>
        <Button
          onClick={handleSave}
          className='flex-grow md:flex-grow-0'
        >
          Save
        </Button>
      </section>
    </div>
  )
}

export default UserProfile
