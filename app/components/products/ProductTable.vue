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
                <button
                  type="button"
                  @click="$emit('edit-item', item)"
                  class="p-1 hover:text-stone-700 transition-colors"
                  title="Edit item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <!-- Duplicate -->
                <button
                  type="button"
                  @click="duplicateItem(item.id)"
                  class="p-1 hover:text-stone-700 transition-colors"
                  title="Duplicate item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
                <!-- Delete -->
                <button
                  type="button"
                  @click="deleteItem(item.id)"
                  class="p-1 hover:text-rose-600 transition-colors"
                  title="Delete item"
                >
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
import { useProducts, type InventoryItem } from '~/composables/useProducts'

defineEmits<{
  (e: 'edit-item', item: InventoryItem): void
}>()

const { items, deleteItem, duplicateItem } = useProducts()
</script>
