import { useEffect, useRef, useState } from 'react'

interface UseDebounceParams<T> {
  value: T
  time?: number
  onChange?: (debounceValue: T) => void
  omitFirstRender?: boolean
}

export const useDebounce = <T>({
  value,
  time = 250,
  onChange,
  omitFirstRender,
}: UseDebounceParams<T>) => {
  const [debounceValue, setDebounceValue] = useState(value)

  const isFirstRender = useRef(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, time])

  useEffect(() => {
    if (onChange && (!omitFirstRender || (omitFirstRender && !isFirstRender.current))) {
      onChange(debounceValue)
    }

    isFirstRender.current = false
  }, [debounceValue])

  return debounceValue
}
