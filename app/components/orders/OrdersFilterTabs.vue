<template>
  <div class="overflow-x-auto scrollbar-none py-1">
    <div class="flex items-center gap-2 min-w-max">
      <!-- 1. All Orders -->
      <button @click="setActiveTab('All')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border"
        :class="activeTab === 'All'
            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
            : 'bg-white hover:bg-warm-100/70 text-stone-600 border-warm-200/90'
          ">
        <span>All Orders</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-bold"
          :class="activeTab === 'All' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'">
          {{ counts.all }}
        </span>
      </button>

      <!-- 2. Needs Packing -->
      <button @click="setActiveTab('Needs Packing')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border"
        :class="activeTab === 'Needs Packing'
            ? 'bg-[#FFF4E5] text-[#D46213] border-[#FDBA74] shadow-xs ring-1 ring-[#FED7AA]'
            : 'bg-white hover:bg-[#FFF9F3] text-stone-700 border-warm-200/90'
          ">
        <span>Needs Packing</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-extrabold text-white bg-[#EA580C]">
          {{ counts.needsPacking }}
        </span>
      </button>

      <!-- 3. Ready for Delivery / Pickup -->
      <button @click="setActiveTab('Ready for Delivery / Pickup')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border"
        :class="activeTab === 'Ready for Delivery / Pickup'
            ? 'bg-[#EBF5FF] text-[#1D4ED8] border-[#93C5FD] shadow-xs ring-1 ring-[#BFDBFE]'
            : 'bg-white hover:bg-blue-50/50 text-stone-600 border-warm-200/90'
          ">
        <span>Ready for Delivery / Pickup</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-bold"
          :class="activeTab === 'Ready for Delivery / Pickup' ? 'bg-[#2563EB] text-white' : 'bg-stone-100 text-stone-600'">
          {{ counts.readyPickup }}
        </span>
      </button>

      <!-- 4. Shipped -->
      <button @click="setActiveTab('Shipped')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border"
        :class="activeTab === 'Shipped'
            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
            : 'bg-white hover:bg-warm-100/70 text-stone-600 border-warm-200/90'
          ">
        <span>Shipped</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-bold"
          :class="activeTab === 'Shipped' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'">
          {{ counts.shipped }}
        </span>
      </button>

      <!-- 5. Completed -->
      <button @click="setActiveTab('Completed')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border"
        :class="activeTab === 'Completed'
            ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
            : 'bg-white hover:bg-emerald-50/50 text-stone-600 border-warm-200/90'
          ">
        <span>Completed</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-bold"
          :class="activeTab === 'Completed' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600'">
          {{ counts.completed }}
        </span>
      </button>

      <!-- 6. Cancelled / Refunded -->
      <button @click="setActiveTab('Cancelled / Refunded')"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border"
        :class="activeTab === 'Cancelled / Refunded'
            ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
            : 'bg-white hover:bg-rose-50/50 text-stone-600 border-warm-200/90'
          ">
        <span>Cancelled / Refunded</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-bold"
          :class="activeTab === 'Cancelled / Refunded' ? 'bg-rose-800 text-white' : 'bg-stone-100 text-stone-600'">
          {{ counts.cancelled }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'

const { activeTab, setActiveTab, counts } = useOrders()
</script>
