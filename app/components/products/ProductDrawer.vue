<template>
  <div v-if="isOpen">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-stone-900/40 backdrop-blur-[2px] z-50 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Slide-over Panel -->
    <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-warm-200 flex flex-col justify-between overflow-y-auto">
      <div>
        <!-- Drawer Header -->
        <div class="p-6 border-b border-warm-200/80 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span
              class="w-2.5 h-2.5 rounded-full"
              :class="mode === 'service' ? 'bg-blue-500' : 'bg-[#F58700]'"
            ></span>
            <h2 class="text-lg font-bold text-stone-900">
              {{ mode === 'service' ? 'Add a new service' : 'Add a new product' }}
            </h2>
          </div>
          <button
            @click="$emit('close')"
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="handleSave" class="p-6 space-y-6 text-xs sm:text-sm">
          <!-- 1. Basic Information -->
          <div class="space-y-4">
            <h3 class="font-bold text-stone-900 text-sm">Basic Information</h3>

            <!-- Title / Name -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">
                {{ mode === 'service' ? 'Service Title' : 'Product Title' }}
              </label>
              <input
                type="text"
                v-model="form.title"
                required
                :placeholder="mode === 'service' ? 'e.g. Herbal Paw Soak & Relax' : 'e.g. Organic Chamomile Paw Balm'"
                class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
              />
            </div>

            <!-- Description -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">
                {{ mode === 'service' ? 'Service Description' : 'Product Description' }}
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Enter description and details..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm resize-none leading-relaxed"
              ></textarea>
            </div>

            <!-- Category & Pet/Service Type -->
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Category</label>
                <div class="relative">
                  <select
                    v-model="form.category"
                    class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm pr-8 bg-white cursor-pointer font-medium"
                  >
                    <template v-if="mode === 'product'">
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
                  <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Product: Pet Type | Service: Duration -->
              <div v-if="mode === 'product'" class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Pet Type</label>
                <div class="relative">
                  <select
                    v-model="form.petType"
                    class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm pr-8 bg-white cursor-pointer font-medium"
                  >
                    <option>All Pets</option>
                    <option>Dogs Only</option>
                    <option>Cats Only</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div v-else class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Session Duration</label>
                <input
                  type="text"
                  v-model="form.duration"
                  placeholder="e.g. 45 min private session"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          <!-- 2. Pricing & Inventory -->
          <div class="space-y-4 pt-4 border-t border-warm-100">
            <h3 class="font-bold text-stone-900 text-sm">
              {{ mode === 'service' ? 'Pricing & Availability' : 'Pricing & Inventory' }}
            </h3>

            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">
                  {{ mode === 'service' ? 'Session Price' : 'Retail Price' }}
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 text-xs">$</span>
                  <input
                    type="number"
                    v-model.number="form.retailPrice"
                    min="1"
                    step="0.5"
                    required
                    class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">
                  {{ mode === 'service' ? 'Material / Cost' : 'Item Cost' }}
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 text-xs">$</span>
                  <input
                    type="number"
                    v-model.number="form.itemCost"
                    min="0"
                    step="0.1"
                    class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Margin / Profit Banner -->
            <div class="px-4 py-3 rounded-xl bg-slate-100/80 flex items-center justify-between text-xs font-medium">
              <span class="text-stone-500">Margin / Profit</span>
              <span class="font-bold text-stone-900">{{ marginPct }} / {{ profitVal }}</span>
            </div>

            <!-- Stock or Slots -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">
                {{ mode === 'service' ? 'Weekly Available Slots' : 'Stock Quantity' }}
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4m-5 4h18"/>
                  </svg>
                </span>
                <input
                  type="number"
                  v-model.number="form.stock"
                  min="1"
                  required
                  class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          <!-- 3. Media Upload -->
          <div class="space-y-3 pt-4 border-t border-warm-100">
            <h3 class="font-bold text-stone-900 text-sm">Media</h3>
            <div class="border-2 border-dashed border-warm-200/90 rounded-2xl p-6 flex flex-col items-center justify-center text-stone-400 hover:border-brand-400 hover:bg-brand-50/20 transition-all cursor-pointer">
              <div class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
              </div>
              <span class="text-xs text-stone-500 font-medium">Click to upload image or photo</span>
            </div>
          </div>

          <!-- Drawer Footer inside form -->
          <div class="pt-5 border-t border-warm-200 flex items-center justify-end gap-3 bg-white">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-[#F58700] hover:bg-[#E07A00] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {{ mode === 'service' ? 'Save Service' : 'Save Product' }}
            </button>
          </div>
        </form>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useProducts } from '~/composables/useProducts'

const props = withDefaults(defineProps<{
  isOpen: boolean
  mode?: 'product' | 'service'
  editItem?: any
}>(), {
  mode: 'product',
  editItem: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved'): void
}>()

const { addItem } = useProducts()

const form = ref({
  title: '',
  description: '',
  category: 'Topical Balms',
  petType: 'All Pets',
  duration: '45 min private session',
  retailPrice: 20,
  itemCost: 5,
  stock: 25,
})

// Populate form when opened or mode changed
watch(() => props.isOpen, (open) => {
  if (open) {
    if (props.editItem) {
      form.value.title = props.editItem.name
      form.value.retailPrice = props.editItem.numericPrice || 20
      form.value.category = props.mode === 'service' ? 'Spa & Grooming' : 'Topical Balms'
      form.value.stock = 30
    } else {
      form.value.title = props.mode === 'service' ? 'Canine Herbal Coat & Spa Ritual' : 'Botanical Paw Protection Balm'
      form.value.description = props.mode === 'service'
        ? 'Holistic consultation and soothing coat soak using certified organic tinctures and calm lavender.'
        : 'Organic cold-pressed butter and calendula extract for cracked paws, dry noses, and active pads.'
      form.value.category = props.mode === 'service' ? 'Spa & Grooming' : 'Topical Balms'
      form.value.duration = '45 min private session'
      form.value.retailPrice = props.mode === 'service' ? 75 : 22
      form.value.itemCost = props.mode === 'service' ? 8 : 4.5
      form.value.stock = props.mode === 'service' ? 12 : 35
    }
  }
})

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
  if (props.mode === 'service') {
    addItem({
      name: form.value.title,
      variantSubtitle: form.value.duration || '45 min private session',
      type: 'Service',
      price: `$${Number(form.value.retailPrice).toFixed(2)}`,
      numericPrice: Number(form.value.retailPrice),
      margin: `${marginPct.value} margin`,
      stock: `${form.value.stock} slots this week`,
      stockColor: 'text-blue-700',
      dotColor: 'bg-blue-500',
      isActive: true,
      image: null
    })
  } else {
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    addItem({
      name: form.value.title,
      variantSubtitle: '1 variant',
      type: 'Product',
      price: `$${Number(form.value.retailPrice).toFixed(2)}`,
      numericPrice: Number(form.value.retailPrice),
      margin: `${marginPct.value} margin ($${Number(form.value.itemCost).toFixed(2)} cost)`,
      stock: `${form.value.stock} units in stock`,
      stockColor: Number(form.value.stock) <= 5 ? 'text-rose-600' : 'text-stone-700',
      dotColor: Number(form.value.stock) <= 5 ? 'bg-rose-500' : 'bg-emerald-500',
      isActive: true,
      image: randomImage
    })
  }

  emit('saved')
  emit('close')
}
</script>
