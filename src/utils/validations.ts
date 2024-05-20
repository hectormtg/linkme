import REG_EX from '@/constants/reg-ex'

export const isValidString = (value: any) => {
  return undefined !== value && !!value && value.replace(/\s/g, '').length > 0
}

export const isValidArray = (value: any) => {
  return undefined !== value && !!value && Array.isArray(value) && value.length > 0
}

export const isValidEmail = (value: string) => {
  return isValidString(value) && REG_EX.EMAIL.test(value)
}

export const isValidObject = (value: any) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    return undefined !== value && !!value && Object.keys(value).length > 0
  }
  return false
}

export const isValidUrl = (value: any) => {
  return isValidString(value) && REG_EX.LINK.test(value)
}
