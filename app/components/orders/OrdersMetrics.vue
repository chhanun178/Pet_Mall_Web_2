<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
    <!-- Card 1: Awaiting Dispatch -->
    <div
      @click="setActiveTab('Needs Packing')"
      class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-brand-300 transition-all cursor-pointer group"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-brand-600 transition-colors">
          Awaiting Dispatch
        </span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">
          {{ metrics.awaitingDispatch.count }}
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-[#EA580C] font-bold border border-amber-200/60">
            {{ metrics.awaitingDispatch.delta }}
          </span>
          <span class="text-stone-600 font-medium">needs packing</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Scheduled Bookings -->
    <div
      @click="handleSelectServiceBookings"
      class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-blue-600 transition-colors">
          Scheduled Bookings
        </span>
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">
          {{ metrics.scheduledBookings.count }}
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200/60">
            {{ metrics.scheduledBookings.label }}
          </span>
          <span class="text-stone-600 font-medium">wellness sessions</span>
        </div>
      </div>
    </div>

    <!-- Card 3: Store Pickups Ready -->
    <div
      @click="setActiveTab('Ready for Delivery / Pickup')"
      class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-emerald-300 transition-all cursor-pointer group"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600 group-hover:text-emerald-600 transition-colors">
          Store Pickups Ready
        </span>
        <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">
          {{ metrics.storePickupsReady.count }}
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60">
            {{ metrics.storePickupsReady.label }}
          </span>
          <span class="text-stone-600 font-medium">counter collection</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Fulfillment Velocity -->
    <div
      class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between hover:border-slate-300 transition-all group"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600">
          Fulfillment Velocity
        </span>
        <div class="w-9 h-9 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/60 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">
          {{ metrics.fulfillmentVelocity.value }}
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-stone-700 font-bold border border-warm-200">
            {{ metrics.fulfillmentVelocity.unit }}
          </span>
          <span class="text-stone-600 font-medium">turnaround target</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'

const { metrics, setActiveTab, selectedFulfillment } = useOrders()

const handleSelectServiceBookings = () => {
  setActiveTab('All')
  selectedFulfillment.value = 'service'
}
</script>
