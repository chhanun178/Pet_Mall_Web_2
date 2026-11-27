import { useAuth } from '~/composables/auth/useAuth'
import type { InventoryItem, ProductInput, ProductPage, ProductQuery } from '~/types/products'

const path = '/api/v1/vendor/products'
const DEFAULT_PAGE_SIZE = 5

const initialFallbackItems: InventoryItem[] = [
  {
    id: 'demo-item-1',
    name: 'Botanical Paw Protection Balm',
    description: 'Cold-pressed calendula and raw shea butter balm formulated to shield and repair dry paw pads.',
    subtitle: '1 variant',
    type: 'product',
    category: 'Balms',
    petType: 'dogs',
    priceCents: 2200,
    costCents: 450,
    stock: 35,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-11-21T10:00:00.000Z',
    updatedAt: '2026-11-21T10:00:00.000Z',
  },
  {
    id: 'demo-item-2',
    name: 'Chamomile & Oat Soothing Paw Balm (60ml)',
    description: 'Gentle colloidal oatmeal and Roman chamomile salve for seasonal allergy relief.',
    subtitle: '3 size options',
    type: 'product',
    category: 'Balms',
    petType: 'all',
    priceCents: 1600,
    costCents: 420,
    stock: 45,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-11-21T10:01:00.000Z',
    updatedAt: '2026-11-21T10:01:00.000Z',
  },
  {
    id: 'demo-item-3',
    name: 'Organic Lavender Calming Dropper (30ml)',
    description: 'Alcohol-free valerian root and organic lavender flower extract for thunderstorm and travel anxiety.',
    subtitle: '2 flavor variants',
    type: 'product',
    category: 'Supplements',
    petType: 'all',
    priceCents: 2400,
    costCents: 768,
    stock: 18,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-11-21T10:02:00.000Z',
    updatedAt: '2026-11-21T10:02:00.000Z',
  },
  {
    id: 'demo-item-4',
    name: 'Probiotic Skin & Coat Chewables (90ct)',
    description: 'Daily wild Alaskan salmon oil and multi-strain probiotic soft chews for lustrous coat health.',
    subtitle: '1 variant',
    type: 'product',
    category: 'Supplements',
    petType: 'dogs',
    priceCents: 3250,
    costCents: 1218,
    stock: 62,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-11-21T10:03:00.000Z',
    updatedAt: '2026-11-21T10:03:00.000Z',
  },
  {
    id: 'demo-item-5',
    name: 'Herbal Ear Rinse & Botanical Dropper',
    description: 'Witch hazel, mullein flower, and organic aloe vera ear cleanser for routine hygiene.',
    subtitle: '2 size options',
    type: 'product',
    category: 'Grooming',
    petType: 'all',
    priceCents: 1800,
    costCents: 540,
    stock: 4,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-11-21T10:04:00.000Z',
    updatedAt: '2026-11-21T10:04:00.000Z',
  },
  {
    id: 'demo-item-6',
    name: 'Holistic Canine Acupressure Consultation',
    description: 'One-on-one meridian bodywork and custom botanical wellness routine with a certified practitioner.',
    subtitle: '60 min private session',
    type: 'service',
    category: 'Wellness',
    petType: 'dogs',
    priceCents: 6500,
    costCents: 325,
    stock: 8,
    isActive: true,
    imageUrl: null,
    createdAt: '2026-11-21T10:05:00.000Z',
    updatedAt: '2026-11-21T10:05:00.000Z',
  },
]

function isFallbackEligibleError(error: unknown): boolean {
  const status = (error as { status?: number; statusCode?: number; response?: { status?: number } })?.status
    ?? (error as { statusCode?: number })?.statusCode
    ?? (error as { response?: { status?: number } })?.response?.status
  return status === 503 || status === undefined
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Could not read image file.'))
    reader.readAsDataURL(file)
  })
}

export const useProducts = () => {
  const { authorizedFetch } = useAuth()
  const toastMessage = useState('global_toast_message', () => '')
  const fallbackItems = useState<InventoryItem[]>('vendor_fallback_inventory_items', () => [...initialFallbackItems])

  function showToast(message: string) {
    toastMessage.value = message
    setTimeout(() => {
      if (toastMessage.value === message) toastMessage.value = ''
    }, 3500)
  }

  function listFromFallback(query: ProductQuery): ProductPage {
    const all = fallbackItems.value
    const categories = [...new Set(all.map(item => item.category))].sort((a, b) => a.localeCompare(b))
    const q = (query.search || '').trim().toLowerCase()

    const filtered = all.filter((item) => {
      if (query.type && item.type !== query.type) return false
      if (query.category && item.category !== query.category) return false
      if (
        q
        && !item.name.toLowerCase().includes(q)
        && !item.subtitle.toLowerCase().includes(q)
        && !item.description.toLowerCase().includes(q)
      ) {
        return false
      }
      if (query.stock === 'in_stock' && !(item.stock > 5)) return false
      if (query.stock === 'low_stock' && !(item.stock > 0 && item.stock <= 5)) return false
      if (query.stock === 'out_of_stock' && item.stock !== 0) return false
      return true
    })

    filtered.sort((a, b) => {
      if (query.sort === 'price_asc' && a.priceCents !== b.priceCents) return a.priceCents - b.priceCents
      if (query.sort === 'price_desc' && a.priceCents !== b.priceCents) return b.priceCents - a.priceCents
      if (query.sort === 'stock' && a.stock !== b.stock) return b.stock - a.stock
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const total = filtered.length
    const page = Math.min(query.page || 1, Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE)))
    const items = filtered.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE)

    return {
      items,
      categories,
      total,
      page,
      pageSize: DEFAULT_PAGE_SIZE,
    }
  }

  async function list(query: ProductQuery, signal: AbortSignal): Promise<ProductPage> {
    try {
      return await authorizedFetch<ProductPage>(path, { query, signal, retry: 0 })
    } catch (error) {
      if (signal.aborted || !isFallbackEligibleError(error)) throw error
      return listFromFallback(query)
    }
  }

  async function save(input: ProductInput, image: File | null, id?: string): Promise<InventoryItem> {
    let body: ProductInput | FormData = input
    if (image) {
      const form = new FormData()
      for (const [name, value] of Object.entries(input)) form.append(name, String(value))
      form.append('image', image)
      body = form
    }

    try {
      return await authorizedFetch<InventoryItem>(id ? `${path}/${id}` : path, {
        method: id ? 'PUT' : 'POST',
        body,
        retry: 0,
      })
    } catch (error) {
      if (!isFallbackEligibleError(error)) throw error
      const now = new Date().toISOString()
      const uploadedUrl = image ? await fileToDataUrl(image) : undefined

      if (id) {
        const idx = fallbackItems.value.findIndex(item => item.id === id)
        const current = idx !== -1 ? fallbackItems.value[idx] : undefined
        const updated: InventoryItem = {
          id,
          name: input.name,
          description: input.description,
          subtitle: input.subtitle,
          type: input.type,
          category: input.category,
          petType: input.petType,
          priceCents: input.priceCents,
          costCents: input.costCents,
          stock: input.stock,
          isActive: current?.isActive ?? true,
          imageUrl: input.removeImage ? null : (uploadedUrl ?? current?.imageUrl ?? null),
          createdAt: current?.createdAt ?? now,
          updatedAt: now,
        }
        if (idx !== -1) {
          const copy = [...fallbackItems.value]
          copy[idx] = updated
          fallbackItems.value = copy
        } else {
          fallbackItems.value = [updated, ...fallbackItems.value]
        }
        return updated
      }

      const created: InventoryItem = {
        id: `local-${Date.now()}`,
        name: input.name,
        description: input.description,
        subtitle: input.subtitle,
        type: input.type,
        category: input.category,
        petType: input.petType,
        priceCents: input.priceCents,
        costCents: input.costCents,
        stock: input.stock,
        isActive: true,
        imageUrl: uploadedUrl ?? null,
        createdAt: now,
        updatedAt: now,
      }
      fallbackItems.value = [created, ...fallbackItems.value]
      return created
    }
  }

  async function setStatus(id: string, isActive: boolean): Promise<InventoryItem> {
    try {
      return await authorizedFetch<InventoryItem>(`${path}/${id}/status`, {
        method: 'PATCH',
        body: { isActive },
        retry: 0,
      })
    } catch (error) {
      if (!isFallbackEligibleError(error)) throw error
      const idx = fallbackItems.value.findIndex(item => item.id === id)
      if (idx === -1) throw error
      const current = fallbackItems.value[idx]!
      const updated: InventoryItem = {
        ...current,
        isActive,
        updatedAt: new Date().toISOString(),
      }
      const copy = [...fallbackItems.value]
      copy[idx] = updated
      fallbackItems.value = copy
      return updated
    }
  }

  async function duplicate(id: string): Promise<InventoryItem> {
    try {
      return await authorizedFetch<InventoryItem>(`${path}/${id}/duplicate`, { method: 'POST', retry: 0 })
    } catch (error) {
      if (!isFallbackEligibleError(error)) throw error
      const current = fallbackItems.value.find(item => item.id === id)
      if (!current) throw error
      const now = new Date().toISOString()
      const copyItem: InventoryItem = {
        ...current,
        id: `local-${Date.now()}`,
        name: `${current.name.slice(0, 153).trimEnd()} (Copy)`,
        isActive: false,
        createdAt: now,
        updatedAt: now,
      }
      fallbackItems.value = [copyItem, ...fallbackItems.value]
      return copyItem
    }
  }

  async function remove(id: string): Promise<void> {
    try {
      await authorizedFetch<void>(`${path}/${id}`, { method: 'DELETE', retry: 0 })
    } catch (error) {
      if (!isFallbackEligibleError(error)) throw error
      fallbackItems.value = fallbackItems.value.filter(item => item.id !== id)
    }
  }

  return {
    toastMessage,
    showToast,
    list,
    save,
    setStatus,
    duplicate,
    remove,
  }
}
