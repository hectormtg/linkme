import { LS_ITEM } from '@/constants/local-storage-items'
import { User } from '@/types/user.type'
import { atomWithStorage, createJSONStorage } from 'jotai/vanilla/utils'

export const userAtom = atomWithStorage<Partial<User>>(
  LS_ITEM.USER,
  {},
  { ...createJSONStorage() },
  {
    getOnInit: true,
  }
)
