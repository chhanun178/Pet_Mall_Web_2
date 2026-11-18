<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
    <!-- Search Bar -->
    <div class="relative flex-1 max-w-md">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-warm-200 text-stone-800 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-brand-500 shadow-sm"
      />
    </div>

    <!-- Filter Dropdowns -->
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- Category Filter -->
      <div class="relative">
        <select
          v-model="selectedCategory"
          class="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-warm-200 text-xs sm:text-sm font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="balms">Topical Balms</option>
          <option value="calming">Calming Oils</option>
          <option value="wellness">Supplements</option>
          <option value="services">Holistic Services</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Stock Filter -->
      <div class="relative">
        <select
          v-model="selectedStock"
          class="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-warm-200 text-xs sm:text-sm font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer"
        >
          <option value="all">Stock: All Statuses</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock (≤ 5)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Sort Filter -->
      <div class="relative">
        <select
          v-model="selectedSort"
          class="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-warm-200 text-xs sm:text-sm font-medium text-stone-700 hover:border-stone-300 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer"
        >
          <option value="newest">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock">Highest Stock</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedStock = ref('all')
const selectedSort = ref('newest')
</script>
