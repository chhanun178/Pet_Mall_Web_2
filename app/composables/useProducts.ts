export interface InventoryItem {
  id: number
  name: string
  variantSubtitle: string
  type: 'Product' | 'Service'
  price: string
  numericPrice: number
  margin: string
  stock: string
  stockColor: string
  dotColor: string
  isActive: boolean
  image: string | null
}

const defaultItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Botanical Paw Protection Balm',
    variantSubtitle: '1 variant',
    type: 'Product',
    price: '$22.00',
    numericPrice: 22,
    margin: '79.55% margin ($4.50 cost)',
    stock: '35 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Chamomile & Oat Soothing Paw Balm (60ml)',
    variantSubtitle: '3 size options',
    type: 'Product',
    price: '$16.00',
    numericPrice: 16,
    margin: '73.75% margin ($4.20 cost)',
    stock: '45 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Organic Lavender Calming Dropper (30ml)',
    variantSubtitle: '2 flavor variants',
    type: 'Product',
    price: '$24.00',
    numericPrice: 24,
    margin: '68.00% margin ($7.68 cost)',
    stock: '18 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Probiotic Skin & Coat Chewables (90ct)',
    variantSubtitle: '1 variant',
    type: 'Product',
    price: '$32.50',
    numericPrice: 32.5,
    margin: '62.50% margin ($12.18 cost)',
    stock: '62 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Herbal Ear Rinse & Botanical Dropper',
    variantSubtitle: '2 size options',
    type: 'Product',
    price: '$18.00',
    numericPrice: 18,
    margin: '70.00% margin ($5.40 cost)',
    stock: '4 units in stock',
    stockColor: 'text-rose-600',
    dotColor: 'bg-rose-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Holistic Canine Acupressure Consultation',
    variantSubtitle: '60 min private session',
    type: 'Service',
    price: '$65.00',
    numericPrice: 65,
    margin: '95.00% margin',
    stock: '8 slots this week',
    stockColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
    isActive: true,
    image: null,
  },
]

export const useProducts = () => {
  // Global Nuxt state: persists across hydration and shared between all pages and components
  const items = useState<InventoryItem[]>('global_inventory_items_v2', () => [...defaultItems])
  const isDrawerOpen = useState<boolean>('global_product_drawer_open', () => false)
  const drawerMode = useState<'product' | 'service'>('global_drawer_mode', () => 'product')
  const editingItem = useState<InventoryItem | null>('global_editing_item', () => null)
  const toastMessage = useState<string>('global_toast_message', () => '')

  const showToast = (msg: string) => {
    toastMessage.value = msg
    setTimeout(() => {
      if (toastMessage.value === msg) {
        toastMessage.value = ''
      }
    }, 3500)
  }

  const openAddProduct = () => {
    editingItem.value = null
    drawerMode.value = 'product'
    isDrawerOpen.value = true
  }

  const openAddService = () => {
    editingItem.value = null
    drawerMode.value = 'service'
    isDrawerOpen.value = true
  }

  const openEdit = (item: InventoryItem) => {
    editingItem.value = item
    drawerMode.value = item.type === 'Service' ? 'service' : 'product'
    isDrawerOpen.value = true
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
    editingItem.value = null
  }

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const nextId = items.value.length ? Math.max(...items.value.map(i => i.id)) + 1 : 1
    items.value.unshift({
      ...item,
      id: nextId
    })
    showToast(`Successfully added "${item.name}"!`)
  }

  const deleteItem = (id: number) => {
    const target = items.value.find(i => i.id === id)
    items.value = items.value.filter(i => i.id !== id)
    if (target) {
      showToast(`Removed "${target.name}"`)
    }
  }

  const duplicateItem = (id: number) => {
    const target = items.value.find(i => i.id === id)
    if (target) {
      const nextId = Math.max(...items.value.map(i => i.id)) + 1
      items.value.unshift({
        ...target,
        id: nextId,
        name: `${target.name} (Copy)`
      })
      showToast(`Duplicated "${target.name}"`)
    }
  }

  return {
    items,
    isDrawerOpen,
    drawerMode,
    editingItem,
    toastMessage,
    openAddProduct,
    openAddService,
    openEdit,
    closeDrawer,
    addItem,
    deleteItem,
    duplicateItem,
    showToast
  }
}
