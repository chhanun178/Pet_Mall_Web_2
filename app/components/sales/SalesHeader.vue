<template>
  <div class="space-y-6">
    <!-- Vendor Storefront Identity & Period Actions -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- Avatar with Verified Merchant Badge -->
        <div class="relative w-16 h-16 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=160&auto=format&fit=crop&q=80"
            alt="Velvet Paws Atelier & Apothecary"
            class="w-full h-full rounded-2xl object-cover ring-1 ring-stone-200/80"
          />
          <span
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center ring-2 ring-white text-white shadow-sm"
            title="Verified Merchant"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>

        <!-- Identity Info -->
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-xl font-bold text-stone-900 tracking-tight leading-snug">
              Velvet Paws Atelier & Apothecary
            </h1>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F4F1EA] text-stone-700 text-xs font-semibold">
              <svg class="w-3.5 h-3.5 text-[#C86400]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Stall #VP-892
            </span>
          </div>
          <p class="text-sm text-stone-600 leading-relaxed font-medium">
            Botanical balms, small-batch herbal tinctures, and bespoke holistic pet rituals
          </p>
        </div>
      </div>

      <!-- Right Controls: Period Dropdown & Download Report -->
      <div class="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
        <!-- Period Selector -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D46213]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 2v4M8 2v4m-5 4h18" />
            </svg>
          </div>
          <select
            v-model="selectedPeriod"
            class="appearance-none pl-10 pr-8 py-2 rounded-xl bg-white border border-warm-200 text-sm font-semibold text-stone-800 hover:border-stone-400 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer"
          >
            <option value="30d">Last 30 Days</option>
            <option value="7d">Last 7 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-500">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Download Sales Report Button -->
        <button
          @click="downloadSalesReport"
          type="button"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50/50 text-[#2563EB] text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <svg class="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Sales Report</span>
        </button>
      </div>
    </div>

    <!-- Sales & Transactions Subheading + Live Sync Indicator -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-stone-900">Sales & Transactions</h2>
        <p class="text-sm text-stone-600 mt-0.5 font-medium">
          Review gross merchant volume, physical product vs. holistic service revenue ratios, and reconciled payouts.
        </p>
      </div>

      <div class="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 self-start sm:self-center">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Store ledger live-synced</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSales } from '~/composables/useSales'

const { selectedPeriod, downloadSalesReport } = useSales()
</script>
