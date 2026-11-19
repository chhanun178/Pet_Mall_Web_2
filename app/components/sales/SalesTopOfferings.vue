<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card h-full flex flex-col justify-between">
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xl font-bold text-stone-900 leading-snug">Top Grossing Offerings</h2>
        <span class="text-xs font-bold text-[#D46213] shrink-0">By Revenue</span>
      </div>
      <p class="text-sm text-stone-600 mt-1 leading-relaxed font-medium">
        Highest revenue generators across apothecary & booking channels.
      </p>

      <!-- Offerings List -->
      <div class="mt-4 space-y-3">
        <div
          v-for="item in topOfferings"
          :key="item.rank"
          class="p-3.5 rounded-xl bg-warm-50/70 border border-warm-200/80 flex items-start justify-between gap-3"
        >
          <div class="flex items-start gap-3 min-w-0">
            <!-- Rank Circle -->
            <span
              class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
              :class="
                item.rank === 1
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-50 text-blue-700'
              "
            >
              {{ item.rank }}
            </span>

            <div class="min-w-0">
              <div class="text-sm font-bold text-stone-900 leading-snug">
                {{ item.name }}
              </div>
              <div class="text-xs text-stone-500 font-medium mt-1">
                {{ item.subtitle }}
              </div>
            </div>
          </div>

          <div class="text-right shrink-0">
            <div class="text-sm font-bold text-stone-900 leading-snug">{{ item.revenue }}</div>
            <div
              class="text-xs font-semibold mt-1"
              :class="item.badgeType === 'margin' ? 'text-emerald-600' : 'text-sky-700'"
            >
              {{ item.badgeText }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Summary Banner -->
    <div class="mt-4 px-3.5 py-2.5 rounded-xl bg-[#F0F7FF] border border-[#D0E6FF] flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs font-bold text-stone-800">
        <svg class="w-5 h-5 text-[#1D68E2] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span>Net profit margin average</span>
      </div>
      <span class="text-sm font-extrabold text-[#1D68E2]">71.4%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSales } from '~/composables/useSales'

const { topOfferings } = useSales()
</script>
