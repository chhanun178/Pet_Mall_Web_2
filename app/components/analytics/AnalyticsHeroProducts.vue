<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 flex-wrap mb-5">
      <div>
        <h2 class="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
          High-Impact Hero Products
        </h2>
        <p class="text-xs text-stone-600 mt-0.5">
          Highest engagement to conversion ratios this period
        </p>
      </div>

      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-1 text-xs font-bold text-[#0D627A] hover:text-[#094B5E] hover:underline transition-colors"
      >
        <span>Full Inventory Performance</span>
        <span>→</span>
      </NuxtLink>
    </div>

    <!-- 3 Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="item in heroProducts"
        :key="item.id"
        class="p-4 rounded-xl border border-warm-200/90 bg-warm-50/40 hover:bg-white hover:border-brand-300 hover:shadow-card transition-all flex items-center gap-3.5 group cursor-pointer"
      >
        <!-- Product / Service Thumbnail Image -->
        <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-warm-200 bg-white">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <!-- Info & Badges -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span
              class="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border"
              :class="item.badgeColorClass"
            >
              {{ item.badgeLabel }}
            </span>
            <span class="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60">
              {{ item.conversionRate }}
            </span>
          </div>

          <h3 class="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-brand-600 transition-colors mt-1.5 truncate">
            {{ item.title }}
          </h3>

          <p class="text-xs text-stone-600 font-medium mt-0.5">
            {{ item.unitsLabel }} • <span class="text-stone-900 font-bold">${{ item.revenue.toLocaleString() }} rev</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { heroProducts } = useAnalytics()
</script>
