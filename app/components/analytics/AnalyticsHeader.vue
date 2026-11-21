<template>
  <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
    <!-- Left: Shop Avatar & Title Info -->
    <div class="flex items-center gap-3.5">
      <!-- Shop Avatar with Live Indicator -->
      <div class="relative shrink-0">
        <div class="w-12 h-12 rounded-2xl bg-amber-900/10 border border-warm-300 overflow-hidden shadow-xs flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&auto=format&fit=crop&q=80"
            alt="Artisan Paws Co."
            class="w-full h-full object-cover"
          />
        </div>
        <span
          class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20"
          title="Telemetry Active & Synchronized"
        ></span>
      </div>

      <!-- Title & Subtitle -->
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-2xl font-bold text-stone-900 tracking-tight">Storefront Analytics</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D46213] border border-[#FED7AA]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
            Live Telemetry
          </span>
        </div>
        <p class="text-xs sm:text-sm text-stone-600 mt-0.5">
          Understand customer engagement, conversion funnels, top search queries, and pet demographic trends.
        </p>
      </div>
    </div>

    <!-- Right: Filter Controls Bar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start xl:self-auto shrink-0 flex-wrap">
      <!-- Top Row Controls: Date & Segment -->
      <div class="flex items-center gap-2">
        <!-- Date Range Dropdown -->
        <div class="relative">
          <select
            v-model="selectedDateRange"
            @change="handleDateChange"
            class="appearance-none bg-white border border-warm-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs sm:text-sm font-semibold text-stone-700 hover:border-warm-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-xs cursor-pointer"
          >
            <option value="7days">Past 7 Days</option>
            <option value="30days">Past 30 Days</option>
            <option value="90days">Past 90 Days</option>
            <option value="12months">Past 12 Months</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Audience Segment Dropdown -->
        <div class="relative">
          <select
            v-model="selectedAudience"
            @change="handleAudienceChange"
            class="appearance-none bg-white border border-warm-200/90 rounded-xl px-3.5 py-2 pr-8 text-xs sm:text-sm font-semibold text-stone-700 hover:border-warm-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-xs cursor-pointer"
          >
            <option value="all">All Visitors</option>
            <option value="new">New Visitors</option>
            <option value="returning">Returning Buyers</option>
            <option value="vip">VIP Members</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Bottom Row / Inline: Pet Cohort Filters & Export Button -->
      <div class="flex items-center gap-2">
        <!-- Pet Type Pills -->
        <div class="inline-flex items-center bg-warm-100/80 p-0.5 rounded-xl border border-warm-200/80">
          <button
            @click="setPetFilter('all')"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            :class="selectedPetFilter === 'all'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'"
          >
            All Pets
          </button>
          <button
            @click="setPetFilter('dogs')"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            :class="selectedPetFilter === 'dogs'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'"
          >
            Dogs
          </button>
          <button
            @click="setPetFilter('cats')"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            :class="selectedPetFilter === 'cats'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'"
          >
            Cats
          </button>
        </div>

        <!-- Download Report Button -->
        <button
          @click="exportAnalyticsReport('csv')"
          class="w-9 h-9 rounded-xl bg-[#0D627A] hover:bg-[#094B5E] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95"
          title="Export CSV Telemetry Report"
        >
          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'
import type { DateRange, AudienceSegment } from '~/types/analytics'

const {
  selectedDateRange,
  selectedAudience,
  selectedPetFilter,
  setDateRange,
  setAudience,
  setPetFilter,
  exportAnalyticsReport,
} = useAnalytics()

const handleDateChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  setDateRange(target.value as DateRange)
}

const handleAudienceChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  setAudience(target.value as AudienceSegment)
}
</script>
