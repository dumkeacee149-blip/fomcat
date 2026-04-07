const isClient = typeof window !== 'undefined'

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (!isClient) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.error(`Failed to save to localStorage: ${key}`)
  }
}

export function removeStorageItem(key: string): void {
  if (!isClient) return
  window.localStorage.removeItem(key)
}
