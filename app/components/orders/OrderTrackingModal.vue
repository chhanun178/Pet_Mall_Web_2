<template>
  <div
    v-if="isTrackingModalOpen && selectedOrder"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button -->
      <button
        @click="isTrackingModalOpen = false"
        class="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-stone-900">
            Live Carrier GPS Tracking
          </h3>
          <p class="text-xs text-stone-500">
            Order <span class="font-bold text-stone-700">{{ selectedOrder.displayId }}</span> • {{ selectedOrder.shippingCarrier || 'UPS Express' }}
          </p>
        </div>
      </div>

      <!-- Carrier & Tracking Banner -->
      <div class="bg-warm-50 rounded-2xl p-4 border border-warm-200 mb-5 flex items-center justify-between gap-3">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Carrier Tracking Code</span>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="font-mono font-bold text-stone-900 text-sm sm:text-base">
              {{ selectedOrder.trackingNumber || '#92837492' }}
            </span>
            <button
              @click="copyTracking"
              class="text-xs text-brand-600 hover:text-brand-700 font-bold hover:underline"
            >
              {{ copied ? 'Copied! ✓' : 'Copy' }}
            </button>
          </div>
          <p class="text-xs text-stone-500 mt-1">
            Destination: {{ selectedOrder.customer.deliveryAddress || 'Austin, TX' }}
          </p>
        </div>
        <div class="text-right shrink-0">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            In Transit
          </span>
          <p class="text-xs text-stone-500 font-semibold mt-1">
            ETA: {{ selectedOrder.eta || 'Tomorrow, Oct 25' }}
          </p>
        </div>
      </div>

      <!-- Checkpoint Timeline -->
      <div class="space-y-4 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-stone-600">
          Tracking Checkpoint History
        </p>

        <div class="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-warm-200">
          <div
            v-for="(event, idx) in selectedOrder.timeline"
            :key="idx"
            class="relative flex items-start justify-between gap-3 text-xs"
          >
            <!-- Checkpoint circle icon -->
            <div
              class="absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]"
              :class="
                event.completed
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-50'
                  : 'bg-warm-200 text-stone-500 ring-4 ring-white'
              "
            >
              ✓
            </div>

            <!-- Event Details -->
            <div>
              <p class="font-bold text-stone-900">{{ event.title }}</p>
              <p v-if="event.description" class="text-stone-500 mt-0.5">{{ event.description }}</p>
            </div>

            <!-- Timestamp -->
            <span class="font-semibold text-stone-400 shrink-0 text-right">
              {{ event.timestamp }}
            </span>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex items-center justify-between pt-3 border-t border-warm-100">
        <a
          :href="selectedOrder.trackingUrl || '#'"
          target="_blank"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
        >
          <span>Open on Carrier Portal</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <button
          @click="isTrackingModalOpen = false"
          class="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs"
        >
          Close Tracking
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrders } from '~/composables/useOrders'

const { selectedOrder, isTrackingModalOpen } = useOrders()
const copied = ref(false)

const copyTracking = () => {
  if (selectedOrder.value?.trackingNumber) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(selectedOrder.value.trackingNumber)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }
}
</script>
