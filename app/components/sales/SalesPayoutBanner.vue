<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="flex items-start sm:items-center gap-3.5">
      <!-- Bank Building Icon -->
      <div class="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/70 text-[#B45309] flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M4 10v8m4-8v8m4-8v8m4-8v8m4-8v8M2 18h20M12 3l9 5H3l9-5z" />
        </svg>
      </div>

      <div>
        <h3 class="text-sm font-bold text-stone-900 leading-snug">
          Next Scheduled Payout: Wednesday, Nov 20
        </h3>
        <p class="text-xs text-stone-600 mt-1 font-medium leading-relaxed">
          Est. transfer amount of <strong class="font-bold text-stone-900">$3,420.50</strong> to Silicon Valley Bank (checking ending in •••• 6192).
        </p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center">
      <button
        type="button"
        @click="manageBanking"
        class="px-3.5 py-2 rounded-xl border border-warm-200 bg-white hover:bg-warm-50 text-stone-800 text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        Manage Banking
      </button>

      <button
        type="button"
        @click="requestExpressPayout"
        class="px-3.5 py-2 rounded-xl border border-transparent bg-[#9A3412] hover:bg-[#7C2D12] text-white text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        Request Express Payout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSales } from '~/composables/useSales'

const { manageBanking, requestExpressPayout } = useSales()
</script>
