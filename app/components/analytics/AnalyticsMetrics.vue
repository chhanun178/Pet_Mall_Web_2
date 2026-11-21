<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
    <!-- Card 1: Total Storefront Visits -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-sky-300 transition-all group">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-sky-700 transition-colors">
          Total Storefront Visits
        </span>
        <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-extrabold tracking-tight text-stone-900">
            {{ metrics.storefrontVisits.value }}
          </span>
          <span class="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {{ metrics.storefrontVisits.delta }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs text-stone-600 font-medium pt-1 border-t border-warm-100">
          <span>{{ metrics.storefrontVisits.subtextLeft }}</span>
          <span>{{ metrics.storefrontVisits.subtextRight }}</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Unique Pet Owners -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-amber-300 transition-all group">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-amber-700 transition-colors">
          Unique Pet Owners
        </span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <!-- Paw print icon -->
            <ellipse cx="8.5" cy="6" rx="2" ry="2.8"/>
            <ellipse cx="15.5" cy="6" rx="2" ry="2.8"/>
            <ellipse cx="4.5" cy="11" rx="2" ry="2.8"/>
            <ellipse cx="19.5" cy="11" rx="2" ry="2.8"/>
            <path d="M12 11.5c-3.2 0-5.8 2.2-5.8 5.2 0 2 1.7 3.8 3.8 3.8 1.1 0 1.5-.6 2-.6s.9.6 2 .6c2.1 0 3.8-1.8 3.8-3.8 0-3-2.6-5.2-5.8-5.2z"/>
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-extrabold tracking-tight text-stone-900">
            {{ metrics.uniquePetOwners.value }}
          </span>
          <span class="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {{ metrics.uniquePetOwners.delta }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs text-stone-600 font-medium pt-1 border-t border-warm-100">
          <span>{{ metrics.uniquePetOwners.subtextLeft }}</span>
          <span>{{ metrics.uniquePetOwners.subtextRight }}</span>
        </div>
      </div>
    </div>

    <!-- Card 3: Storefront Conversion -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-blue-300 transition-all group">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-blue-700 transition-colors">
          Storefront Conversion
        </span>
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-extrabold tracking-tight text-stone-900">
            {{ metrics.storefrontConversion.value }}
          </span>
          <span class="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {{ metrics.storefrontConversion.delta }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs font-medium pt-1 border-t border-warm-100">
          <span class="text-stone-600">{{ metrics.storefrontConversion.subtextLeft }}</span>
          <span class="text-emerald-600 font-bold">{{ metrics.storefrontConversion.subtextRight }}</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Repeat Customer Rate -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-orange-300 transition-all group">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-orange-700 transition-colors">
          Repeat Customer Rate
        </span>
        <div class="w-9 h-9 rounded-xl bg-orange-50 text-[#EA580C] border border-orange-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-extrabold tracking-tight text-stone-900">
            {{ metrics.repeatCustomerRate.value }}
          </span>
          <span class="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            {{ metrics.repeatCustomerRate.delta }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs font-medium pt-1 border-t border-warm-100">
          <span class="text-stone-600">{{ metrics.repeatCustomerRate.subtextLeft }}</span>
          <span class="text-[#D46213] font-bold">{{ metrics.repeatCustomerRate.subtextRight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { metrics } = useAnalytics()
</script>
