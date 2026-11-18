<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 shadow-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-warm-50/70 border-b border-warm-200/80 text-[11px] font-bold uppercase tracking-wider text-stone-400">
            <th class="py-3.5 px-5 sm:px-6">Item</th>
            <th class="py-3.5 px-4">Listing Type</th>
            <th class="py-3.5 px-4">Retail & Margin</th>
            <th class="py-3.5 px-4">Stock / Availability</th>
            <th class="py-3.5 px-4 text-center">Status</th>
            <th class="py-3.5 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-warm-100 text-sm">
          <tr
            v-for="item in items"
            :key="item.id"
            class="hover:bg-warm-50/40 transition-colors"
          >
            <!-- Item Details -->
            <td class="py-4 px-5 sm:px-6">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-amber-50 border border-warm-200 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  />
                  <!-- Service Icon -->
                  <div v-else class="w-full h-full bg-blue-50/80 text-blue-600 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div class="font-bold text-stone-900 text-sm hover:text-brand-600 cursor-pointer transition-colors">
                    {{ item.name }}
                  </div>
                  <div class="text-xs text-stone-400 mt-0.5">
                    {{ item.variantSubtitle }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Listing Type -->
            <td class="py-4 px-4">
              <span
                v-if="item.type === 'Product'"
                class="text-xs font-semibold text-stone-700"
              >
                Product
              </span>
              <span
                v-else
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200/80"
              >
                Service
              </span>
            </td>

            <!-- Retail & Margin -->
            <td class="py-4 px-4">
              <div class="font-bold text-stone-900 leading-tight">{{ item.price }}</div>
              <div class="text-xs text-stone-400 mt-0.5 leading-tight">
                {{ item.margin }}
              </div>
            </td>

            <!-- Stock / Availability -->
            <td class="py-4 px-4">
              <div
                class="flex items-center gap-1.5 text-xs font-semibold"
                :class="item.stockColor"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="item.dotColor"></span>
                <span>{{ item.stock }}</span>
              </div>
            </td>

            <!-- Status Toggle -->
            <td class="py-4 px-4 text-center">
              <BaseToggle v-model="item.isActive" />
            </td>

            <!-- Quick Action Icons -->
            <td class="py-4 px-6 text-right">
              <div class="inline-flex items-center gap-2 text-stone-400">
                <!-- Edit -->
                <button @click="$emit('edit-item', item)" class="p-1 hover:text-stone-700 transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <!-- Duplicate -->
                <button class="p-1 hover:text-stone-700 transition-colors" title="Duplicate">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
                <!-- Sync / Variants -->
                <button class="p-1 hover:text-stone-700 transition-colors" title="Sync variants">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <!-- Delete -->
                <button class="p-1 hover:text-rose-600 transition-colors" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  (e: 'edit-item', item: any): void
}>()

const items = ref([
  {
    id: 1,
    name: 'Chamomile & Oat Soothing Paw Balm (60ml)',
    variantSubtitle: '3 size options',
    type: 'Product',
    price: '$16.00',
    margin: '73.75% margin ($4.20 cost)',
    stock: '45 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Organic Lavender Calming Dropper (30ml)',
    variantSubtitle: '2 flavor variants',
    type: 'Product',
    price: '$24.00',
    margin: '68.00% margin ($7.68 cost)',
    stock: '18 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Probiotic Skin & Coat Chewables (90ct)',
    variantSubtitle: '1 variant',
    type: 'Product',
    price: '$32.50',
    margin: '62.50% margin ($12.18 cost)',
    stock: '62 units in stock',
    stockColor: 'text-stone-700',
    dotColor: 'bg-emerald-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Herbal Ear Rinse & Botanical Dropper',
    variantSubtitle: '2 size options',
    type: 'Product',
    price: '$18.00',
    margin: '70.00% margin ($5.40 cost)',
    stock: '4 units in stock',
    stockColor: 'text-rose-600',
    dotColor: 'bg-rose-500',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Holistic Canine Acupressure Consultation',
    variantSubtitle: '60 min private session',
    type: 'Service',
    price: '$65.00',
    margin: '95.00% margin',
    stock: '8 slots this week',
    stockColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
    isActive: true,
    image: null,
  },
])
</script>
