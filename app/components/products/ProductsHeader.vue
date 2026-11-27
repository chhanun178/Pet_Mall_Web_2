<script setup lang="ts">
import type { ListingType } from '~/types/products'

defineProps<{
  storeName: string
  storeSlug: string
  initials: string
  disabled: boolean
}>()

const emit = defineEmits<{ add: [type: ListingType] }>()
</script>

<template>
  <div>
    <div class="mb-8 flex items-center gap-4 sm:gap-5">
      <div class="grid size-14 shrink-0 place-items-center rounded-full bg-[#fce8d3] text-lg font-bold text-[#9d4300] sm:size-20 sm:text-2xl" aria-hidden="true">
        {{ initials }}
      </div>
      <div class="min-w-0">
        <p class="break-words text-xl font-bold leading-tight tracking-tight sm:text-2xl">{{ storeName }}</p>
        <p v-if="storeSlug" class="mt-1 break-words text-sm text-[#6b7280]">Marketplace storefront <span class="text-[#584237]">· {{ storeSlug }}</span></p>
      </div>
    </div>

    <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Inventory Catalog</h1>
        <p class="mt-0.5 text-sm text-[#6b7280]">Manage your products and services.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button
          v-for="type in (['product', 'service'] as const)"
          :key="type"
          type="button"
          :disabled="disabled"
          class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-[#006398] shadow-sm transition hover:bg-[#f1f3ff] enabled:active:scale-[0.98] disabled:opacity-50 sm:px-4"
          @click="emit('add', type)"
        >
          <svg aria-hidden="true" class="size-5 text-[#00a2f4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8m-4-4h8" stroke-linecap="round" />
          </svg>
          {{ type === 'product' ? 'Add New Product' : 'Add New Service' }}
        </button>
      </div>
    </div>
  </div>
</template>
