<template>
  <div class="space-y-6">
    <!-- 1. Header with Store Identity, Status & Top Action Buttons -->
    <OrdersHeader />

    <!-- 2. The 4 Key Metric / KPI Cards (Awaiting Dispatch, Scheduled Bookings, Pickups Ready, Velocity) -->
    <OrdersMetrics />

    <!-- 3. Navigation Filter Tabs (All Orders, Needs Packing, Ready for Pickup, Shipped, etc.) -->
    <OrdersFilterTabs />

    <!-- 4. Search Bar with Date Range, Fulfillment Type, and Sort Dropdowns -->
    <OrdersSearchBar />

    <!-- 5. Active Filters Chips / Feedback Strip (Shown if filters are applied) -->
    <div
      v-if="hasActiveFilters"
      class="flex items-center gap-2 flex-wrap text-xs bg-warm-100/60 p-2.5 rounded-xl border border-warm-200/80"
    >
      <span class="font-bold text-stone-500">Active Filters:</span>

      <span v-if="activeTab !== 'All'" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-warm-200 text-stone-800 font-semibold shadow-2xs">
        Tab: {{ activeTab }}
        <button @click="setActiveTab('All')" class="text-stone-400 hover:text-stone-700 font-bold ml-0.5">×</button>
      </span>

      <span v-if="searchQuery" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-warm-200 text-stone-800 font-semibold shadow-2xs">
        Search: "{{ searchQuery }}"
        <button @click="searchQuery = ''" class="text-stone-400 hover:text-stone-700 font-bold ml-0.5">×</button>
      </span>

      <span v-if="selectedFulfillment !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-warm-200 text-stone-800 font-semibold shadow-2xs">
        Fulfillment: {{ selectedFulfillment }}
        <button @click="selectedFulfillment = 'all'" class="text-stone-400 hover:text-stone-700 font-bold ml-0.5">×</button>
      </span>

      <button
        @click="resetFilters"
        class="ml-auto text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
      >
        Clear all filters
      </button>
    </div>

    <!-- 6. Orders List Cards -->
    <div v-if="paginatedOrders.length > 0" class="space-y-4">
      <OrderCard
        v-for="order in paginatedOrders"
        :key="order.id"
        :order="order"
      />
    </div>

    <!-- Empty State (When no orders match active filters) -->
    <div
      v-else
      class="bg-white rounded-3xl border border-warm-200 p-12 text-center shadow-card space-y-4"
    >
      <div class="w-16 h-16 rounded-3xl bg-warm-100 text-stone-400 mx-auto flex items-center justify-center">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-stone-900">No Orders or Appointments Found</h3>
        <p class="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mt-1">
          No records match the current filter criteria or search keyword. Try clearing filters to view all orders.
        </p>
      </div>
      <div>
        <button
          @click="resetFilters"
          class="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xs"
        >
          Reset All Filters
        </button>
      </div>
    </div>

    <!-- 7. Pagination Footer -->
    <OrdersPagination v-if="paginatedOrders.length > 0" />

    <!-- Modals & Drawers -->
    <OrderFulfillModal />
    <OrderPickupModal />
    <OrderBookingModal />
    <OrderTrackingModal />
    <OrderPackingSlipModal />
    <OrderDetailsDrawer />
    <OrderContactModal />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrders } from '~/composables/useOrders'

import OrdersHeader from '~/components/orders/OrdersHeader.vue'
import OrdersMetrics from '~/components/orders/OrdersMetrics.vue'
import OrdersFilterTabs from '~/components/orders/OrdersFilterTabs.vue'
import OrdersSearchBar from '~/components/orders/OrdersSearchBar.vue'
import OrderCard from '~/components/orders/OrderCard.vue'
import OrdersPagination from '~/components/orders/OrdersPagination.vue'
import OrderFulfillModal from '~/components/orders/OrderFulfillModal.vue'
import OrderPickupModal from '~/components/orders/OrderPickupModal.vue'
import OrderBookingModal from '~/components/orders/OrderBookingModal.vue'
import OrderTrackingModal from '~/components/orders/OrderTrackingModal.vue'
import OrderPackingSlipModal from '~/components/orders/OrderPackingSlipModal.vue'
import OrderDetailsDrawer from '~/components/orders/OrderDetailsDrawer.vue'
import OrderContactModal from '~/components/orders/OrderContactModal.vue'

const {
  activeTab,
  searchQuery,
  selectedFulfillment,
  paginatedOrders,
  setActiveTab,
  resetFilters,
} = useOrders()

const hasActiveFilters = computed(() => {
  return activeTab.value !== 'All' || searchQuery.value.trim() !== '' || selectedFulfillment.value !== 'all'
})

useHead({
  title: 'Orders & Bookings • Artisan Paws Co. | Pet Mall',
  meta: [
    {
      name: 'description',
      content: 'Track fulfillment status, process shipments, and coordinate upcoming pet wellness sessions.',
    },
  ],
})
</script>
