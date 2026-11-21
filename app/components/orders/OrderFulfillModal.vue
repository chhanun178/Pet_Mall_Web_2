<template>
  <div
    v-if="isFulfillModalOpen && selectedOrder"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button -->
      <button
        @click="isFulfillModalOpen = false"
        class="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Title -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-[#FFF4E5] text-[#D46213] flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-stone-900">
            Fulfill & Print Shipping Label
          </h3>
          <p class="text-xs text-stone-500">
            Order <span class="font-bold text-stone-700">{{ selectedOrder.displayId }}</span> • {{ selectedOrder.customer.name }}
          </p>
        </div>
      </div>

      <!-- Shipping Destination Card -->
      <div class="bg-warm-50/80 rounded-2xl p-3.5 border border-warm-200/80 mb-5 text-xs text-stone-700 space-y-1">
        <div class="flex items-center justify-between font-bold text-stone-900">
          <span>Delivery Address</span>
          <span class="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Address Verified
          </span>
        </div>
        <p class="font-medium text-stone-600">
          {{ selectedOrder.customer.name }} • {{ selectedOrder.customer.phone }}
        </p>
        <p class="text-stone-500">
          {{ selectedOrder.customer.deliveryAddress }}
        </p>
      </div>

      <!-- Form Inputs -->
      <form @submit.prevent="handleFulfill" class="space-y-4">
        <!-- Carrier Selection -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
            Select Shipping Carrier
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              @click="carrier = 'UPS Ground'"
              class="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1"
              :class="carrier === 'UPS Ground' ? 'border-[#EA580C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FB923C]' : 'border-warm-200 bg-white text-stone-700 hover:bg-stone-50'"
            >
              <span>UPS Ground</span>
              <span class="text-[10px] text-stone-400 font-normal">1-2 Business Days</span>
            </button>
            <button
              type="button"
              @click="carrier = 'FedEx Home'"
              class="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1"
              :class="carrier === 'FedEx Home' ? 'border-[#EA580C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FB923C]' : 'border-warm-200 bg-white text-stone-700 hover:bg-stone-50'"
            >
              <span>FedEx Home</span>
              <span class="text-[10px] text-stone-400 font-normal">2-3 Business Days</span>
            </button>
            <button
              type="button"
              @click="carrier = 'USPS Priority'"
              class="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1"
              :class="carrier === 'USPS Priority' ? 'border-[#EA580C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FB923C]' : 'border-warm-200 bg-white text-stone-700 hover:bg-stone-50'"
            >
              <span>USPS Priority</span>
              <span class="text-[10px] text-stone-400 font-normal">1-3 Business Days</span>
            </button>
          </div>
        </div>

        <!-- Tracking Number & Weight -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Tracking Number
            </label>
            <div class="relative">
              <input
                v-model="trackingNumber"
                type="text"
                required
                class="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <button
                type="button"
                @click="generateTracking"
                class="absolute right-2 top-1.5 text-[10px] font-bold text-brand-600 hover:underline"
                title="Regenerate random barcode"
              >
                Regen
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Total Parcel Weight (lbs)
            </label>
            <input
              v-model="weight"
              type="number"
              step="0.05"
              min="0.1"
              class="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>

        <!-- Checkbox Options -->
        <div class="space-y-2 pt-2 border-t border-warm-100 text-xs">
          <label class="flex items-center gap-2 text-stone-700 cursor-pointer">
            <input
              v-model="printThermalLabel"
              type="checkbox"
              class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-warm-300"
            />
            <span>Print 4x6" Thermal Shipping Label automatically</span>
          </label>
          <label class="flex items-center gap-2 text-stone-700 cursor-pointer">
            <input
              v-model="notifyCustomer"
              type="checkbox"
              class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-warm-300"
            />
            <span>Send carrier tracking number via SMS & Email to customer</span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            @click="isFulfillModalOpen = false"
            class="px-4 py-2.5 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl bg-[#FB923C] hover:bg-[#F97316] text-stone-900 text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
          >
            Confirm & Dispatch Parcel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOrders } from '~/composables/useOrders'

const { selectedOrder, isFulfillModalOpen, fulfillOrder } = useOrders()

const carrier = ref('UPS Ground')
const trackingNumber = ref('1Z9999999283719')
const weight = ref(1.15)
const printThermalLabel = ref(true)
const notifyCustomer = ref(true)

const generateTracking = () => {
  const prefix = carrier.value.startsWith('UPS') ? '1Z8829' : '9400'
  const randomSuffix = Math.floor(10000000 + Math.random() * 90000000)
  trackingNumber.value = `${prefix}${randomSuffix}`
}

watch(
  () => selectedOrder.value,
  (order) => {
    if (order) {
      generateTracking()
      const totalWeight = order.items.reduce((acc, item) => acc + (item.weightLbs || 0.4) * item.quantity, 0)
      weight.value = Math.max(0.4, Number(totalWeight.toFixed(2)))
    }
  },
  { immediate: true }
)

const handleFulfill = () => {
  if (selectedOrder.value) {
    fulfillOrder(selectedOrder.value.id, carrier.value, trackingNumber.value, weight.value)
  }
}
</script>
