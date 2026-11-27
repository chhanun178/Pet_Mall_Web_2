<script setup lang="ts">
import type { ProductSort, StockFilter } from '~/types/products'

defineProps<{ categories: string[] }>()
const search = defineModel<string>('search', { required: true })
const category = defineModel<string>('category', { required: true })
const stock = defineModel<StockFilter>('stock', { required: true })
const sort = defineModel<ProductSort>('sort', { required: true })
</script>

<template>
  <div class="flex flex-col justify-between gap-3 p-4 sm:p-5 xl:flex-row xl:items-center">
    <label class="relative block flex-1">
      <span class="sr-only">Search inventory</span>
      <svg aria-hidden="true" class="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#6b7280]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path stroke-linecap="round" d="m16 16 4.5 4.5" />
      </svg>
      <input v-model="search" type="search" maxlength="160" placeholder="Search" class="catalog-control w-full py-2.5 pl-10 pr-3 placeholder:text-[#141b2b]" />
    </label>

    <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
      <div class="catalog-select">
        <select v-model="category" aria-label="Filter by category" class="catalog-control" :title="category || 'All Categories'">
          <option value="">All Categories</option>
          <option v-for="name in categories" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>

      <div class="catalog-select">
        <select v-model="stock" aria-label="Stock availability" class="catalog-control">
          <option value="all">Stock: All Statuses</option>
          <option value="in_stock">In Stock (&gt; 5)</option>
          <option value="low_stock">Low Stock (1–5)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      <div class="catalog-select col-span-2">
        <select v-model="sort" aria-label="Sort inventory" class="catalog-control">
          <option value="newest">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock">Highest Stock</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-control {
  @apply rounded-lg bg-[#f8f9ff] text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006398] sm:bg-white sm:hover:bg-[#f7f8ff] sm:focus:bg-[#f1f3ff];
}

.catalog-select {
  @apply relative min-w-0;
}

.catalog-select::after {
  content: '';
  @apply pointer-events-none absolute right-3.5 top-1/2 size-1.5 -translate-y-3/4 rotate-45 border-b border-r border-[#6b7280];
}

.catalog-select select {
  @apply w-full cursor-pointer appearance-none truncate py-2.5 pl-2.5 pr-6 sm:w-40 sm:pl-3 sm:pr-8 sm:text-[13px];
}
</style>
