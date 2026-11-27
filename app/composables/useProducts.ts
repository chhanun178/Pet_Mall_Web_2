import { useAuth } from '~/composables/auth/useAuth'
import type { InventoryItem, ProductInput, ProductPage, ProductQuery } from '~/types/products'

const path = '/api/v1/vendor/products'

export const useProducts = () => {
  const { authorizedFetch } = useAuth()
  const toastMessage = useState('global_toast_message', () => '')

  function showToast(message: string) {
    toastMessage.value = message
    setTimeout(() => {
      if (toastMessage.value === message) toastMessage.value = ''
    }, 3500)
  }

  function save(input: ProductInput, image: File | null, id?: string) {
    let body: ProductInput | FormData = input
    if (image) {
      const form = new FormData()
      for (const [name, value] of Object.entries(input)) form.append(name, String(value))
      form.append('image', image)
      body = form
    }

    return authorizedFetch<InventoryItem>(id ? `${path}/${id}` : path, {
      method: id ? 'PUT' : 'POST',
      body,
      retry: 0,
    })
  }

  return {
    toastMessage,
    showToast,
    list: (query: ProductQuery, signal: AbortSignal) =>
      authorizedFetch<ProductPage>(path, { query, signal, retry: 0 }),
    save,
    setStatus: (id: string, isActive: boolean) =>
      authorizedFetch<InventoryItem>(`${path}/${id}/status`, {
        method: 'PATCH', body: { isActive }, retry: 0,
      }),
    duplicate: (id: string) =>
      authorizedFetch<InventoryItem>(`${path}/${id}/duplicate`, { method: 'POST', retry: 0 }),
    remove: (id: string) =>
      authorizedFetch<void>(`${path}/${id}`, { method: 'DELETE', retry: 0 }),
  }
}
