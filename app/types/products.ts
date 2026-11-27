export type ListingType = 'product' | 'service'
export type PetType = 'all' | 'dogs' | 'cats' | 'other'
export type StockFilter = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
export type ProductSort = 'newest' | 'price_asc' | 'price_desc' | 'stock'

export interface ProductInput {
  name: string
  description: string
  subtitle: string
  type: ListingType
  category: string
  petType: PetType
  priceCents: number
  costCents: number
  stock: number
  removeImage?: boolean
}

export interface InventoryItem extends Omit<ProductInput, 'removeImage'> {
  id: string
  isActive: boolean
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface ProductQuery {
  search: string
  category?: string
  stock: StockFilter
  sort: ProductSort
  type?: ListingType
  page: number
}

export interface ProductPage {
  items: InventoryItem[]
  categories: string[]
  page: number
  pageSize: number
  total: number
}
