import { LS_ITEM } from '@/constants/local-storage-items'
import { LinksList } from '@/types/link.type'
import { isValidString } from '@/utils/validations'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

export const linksAtom = atomWithStorage<LinksList>(LS_ITEM.LINKS, [], {
  ...createJSONStorage(),
  setItem: (key, value) => {
    const result = value.filter(link => isValidString(link.url))
    localStorage.setItem(key, JSON.stringify(result))
  },
})
export const showErrorsAtom = atom<Record<string, boolean>>({})
export const linkErrorsAtom = atom<Record<string, boolean>>({})
