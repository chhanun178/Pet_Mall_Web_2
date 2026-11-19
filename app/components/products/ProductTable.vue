<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 shadow-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-warm-50/70 border-b border-warm-200/80 text-xs font-bold uppercase tracking-wider text-stone-600 leading-normal">
            <th class="py-4 px-5 sm:px-6">Item</th>
            <th class="py-4 px-4">Type</th>
            <th class="py-4 px-4">Retail & Margin</th>
            <th class="py-4 px-4">Stock</th>
            <th class="py-4 px-4 text-center">Status</th>
            <th class="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-warm-100 text-sm">
          <tr v-for="item in items" :key="item.id" class="odd:bg-white even:bg-warm-50 align-top">
            <!-- Item Details -->
            <td class="py-5 px-5 sm:px-6 align-top">
              <div class="flex items-start gap-3.5">
                <div
                  class="w-12 h-12 rounded-xl bg-amber-50 border border-warm-200 overflow-hidden shrink-0 flex items-center justify-center">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  <!-- Service Icon -->
                  <div v-else class="w-full h-full bg-blue-50/80 text-blue-600 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="font-bold text-stone-900 text-sm leading-snug">
                    {{ item.name }}
                  </div>
                  <div class="text-xs text-stone-500 mt-1.5 leading-relaxed font-medium">
                    {{ item.variantSubtitle }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Listing Type -->
            <td class="py-5 px-4 align-top">
              <span v-if="item.type === 'Product'" class="text-xs font-semibold text-stone-700 leading-snug inline-block">
                Product
              </span>
              <span v-else
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200/80 leading-snug">
                Service
              </span>
            </td>

            <!-- Retail & Margin -->
            <td class="py-5 px-4 align-top">
              <div class="font-bold text-stone-900 text-sm leading-snug">{{ item.price }}</div>
              <div class="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
                {{ item.margin }}
              </div>
            </td>

            <!-- Stock / Availability -->
            <td class="py-5 px-4 align-top">
              <div class="text-xs font-semibold leading-snug" :class="item.stockColor">
                {{ item.stock.replace(/\s+in stock$/i, '') }}
              </div>
            </td>

            <!-- Status Toggle -->
            <td class="py-5 px-4 text-center align-top">
              <BaseToggle v-model="item.isActive" />
            </td>

            <!-- Quick Action Icons -->
            <td class="py-5 px-6 text-right align-top">
              <div class="inline-flex items-center gap-2.5 text-stone-500">
                <!-- Edit -->
                <button type="button" @click="openEdit(item)" class="p-1 hover:text-stone-900 transition-colors"
                  title="Edit item">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <!-- Duplicate -->
                <button type="button" @click="duplicateItem(item.id)" class="p-1 hover:text-stone-900 transition-colors"
                  title="Duplicate item">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <!-- Delete -->
                <button type="button" @click="deleteItem(item.id)" class="p-1 hover:text-rose-600 transition-colors"
                  title="Delete item">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
import BaseToggle from '~/components/ui/BaseToggle.vue'
import { useProducts } from '~/composables/useProducts'

const { items, deleteItem, duplicateItem, openEdit } = useProducts()
</script>
