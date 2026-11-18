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
          <h2 class="text-lg font-bold text-stone-900">Add a new product</h2>
          <button
            @click="$emit('close')"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form Content -->
        <div class="p-6 space-y-6 text-xs sm:text-sm">
          <!-- 1. Basic Information -->
          <div class="space-y-4">
            <h3 class="font-bold text-stone-900 text-sm">Basic Information</h3>

            <!-- Product Title -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">Product Title</label>
              <input
                type="text"
                v-model="form.title"
                class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
              />
            </div>

            <!-- Product Description -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">Product Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm resize-none leading-relaxed"
              ></textarea>
            </div>

            <!-- Category & Pet Type -->
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Category</label>
                <div class="relative">
                  <select
                    v-model="form.category"
                    class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm pr-8 bg-white cursor-pointer font-medium"
                  >
                    <option>Topical Balms</option>
                    <option>Ear Care</option>
                    <option>Supplements</option>
                    <option>Accessories</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-1.5">
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
            </div>
          </div>

          <!-- 2. Pricing & Inventory -->
          <div class="space-y-4 pt-4 border-t border-warm-100">
            <h3 class="font-bold text-stone-900 text-sm">Pricing & Inventory</h3>

            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Retail Price</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 text-xs">$</span>
                  <input
                    type="number"
                    v-model="form.retailPrice"
                    class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-stone-600">Item Cost</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 text-xs">$</span>
                  <input
                    type="number"
                    v-model="form.itemCost"
                    step="0.1"
                    class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-warm-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Margin / Profit Banner -->
            <div class="px-4 py-3 rounded-xl bg-slate-100/80 flex items-center justify-between text-xs font-medium">
              <span class="text-stone-500">Margin / Profit</span>
              <span class="font-bold text-stone-900">73.75% / $11.80</span>
            </div>

            <!-- Stock Quantity -->
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold text-stone-600">Stock Quantity</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4m-5 4h18"/>
                  </svg>
                </span>
                <input
                  type="number"
                  v-model="form.stock"
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
              <span class="text-xs text-stone-500 font-medium">Click to upload product image</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="p-5 border-t border-warm-200 flex items-center justify-end gap-3 bg-white">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="$emit('close')"
          class="px-5 py-2.5 rounded-xl bg-[#F58700] hover:bg-[#E07A00] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
        >
          Save
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const form = ref({
  title: 'Chamomile & Oat Soothing Paw Balm',
  description: 'Crafted in small batches using whole organic chamomile flower extract and finely ground colloidal oat groats. Deeply nourishing for cracked pads and dry noses.',
  category: 'Topical Balms',
  petType: 'All Pets',
  retailPrice: 16,
  itemCost: 4.2,
  stock: 45
})
</script>
