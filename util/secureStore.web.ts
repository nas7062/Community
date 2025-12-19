export async function saveStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export async function getStorage(key: string) {
  return localStorage.getItem(key);
}

export async function deleteStorage(key: string) {
  localStorage.removeItem(key);
}
