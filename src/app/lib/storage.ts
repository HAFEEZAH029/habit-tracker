export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  const item = localStorage.getItem(key);

  if (!item) return fallback;

  try {
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string) {
  if (typeof window === "undefined") return;

  localStorage.removeItem(key);
}