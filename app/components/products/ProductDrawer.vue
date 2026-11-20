<template>
  <Teleport to="body">
    <div class="relative z-50 pointer-events-none" aria-labelledby="drawer-title" role="dialog" aria-modal="true">
      <!-- Backdrop Transition (smooth fade in & fade out) -->
      <Transition enter-active-class="transition-opacity ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-300"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isDrawerOpen" class="pointer-events-auto fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
          @click="closeDrawer" @wheel.prevent @touchmove.prevent />
      </Transition>

      <!-- Slide-over Drawer Transition (smooth slide in & slide back out) -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition enter-active-class="transform transition ease-out duration-300 sm:duration-400"
              enter-from-class="translate-x-full" enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in duration-300 sm:duration-400"
              leave-from-class="translate-x-0" leave-to-class="translate-x-full">
              <aside v-if="isDrawerOpen"
                class="pointer-events-auto w-screen max-w-md bg-white shadow-2xl border-l border-warm-200 flex flex-col justify-between overflow-y-auto">
                <div>
                  <!-- Drawer Header -->
                  <div
                    class="px-6 py-3.5 border-b border-warm-200/80 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                    <div class="flex items-center gap-2.5">
                      <h2 id="drawer-title" class="text-xl font-bold text-stone-900 tracking-tight">
                        {{
                          editingItem
                            ? (drawerMode === 'service' ? 'Edit Service' : 'Edit Product')
                            : (drawerMode === 'service' ? 'Add a new service' : 'Add a new product')
                        }}
                      </h2>
                    </div>
                    <button @click="closeDrawer" type="button"
                      class="w-8 h-8 rounded-xl flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-all cursor-pointer"
                      title="Close drawer">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Form Content -->
                  <div class="p-6 space-y-6">
                    <!-- 1. Basic Information -->
                    <div class="space-y-4">
                      <h3 class="font-bold text-stone-900 text-sm">Basic Information</h3>

                      <!-- Title / Name -->
                      <div class="space-y-1.5">
                        <label class="block text-xs font-semibold text-stone-600">
                          {{ drawerMode === 'service' ? 'Service Title' : 'Product Title' }}
                        </label>
                        <input type="text" v-model="form.title"
                          :placeholder="drawerMode === 'service' ? 'e.g. Herbal Paw Soak & Relax' : 'e.g. Organic Chamomile Paw Balm'"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm placeholder-stone-400 hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm" />
                      </div>

                      <!-- Description -->
                      <div class="space-y-1.5">
                        <label class="block text-xs font-semibold text-stone-600">
                          {{ drawerMode === 'service' ? 'Service Description' : 'Product Description' }}
                        </label>
                        <textarea v-model="form.description" rows="3" placeholder="Enter description and details..."
                          class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm placeholder-stone-400 hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm resize-none leading-relaxed"></textarea>
                      </div>

                      <!-- Category & Pet/Service Type -->
                      <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                          <label class="block text-xs font-semibold text-stone-600">Category</label>
                          <div class="relative">
                            <select v-model="form.category"
                              class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm pr-8 cursor-pointer font-medium">
                              <template v-if="drawerMode === 'product'">
                                <option>Topical Balms</option>
                                <option>Ear Care</option>
                                <option>Supplements</option>
                                <option>Calming Drops</option>
                                <option>Accessories</option>
                              </template>
                              <template v-else>
                                <option>Spa & Grooming</option>
                                <option>Holistic Consultation</option>
                                <option>Acupressure</option>
                                <option>Diet & Nutrition</option>
                              </template>
                            </select>
                            <div
                              class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-500">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <!-- Product: Pet Type | Service: Duration -->
                        <div v-if="drawerMode === 'product'" class="space-y-1.5">
                          <label class="block text-xs font-semibold text-stone-600">Pet Type</label>
                          <div class="relative">
                            <select v-model="form.petType"
                              class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm pr-8 cursor-pointer font-medium">
                              <option>All Pets</option>
                              <option>Dogs Only</option>
                              <option>Cats Only</option>
                            </select>
                            <div
                              class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-500">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div v-else class="space-y-1.5">
                          <label class="block text-xs font-semibold text-stone-600">Session Duration</label>
                          <input type="text" v-model="form.duration" placeholder="e.g. 45 min private session"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <!-- 2. Pricing & Inventory -->
                    <div class="space-y-4 pt-4 border-t border-warm-100">
                      <h3 class="font-bold text-stone-900 text-sm">
                        {{ drawerMode === 'service' ? 'Pricing & Availability' : 'Pricing & Inventory' }}
                      </h3>

                      <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                          <label class="block text-xs font-semibold text-stone-600">
                            {{ drawerMode === 'service' ? 'Session Price' : 'Retail Price' }}
                          </label>
                          <div class="relative">
                            <span
                              class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 text-sm font-medium">$</span>
                            <input type="number" v-model.number="form.retailPrice" min="1" step="0.5"
                              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm" />
                          </div>
                        </div>

                        <div class="space-y-1.5">
                          <label class="block text-xs font-semibold text-stone-700">
                            {{ drawerMode === 'service' ? 'Material / Cost' : 'Item Cost' }}
                          </label>
                          <div class="relative">
                            <span
                              class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500 text-sm font-medium">$</span>
                            <input type="number" v-model.number="form.itemCost" min="0" step="0.1"
                              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm" />
                          </div>
                        </div>
                      </div>

                      <!-- Margin / Profit Banner -->
                      <div
                        class="px-4 py-3 rounded-xl bg-slate-100/80 flex items-center justify-between text-xs font-medium transition-all">
                        <span class="text-stone-700 font-semibold">Margin / Profit</span>
                        <span class="font-bold text-stone-900 tracking-tight">{{ marginPct }} / {{ profitVal }}</span>
                      </div>

                      <!-- Stock or Slots -->
                      <div class="space-y-1.5">
                        <label class="block text-xs font-semibold text-stone-700">
                          {{ drawerMode === 'service' ? 'Weekly Available Slots' : 'Stock Quantity' }}
                        </label>
                        <div class="relative">
                          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8"
                              viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <path d="M16 2v4M8 2v4m-5 4h18" />
                            </svg>
                          </span>
                          <input type="number" v-model.number="form.stock" min="1"
                            class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 bg-white text-stone-800 text-sm hover:border-stone-300 focus:border-[#F58700] focus:ring-4 focus:ring-[#F58700]/10 outline-none transition-all duration-200 shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <!-- 3. Media Upload -->
                    <div class="space-y-3 pt-4 border-t border-warm-100">
                      <h3 class="font-bold text-stone-900 text-sm">Media</h3>
                      <div
                        class="border-2 border-dashed border-warm-200/90 rounded-2xl p-6 flex flex-col items-center justify-center text-stone-400 hover:border-[#F58700] hover:bg-brand-50/20 transition-all duration-200 cursor-pointer group">
                        <div
                          class="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-brand-100/60 flex items-center justify-center text-stone-600 group-hover:text-brand-600 transition-colors mb-2">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <span
                          class="text-xs text-stone-500 font-medium group-hover:text-stone-700 transition-colors">Click
                          to upload image
                          or photo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Drawer Footer -->
                <div
                  class="px-6 py-3.5 border-t border-warm-200 flex items-center justify-end gap-3 bg-white sticky bottom-0 z-10">
                  <button type="button" @click="closeDrawer"
                    class="px-3.5 py-2 rounded-xl border border-transparent text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button type="button" @click="handleSave"
                    class="px-3.5 py-2 rounded-xl border border-transparent bg-[#F58700] hover:bg-[#E07A00] active:scale-95 text-white text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer">
                    {{
                      editingItem
                        ? (drawerMode === 'service' ? 'Update Service' : 'Update Product')
                        : (drawerMode === 'service' ? 'Save Service' : 'Save Product')
                    }}
                  </button>
                </div>
              </aside>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useProducts } from '~/composables/useProducts'

const { isDrawerOpen, drawerMode, editingItem, closeDrawer, addItem, updateItem } = useProducts()

// Lock background scrolling and listen for Escape key while drawer is open
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isDrawerOpen.value) {
    closeDrawer()
  }
}

watch(
  isDrawerOpen,
  (open) => {
    if (import.meta.client) {
      if (open) {
        document.body.classList.add('overflow-hidden')
        window.addEventListener('keydown', handleKeydown)
      } else {
        document.body.classList.remove('overflow-hidden')
        window.removeEventListener('keydown', handleKeydown)
      }
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (import.meta.client) {
    document.body.classList.remove('overflow-hidden')
    window.removeEventListener('keydown', handleKeydown)
  }
})

const form = ref({
  title: 'Chamomile & Oat Soothing Paw Balm',
  description: 'Crafted in small batches using whole organic chamomile flower extract and finely ground colloidal oat groats. Deeply nourishing for cracked pads and dry noses.',
  category: 'Topical Balms',
  petType: 'All Pets',
  duration: '45 min private session',
  retailPrice: 18,
  itemCost: 4.5,
  stock: 35,
})

// Populate form whenever drawer opens or mode changes
watch(
  [isDrawerOpen, drawerMode, editingItem],
  ([open, mode, item]) => {
    if (open) {
      if (item) {
        form.value.title = item.name
        form.value.retailPrice = item.numericPrice || 20
        form.value.category = mode === 'service' ? 'Spa & Grooming' : 'Topical Balms'

        // Extract cost from margin string if present (e.g. "$4.50 cost")
        const costMatch = item.margin?.match(/\$([0-9.]+)\s+cost/i)
        form.value.itemCost = costMatch ? parseFloat(costMatch[1]) : (mode === 'service' ? 8 : 4.5)

        // Extract stock number from stock string (e.g. "35 units in stock" -> 35, "8 slots this week" -> 8)
        const stockMatch = item.stock?.match(/(\d+)/)
        form.value.stock = stockMatch ? parseInt(stockMatch[1], 10) : 25

        if (mode === 'service') {
          form.value.duration = item.variantSubtitle || '45 min private session'
          form.value.description = 'Holistic consultation and soothing coat soak using certified organic tinctures and calm lavender.'
        } else {
          form.value.petType = 'All Pets'
          form.value.description = 'Crafted in small batches using whole organic chamomile flower extract and finely ground colloidal oat groats. Deeply nourishing for cracked pads and dry noses.'
        }
      } else if (mode === 'service') {
        form.value.title = 'Canine Herbal Coat & Spa Ritual'
        form.value.description = 'Holistic consultation and soothing coat soak using certified organic tinctures and calm lavender.'
        form.value.category = 'Spa & Grooming'
        form.value.duration = '45 min private session'
        form.value.retailPrice = 75
        form.value.itemCost = 8
        form.value.stock = 12
      } else {
        form.value.title = 'Botanical Paw Protection Balm'
        form.value.description = 'Organic cold-pressed butter and calendula extract for cracked paws, dry noses, and active pads.'
        form.value.category = 'Topical Balms'
        form.value.petType = 'All Pets'
        form.value.retailPrice = 22
        form.value.itemCost = 4.5
        form.value.stock = 35
      }
    }
  },
  { immediate: true }
)

const marginPct = computed(() => {
  if (!form.value.retailPrice || form.value.retailPrice <= 0) return '0.00%'
  const cost = form.value.itemCost || 0
  const margin = ((form.value.retailPrice - cost) / form.value.retailPrice) * 100
  return `${Math.max(0, margin).toFixed(2)}%`
})

const profitVal = computed(() => {
  const profit = (form.value.retailPrice || 0) - (form.value.itemCost || 0)
  return `$${Math.max(0, profit).toFixed(2)}`
})

const sampleImages = [
  'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&auto=format&fit=crop&q=80'
]

const handleSave = () => {
  const title = form.value.title.trim() || (drawerMode.value === 'service' ? 'New Holistic Service' : 'New Artisan Product')
  const price = Math.max(1, form.value.retailPrice || 15)
  const cost = Math.max(0, form.value.itemCost || 0)
  const stockCount = Math.max(1, form.value.stock || 10)

  if (editingItem.value) {
    if (drawerMode.value === 'service') {
      updateItem(editingItem.value.id, {
        name: title,
        variantSubtitle: form.value.duration || '45 min private session',
        type: 'Service',
        price: `$${price.toFixed(2)}`,
        numericPrice: price,
        margin: `${marginPct.value} margin`,
        stock: `${stockCount} slots this week`,
        stockColor: 'text-blue-700',
        dotColor: 'bg-blue-500'
      })
    } else {
      updateItem(editingItem.value.id, {
        name: title,
        type: 'Product',
        price: `$${price.toFixed(2)}`,
        numericPrice: price,
        margin: `${marginPct.value} margin ($${cost.toFixed(2)} cost)`,
        stock: `${stockCount} units`,
        stockColor: stockCount <= 5 ? 'text-rose-600' : 'text-stone-700',
        dotColor: stockCount <= 5 ? 'bg-rose-500' : 'bg-emerald-500'
      })
    }
  } else {
    if (drawerMode.value === 'service') {
      addItem({
        name: title,
        variantSubtitle: form.value.duration || '45 min private session',
        type: 'Service',
        price: `$${price.toFixed(2)}`,
        numericPrice: price,
        margin: `${marginPct.value} margin`,
        stock: `${stockCount} slots this week`,
        stockColor: 'text-blue-700',
        dotColor: 'bg-blue-500',
        isActive: true,
        image: null
      })
    } else {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
      addItem({
        name: title,
        variantSubtitle: '1 variant',
        type: 'Product',
        price: `$${price.toFixed(2)}`,
        numericPrice: price,
        margin: `${marginPct.value} margin ($${cost.toFixed(2)} cost)`,
        stock: `${stockCount} units`,
        stockColor: stockCount <= 5 ? 'text-rose-600' : 'text-stone-700',
        dotColor: stockCount <= 5 ? 'bg-rose-500' : 'bg-emerald-500',
        isActive: true,
        image: randomImage
      })
    }
  }

  closeDrawer()
}
</script>
