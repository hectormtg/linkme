import { FilePreview } from '@/types/common.type'
import { isValidArray } from '@/utils/validations'
import { HTMLAttributes, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import ImageIcon from '../../public/icons/ImageIcon'
import styles from './FileInput.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  inputProps?: HTMLAttributes<HTMLInputElement>
  onFileChange?: (file: FilePreview | undefined) => void
  value?: string
}

const FileInput = ({ inputProps, value, ...allProps }: Props) => {
  const { className, onFileChange, ...props } = allProps

  const [file, setFile] = useState<Partial<FilePreview>>()

  const hasFile = file || value

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      const file = isValidArray(files) ? (files[0] as FilePreview) : undefined
      setFile(file)
      if (onFileChange) onFileChange(file)
    },
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div className='flex flex-col md:items-center gap-4 md:flex-row'>
      <div
        {...getRootProps()}
        {...props}
        className={twMerge(
          styles.container,
          'rounded-md bg-primary border border-dashed border-low-gray hover:border-purple-main hover:bg-purple-lighter hover:fill-purple-main hover:text-purple-main text-gray p-6 aspect-square flex flex-col items-center justify-center fill-gray text-sm font-medium cursor-pointer flex-shrink-0 relative overflow-hidden w-[65%] max-w-[250px] min-w-[200px] md:max-w-none md:w-auto md:min-w-0',
          hasFile && styles.preview,
          className
        )}
      >
        <input
          {...getInputProps()}
          {...inputProps}
        />
        <div
          className={twMerge(
            'flex flex-col gap-2 items-center justify-center transition-opacity',
            hasFile && 'z-10 opacity-0 text-white fill-white drop-shadow-lg',
            styles.placeholder
          )}
        >
          <ImageIcon />+ {hasFile ? 'Change' : 'Upload'} Image
        </div>
        {hasFile && (
          <div
            className={twMerge(
              'absolute inset-0 bg-center bg-no-repeat bg-cover',
              styles.imageContainer
            )}
            id='image-container'
            style={{
              backgroundImage: `url(${file?.preview || value || ''})`,
            }}
          />
        )}
      </div>

      <div className='text-gray text-sm'>
        <p>Image must be below 1024x1024px.</p>
        <p>Use PNG or JPG format.</p>
      </div>
    </div>
  )
}

export default FileInput
