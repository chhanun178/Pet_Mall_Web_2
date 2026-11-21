<template>
  <div
    v-if="isPickupModalOpen && selectedOrder"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button -->
      <button
        @click="isPickupModalOpen = false"
        class="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-stone-900">
            Confirm Store Pickup
          </h3>
          <p class="text-xs text-stone-500">
            Order <span class="font-bold text-stone-700">{{ selectedOrder.displayId }}</span> • Handover
          </p>
        </div>
      </div>

      <!-- Cubby & Customer Card -->
      <div class="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 mb-5 space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-blue-900">Pickup Staging Location:</span>
          <span class="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 font-bold shadow-2xs">
            {{ selectedOrder.customer.pickupCubby || 'Front Desk Cubby #04' }}
          </span>
        </div>
        <div class="border-t border-blue-100/70 pt-2 flex items-center justify-between text-stone-700">
          <span>Customer:</span>
          <span class="font-bold text-stone-900">{{ selectedOrder.customer.name }} ({{ selectedOrder.customer.phone }})</span>
        </div>
        <div class="flex items-center justify-between text-stone-700">
          <span>Pet Companion:</span>
          <span class="font-semibold text-amber-800">{{ selectedOrder.customer.petName }} ({{ selectedOrder.customer.petBreed }})</span>
        </div>
      </div>

      <!-- Items Checklist -->
      <div class="mb-5">
        <p class="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
          Verify Bagged Items:
        </p>
        <div class="space-y-2">
          <div
            v-for="item in selectedOrder.items"
            :key="item.id"
            class="flex items-center justify-between p-2.5 rounded-xl bg-warm-50 border border-warm-200 text-xs"
          >
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
              <span class="font-bold text-stone-800">{{ item.name }}</span>
            </div>
            <span class="text-stone-500 font-semibold">Qty: {{ item.quantity }}</span>
          </div>
        </div>
      </div>

      <!-- PIN verification -->
      <div class="mb-5">
        <label class="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
          Customer SMS Pickup Code
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model="verificationCode"
            type="text"
            maxlength="6"
            class="flex-1 px-3 py-2 text-center text-sm font-mono tracking-widest font-bold rounded-xl border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <span class="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
            PIN Verified ✓
          </span>
        </div>
      </div>

      <!-- Confirm Actions -->
      <div class="flex items-center justify-end gap-3 pt-2 border-t border-warm-100">
        <button
          type="button"
          @click="isPickupModalOpen = false"
          class="px-4 py-2.5 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleConfirmPickup"
          class="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
        >
          Mark as Handed Over
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrders } from '~/composables/useOrders'

const { selectedOrder, isPickupModalOpen, markPickedUp } = useOrders()
const verificationCode = ref('PIN-428')

const handleConfirmPickup = () => {
  if (selectedOrder.value) {
    markPickedUp(selectedOrder.value.id)
  }
}
</script>
