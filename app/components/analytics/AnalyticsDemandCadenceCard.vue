<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card flex flex-col justify-between">
    <!-- Header with Legend -->
    <div>
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Weekly Demand Cadence
          </h2>
          <p class="text-xs text-stone-600 mt-0.5">
            Order spikes (Apothecary Goods) vs Appointment peaks (Wellness Services)
          </p>
        </div>

        <!-- Legend Pills -->
        <div class="flex items-center gap-4 text-xs font-semibold">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#A05A2C]"></span>
            <span class="text-stone-700">Products</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
            <span class="text-stone-700">Services</span>
          </div>
        </div>
      </div>

      <!-- Weekly Horizontal Double Bars (Full Width Layout) -->
      <div class="mt-6 space-y-3.5">
        <div
          v-for="item in weeklyCadence"
          :key="item.day"
          class="grid grid-cols-12 items-center gap-3 sm:gap-4 text-xs py-0.5"
        >
          <!-- Day Name Column -->
          <div class="col-span-2 sm:col-span-1 font-bold text-stone-700 flex items-center gap-1">
            <span>{{ item.day }}</span>
            <span
              v-if="item.isPeak"
              class="text-[10px] text-[#EA580C] font-extrabold hidden sm:inline"
            >
              (Peak)
            </span>
          </div>

          <!-- Double Bar Track Column -->
          <div class="col-span-10 sm:col-span-11 space-y-1.5">
            <!-- Products Bar -->
            <div class="flex items-center gap-3">
              <div class="flex-1 h-3.5 bg-warm-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="item.isPeak ? 'bg-[#EA580C]' : 'bg-[#A05A2C]'"
                  :style="{ width: `${(item.productsOrders / 350) * 100}%` }"
                ></div>
              </div>
              <span
                class="w-24 text-[11px] font-semibold text-right shrink-0"
                :class="item.isPeak ? 'text-[#EA580C] font-bold' : 'text-stone-600'"
              >
                {{ item.productsOrders }} orders
              </span>
            </div>

            <!-- Services Bar -->
            <div class="flex items-center gap-3">
              <div class="flex-1 h-3 bg-warm-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-[#0284C7] transition-all duration-500"
                  :style="{ width: `${(item.servicesBookings / 100) * 100}%` }"
                ></div>
              </div>
              <span
                class="w-24 text-[11px] font-semibold text-right shrink-0"
                :class="item.day === 'Sat' ? 'text-[#0284C7] font-bold' : 'text-stone-500'"
              >
                {{ item.servicesBookings }} bookings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Highlight & Adjust Staff Slots CTA -->
    <div class="mt-6 pt-3.5 border-t border-warm-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-warm-50/70 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl border-t">
      <div class="flex items-center gap-2 text-stone-700">
        <span class="text-amber-600 shrink-0">
          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path stroke-linecap="round" d="M12 7v5l3 3" />
          </svg>
        </span>
        <span class="font-medium">
          Peak appointment booking hour: <strong class="text-stone-900 font-bold">Saturday 10:00 AM – 2:00 PM</strong>
        </span>
      </div>

      <button
        @click="openStaffModal"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition-all shadow-xs active:scale-98 shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <span>Adjust Staff Slots</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { weeklyCadence, openStaffModal } = useAnalytics()
</script>
