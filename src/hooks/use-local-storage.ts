export const useLocalStorage = () => {
  const setItem = (name: string, item: any) => {
    localStorage.setItem(name, JSON.stringify(item))
  }

  const removeItem = (name: string) => {
    localStorage.removeItem(name)
  }

  const getItem = (name: string) => {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) : undefined
  }

  return {
    setItem,
    removeItem,
    getItem,
  }
}
