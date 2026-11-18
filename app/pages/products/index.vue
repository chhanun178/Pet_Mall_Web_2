<template>
  <div class="space-y-6 relative">
    <!-- Success Toast Alert -->
    <transition
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-900 text-white shadow-xl border border-stone-800 text-xs sm:text-sm font-medium"
      >
        <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          ✓
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- Header Strip & Add Actions -->
    <ProductsHeader
      @add-product="openDrawer('product')"
      @add-service="openDrawer('service')"
    />

    <!-- Filters: Search bar and category, stock, sort dropdowns -->
    <ProductFilters />

    <!-- Inventory Table with Status Toggles & Quick Actions -->
    <ProductTable @edit-item="openEditDrawer" />

    <!-- Pagination Footer -->
    <ProductPagination />

    <!-- Slide-over Drawer for Adding / Editing Product or Service -->
    <ProductDrawer
      :is-open="isDrawerOpen"
      :mode="drawerMode"
      :edit-item="currentEditItem"
      @close="isDrawerOpen = false"
      @saved="handleItemSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: 'Inventory Catalog • Velvet Paws Atelier | Pet Mall',
  meta: [
    { name: 'description', content: 'Manage pet products and holistic services inventory' }
  ]
})

const route = useRoute()

const isDrawerOpen = ref(false)
const drawerMode = ref<'product' | 'service'>('product')
const currentEditItem = ref<any>(null)
const toastMessage = ref('')

const openDrawer = (mode: 'product' | 'service') => {
  currentEditItem.value = null
  drawerMode.value = mode
  isDrawerOpen.value = true
}

const openEditDrawer = (item: any) => {
  currentEditItem.value = item
  drawerMode.value = item.type === 'Service' ? 'service' : 'product'
  isDrawerOpen.value = true
}

const handleItemSaved = () => {
  toastMessage.value = drawerMode.value === 'service' ? 'New service added to catalog!' : 'New product added to catalog!'
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// Automatically open drawer if directed from Dashboard quick actions
onMounted(() => {
  if (route.query.action === 'new-product') {
    openDrawer('product')
  } else if (route.query.action === 'new-service') {
    openDrawer('service')
  }
})
</script>
