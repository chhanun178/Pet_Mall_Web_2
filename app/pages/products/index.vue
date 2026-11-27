<script setup lang="ts">
import ProductsHeader from '~/components/products/ProductsHeader.vue'
import ProductDrawer from '~/components/products/ProductDrawer.vue'
import ProductFilters from '~/components/products/ProductFilters.vue'
import ProductPagination from '~/components/products/ProductPagination.vue'
import ProductTable from '~/components/products/ProductTable.vue'
import { useAuth } from '~/composables/auth/useAuth'
import { useProducts } from '~/composables/useProducts'
import type { InventoryItem, ListingType, ProductInput, ProductPage, ProductSort, StockFilter } from '~/types/products'

definePageMeta({ middleware: ['vendor-only'], inventoryCatalog: true })
useHead({
  title: 'Inventory Catalog | Pet Mall',
  meta: [{ name: 'description', content: 'Manage your Pet Mall products and services.' }],
})

const route = useRoute()
const { user, initialized, displayName, initials } = useAuth()
const products = useProducts()
const mounted = ref(false)
const canManage = computed(() => mounted.value && user.value?.role === 'VENDOR' && user.value.vendorProfile?.vendorStatus === 'ACTIVE')
const listingType = computed<ListingType | undefined>(() => route.query.type === 'service' ? 'service' : undefined)
const search = ref('')
const submittedSearch = ref('')
const category = ref('')
const stock = ref<StockFilter>('all')
const sort = ref<ProductSort>('newest')
const filtered = computed(() => Boolean(search.value.trim() || category.value || stock.value !== 'all'))
const result = shallowRef<ProductPage>()
const pending = ref(true)
const loadError = ref('')
const actionError = ref('')
const busy = ref(false)

const drawerOpen = ref(false)
const drawerType = ref<ListingType>('product')
const editing = shallowRef<InventoryItem | null>(null)
const focusStock = ref(false)
const drawerError = ref('')
const deleting = shallowRef<InventoryItem | null>(null)
const deleteDialog = ref<HTMLDialogElement>()
const deleteError = ref('')

let activeRequest: AbortController | undefined

function errorMessage(error: unknown, fallback: string) {
  const message = (error as { data?: { message?: string | string[] } })?.data?.message
  return (Array.isArray(message) ? message[0] : message) || fallback
}

async function load(page = result.value?.page ?? 1) {
  if (!canManage.value) return
  activeRequest?.abort()
  const request = new AbortController()
  activeRequest = request
  pending.value = true
  loadError.value = ''

  try {
    const data = await products.list({
      search: submittedSearch.value,
      category: category.value || undefined,
      stock: stock.value,
      sort: sort.value,
      type: listingType.value,
      page,
    }, request.signal)
    if (!request.signal.aborted) result.value = data
  } catch (error) {
    if (!request.signal.aborted) loadError.value = errorMessage(error, 'Could not load inventory. Try again.')
  } finally {
    if (!request.signal.aborted) pending.value = false
  }
}

watch(search, (value, _, cleanup) => {
  const timeout = window.setTimeout(() => {
    submittedSearch.value = value.trim()
  }, 250)
  cleanup(() => window.clearTimeout(timeout))
})

watch([submittedSearch, category, stock, sort, listingType], () => void load(1))
watch(() => user.value?.id, () => {
  activeRequest?.abort()
  result.value = undefined
  void load(1)
})
onMounted(() => {
  mounted.value = true
  void load(1)
})
onBeforeUnmount(() => {
  mounted.value = false
  activeRequest?.abort()
})

function clearFilters() {
  search.value = ''
  submittedSearch.value = ''
  category.value = ''
  stock.value = 'all'
}

function openDrawer(type: ListingType, item: InventoryItem | null = null, stockShortcut = false) {
  drawerType.value = type
  editing.value = item
  focusStock.value = stockShortcut
  drawerError.value = ''
  drawerOpen.value = true
}

async function save(input: ProductInput, image: File | null) {
  if (busy.value) return
  busy.value = true
  drawerError.value = ''
  actionError.value = ''
  const item = editing.value
  try {
    await products.save(input, image, item?.id)
    drawerOpen.value = false
    products.showToast(item ? 'Listing updated.' : 'Listing added.')
    await load(item ? result.value?.page : 1)
  } catch (error) {
    drawerError.value = errorMessage(error, 'Could not save the listing. Try again.')
  } finally {
    busy.value = false
  }
}

async function runAction(operation: () => Promise<unknown>, message: string, page?: number) {
  if (busy.value) return
  busy.value = true
  actionError.value = ''
  try {
    await operation()
    products.showToast(message)
    await load(page)
  } catch (error) {
    actionError.value = errorMessage(error, 'Could not update the listing. Try again.')
  } finally {
    busy.value = false
  }
}

function confirmDelete(item: InventoryItem) {
  deleting.value = item
  deleteError.value = ''
  deleteDialog.value?.showModal()
}

function closeDelete() {
  deleteDialog.value?.close()
  deleting.value = null
}

async function remove() {
  if (!deleting.value || busy.value) return
  busy.value = true
  actionError.value = ''
  deleteError.value = ''
  try {
    await products.remove(deleting.value.id)
    closeDelete()
    products.showToast('Listing deleted.')
    await load()
  } catch (error) {
    deleteError.value = errorMessage(error, 'Could not delete the listing. Try again.')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section v-if="canManage" class="space-y-6" aria-label="Inventory catalog">
    <ProductsHeader
      :store-name="displayName"
      :store-slug="user?.vendorProfile?.storeSlug ?? ''"
      :initials="initials"
      :disabled="busy"
      @add="openDrawer"
    />
    <nav aria-label="Catalog listings" class="flex gap-4 text-sm font-semibold text-[#584237] sm:hidden">
      <NuxtLink to="/products" :aria-current="!listingType ? 'page' : undefined" :class="{ 'text-[#9d4300] underline underline-offset-4': !listingType }">Products</NuxtLink>
      <NuxtLink :to="{ path: '/products', query: { type: 'service' } }" :aria-current="listingType ? 'page' : undefined" :class="{ 'text-[#9d4300] underline underline-offset-4': listingType }">Services</NuxtLink>
    </nav>

    <div class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.03]">
      <ProductFilters
        v-model:search="search"
        v-model:category="category"
        v-model:stock="stock"
        v-model:sort="sort"
        :categories="result?.categories ?? []"
      />
      <p v-if="actionError" role="alert" class="mx-5 mb-4 rounded-lg bg-[#fff0ef] p-3 text-sm text-[#ba1a1a]">{{ actionError }}</p>

      <div :aria-busy="pending">
        <div v-if="pending" class="border-t border-[#edf0ff] p-5">
          <p role="status" class="text-sm text-[#6b7280]">Loading inventory…</p>
          <div aria-hidden="true" class="mt-5 space-y-4 motion-safe:animate-pulse">
            <div v-for="row in 3" :key="row" class="h-14 rounded-lg bg-[#f5f6fd]" />
          </div>
        </div>
        <div v-else-if="loadError" class="border-t border-[#edf0ff] px-5 py-12 text-center">
          <p role="alert" class="text-sm text-[#ba1a1a]">{{ loadError }}</p>
          <button type="button" class="mt-3 rounded-lg bg-[#f1f3ff] px-4 py-2 text-sm font-semibold text-[#006398]" @click="load()">Try again</button>
        </div>
        <template v-else-if="result?.items.length">
          <ProductTable
            :items="result.items"
            :busy="busy"
            @edit="openDrawer($event.type, $event)"
            @stock="openDrawer($event.type, $event, true)"
            @duplicate="runAction(() => products.duplicate($event.id), 'Listing duplicated as inactive.', 1)"
            @status="(item, active) => runAction(() => products.setStatus(item.id, active), active ? 'Listing activated.' : 'Listing paused.')"
            @delete="confirmDelete"
          />
          <ProductPagination
            :page="result.page"
            :page-size="result.pageSize"
            :total="result.total"
            :count="result.items.length"
            @change="load"
          />
        </template>
        <div v-else class="border-t border-[#edf0ff] px-5 py-14 text-center">
          <p class="font-semibold">{{ filtered ? 'No matching listings' : listingType ? 'No services yet' : 'Your inventory is empty' }}</p>
          <p class="mt-1.5 text-sm text-[#6b7280]">
            {{ filtered ? 'Try a different search or clear your filters.' : 'Add your first listing to start managing inventory.' }}
          </p>
          <button v-if="filtered" type="button" class="mt-4 rounded-lg bg-[#f1f3ff] px-4 py-2 text-sm font-semibold text-[#006398]" @click="clearFilters">Clear filters</button>
          <button v-else type="button" :disabled="busy" class="mt-4 rounded-lg bg-[#fce8d3] px-4 py-2 text-sm font-semibold text-[#9d4300] disabled:opacity-50" @click="openDrawer(listingType ?? 'product')">
            {{ listingType ? 'Add New Service' : 'Add New Product' }}
          </button>
        </div>
      </div>
    </div>

    <ProductDrawer
      :open="drawerOpen"
      :type="drawerType"
      :item="editing"
      :categories="result?.categories ?? []"
      :saving="busy"
      :error="drawerError"
      :focus-stock="focusStock"
      @close="drawerOpen = false"
      @save="save"
    />

    <dialog
      ref="deleteDialog"
      aria-labelledby="delete-listing-title"
      class="delete-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-6 text-[#141b2b] shadow-2xl"
      @cancel.prevent="!busy && closeDelete()"
    >
      <h2 id="delete-listing-title" class="text-lg font-bold">Delete {{ deleting?.type === 'service' ? 'service' : 'product' }}?</h2>
      <p class="mt-2 break-words text-sm text-[#6b7280]">“{{ deleting?.name }}” will be permanently removed from your inventory.</p>
      <p v-if="deleteError" role="alert" class="mt-3 text-sm text-[#ba1a1a]">{{ deleteError }}</p>
      <div class="mt-5 flex justify-end gap-2">
        <button autofocus type="button" :disabled="busy" class="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#f1f3ff]" @click="closeDelete">Cancel</button>
        <button type="button" :disabled="busy" class="rounded-lg bg-[#ba1a1a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a21717] disabled:opacity-60" @click="remove">
          {{ busy ? 'Deleting…' : 'Delete' }}
        </button>
      </div>
    </dialog>
  </section>
  <section v-else class="rounded-xl bg-white p-6">
    <h1 class="text-xl font-semibold">Inventory Catalog</h1>
    <p v-if="!mounted || !initialized" role="status" class="mt-2 text-sm text-[#6b7280]">Loading inventory…</p>
    <NuxtLink v-else-if="!user" :to="{ path: '/auth/login', query: { role: 'vendor', redirect: route.fullPath } }" class="mt-2 inline-block text-sm font-semibold text-[#006398] hover:underline">Sign in to manage your inventory</NuxtLink>
    <p v-else-if="user?.vendorProfile?.vendorStatus === 'SUSPENDED'" role="alert" class="mt-2 text-sm text-[#ba1a1a]">Your storefront is suspended. Contact Pet Mall support for access.</p>
    <p v-else role="alert" class="mt-2 text-sm text-[#6b7280]">An active vendor account is required to manage inventory.</p>
  </section>
</template>

<style scoped>
.delete-dialog::backdrop { background: rgb(20 27 43 / 35%); }
:global(html:has(.catalog-layout dialog[open])) { overflow: hidden; }
</style>
