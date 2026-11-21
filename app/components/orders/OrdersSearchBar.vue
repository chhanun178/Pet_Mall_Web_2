<template>
  <div class="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
    <!-- Search Bar -->
    <div class="relative flex-1">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Order ID, Pet Name, Customer..."
        class="w-full pl-10 pr-9 py-2.5 rounded-xl border border-warm-200/90 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-card"
      />
      <button
        v-if="searchQuery"
        @click="searchQuery = ''"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
        title="Clear search"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Dropdowns & Filter Action Row -->
    <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
      <!-- 1. Date Range Dropdown -->
      <div class="relative min-w-[155px]">
        <select
          v-model="selectedDateRange"
          class="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-warm-200/90 bg-white text-xs sm:text-sm font-medium text-stone-700 hover:border-warm-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer shadow-card transition-all"
        >
          <option value="today">Date: Today</option>
          <option value="7days">Date: Last 7 Days</option>
          <option value="30days">Date: Last 30 Days</option>
          <option value="all">Date: All Time</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- 2. Fulfillment Type Dropdown -->
      <div class="relative min-w-[170px]">
        <select
          v-model="selectedFulfillment"
          class="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-warm-200/90 bg-white text-xs sm:text-sm font-medium text-stone-700 hover:border-warm-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer shadow-card transition-all"
        >
          <option value="all">Fulfillment: All Types</option>
          <option value="delivery">Courier Delivery</option>
          <option value="pickup">Store Counter Pickup</option>
          <option value="service">In-Atelier Wellness</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- 3. Sort Dropdown -->
      <div class="relative min-w-[155px]">
        <select
          v-model="selectedSort"
          class="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-warm-200/90 bg-white text-xs sm:text-sm font-medium text-stone-700 hover:border-warm-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer shadow-card transition-all"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="highest_value">Sort: Highest Value</option>
          <option value="lowest_value">Sort: Lowest Value</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- 4. Quick Reset / Filter Icon Button -->
      <button
        @click="resetFilters"
        class="p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors shadow-card flex items-center justify-center shrink-0"
        title="Reset all filters"
      >
        <svg class="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'

const {
  searchQuery,
  selectedDateRange,
  selectedFulfillment,
  selectedSort,
  resetFilters,
} = useOrders()
</script>
