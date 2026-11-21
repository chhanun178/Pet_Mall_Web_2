<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
    <!-- Left: Total Counter text -->
    <p class="text-xs sm:text-sm text-stone-500 font-medium">
      Showing
      <span class="font-bold text-stone-800">{{ paginationInfo.start }}</span>
      -
      <span class="font-bold text-stone-800">{{ paginationInfo.end }}</span>
      of
      <span class="font-bold text-stone-800">{{ paginationInfo.total }}</span>
      total orders & appointments
    </p>

    <!-- Right: Page Controls -->
    <div class="flex items-center gap-1.5 select-none">
      <!-- Previous Page -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="w-8 h-8 rounded-lg border border-warm-200/90 bg-white flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
        title="Previous page"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Page 1 -->
      <button
        @click="goToPage(1)"
        class="w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-2xs"
        :class="
          currentPage === 1
            ? 'bg-[#FB923C] text-stone-900 font-extrabold shadow-xs'
            : 'border border-warm-200/90 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        1
      </button>

      <!-- Page 2 (if exists) -->
      <button
        v-if="totalPages >= 2"
        @click="goToPage(2)"
        class="w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-2xs"
        :class="
          currentPage === 2
            ? 'bg-[#FB923C] text-stone-900 font-extrabold shadow-xs'
            : 'border border-warm-200/90 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        2
      </button>

      <!-- Page 3 (if exists) -->
      <button
        v-if="totalPages >= 3"
        @click="goToPage(3)"
        class="w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-2xs"
        :class="
          currentPage === 3
            ? 'bg-[#FB923C] text-stone-900 font-extrabold shadow-xs'
            : 'border border-warm-200/90 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        3
      </button>

      <!-- Ellipsis if many pages -->
      <span v-if="totalPages > 4" class="px-1 text-xs text-stone-400 font-bold">
        ...
      </span>

      <!-- Last Page (e.g. 14 as in screenshot) -->
      <button
        v-if="totalPages > 3"
        @click="goToPage(totalPages)"
        class="w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-2xs"
        :class="
          currentPage === totalPages
            ? 'bg-[#FB923C] text-stone-900 font-extrabold shadow-xs'
            : 'border border-warm-200/90 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        {{ totalPages }}
      </button>

      <!-- Next Page -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="w-8 h-8 rounded-lg border border-warm-200/90 bg-white flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
        title="Next page"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'

const { currentPage, totalPages, paginationInfo } = useOrders()

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll smoothly to top of orders list
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }
}
</script>
