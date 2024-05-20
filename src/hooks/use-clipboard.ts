'use client'

import { notify } from '@/utils/notify'

export const useClipboard = () => {
  const isAvailable = 'clipboard' in navigator

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(onCopySuccess, onCopyFail).catch(onCopyFail)
  }

  return {
    isAvailable,
    copy,
  }
}

const onCopySuccess = () => {
  notify('Copied to clipboard!', 'success')
}

const onCopyFail = () => {
  notify('Fail to copy to clipboard!', 'error')
}
