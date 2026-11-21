<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isDetailsDrawerOpen"
      @click="isDetailsDrawerOpen = false"
      class="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs transition-opacity"
    ></div>

    <!-- Slide-over panel -->
    <div
      class="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l border-warm-200 transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="isDetailsDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <template v-if="selectedOrder">
        <!-- Header -->
        <div class="p-5 border-b border-warm-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-xl font-bold text-stone-900">{{ selectedOrder.displayId }}</span>
            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-bold border"
              :class="statusBadgeClass"
            >
              {{ selectedOrder.status }}
            </span>
          </div>

          <button
            @click="isDetailsDrawerOpen = false"
            class="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <!-- Customer & Pet Dossier -->
          <div class="bg-warm-50 rounded-2xl p-4 border border-warm-200 text-xs space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold uppercase tracking-wider text-stone-600">Customer & Pet Companion</span>
              <button
                @click="openContactModal(selectedOrder)"
                class="text-brand-600 font-bold hover:underline"
              >
                Send Message / SMS
              </button>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <span class="text-stone-400 block text-[11px]">Customer Name</span>
                <span class="font-bold text-stone-900 text-sm">{{ selectedOrder.customer.name }}</span>
                <span class="text-stone-500 block text-[11px]">{{ selectedOrder.customer.email }}</span>
                <span class="text-stone-500 block text-[11px]">{{ selectedOrder.customer.phone }}</span>
              </div>
              <div>
                <span class="text-stone-400 block text-[11px]">Pet Details</span>
                <span class="font-bold text-amber-900 text-sm">{{ selectedOrder.customer.petName }}</span>
                <span class="text-stone-600 block text-[11px]">{{ selectedOrder.customer.petBreed }}</span>
                <span v-if="selectedOrder.customer.notes" class="text-stone-500 italic block text-[10px] mt-1">"{{ selectedOrder.customer.notes }}"</span>
              </div>
            </div>
            <div class="pt-2 border-t border-warm-200/60">
              <span class="text-stone-400 block text-[11px]">Delivery / Fulfillment Details</span>
              <span class="font-semibold text-stone-800">{{ selectedOrder.customer.deliveryAddress || 'Standard Courier' }}</span>
              <span v-if="selectedOrder.customer.pickupCubby" class="block font-bold text-amber-800 mt-0.5">
                {{ selectedOrder.customer.pickupCubby }}
              </span>
            </div>
          </div>

          <!-- Items Breakdown -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5">
              Purchased Line Items
            </h4>
            <div class="border border-warm-200 rounded-2xl divide-y divide-warm-100 overflow-hidden">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="p-3.5 flex items-center justify-between gap-3 text-xs"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-warm-100 border border-warm-200 overflow-hidden shrink-0">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-stone-400">🐾</div>
                  </div>
                  <div>
                    <p class="font-bold text-stone-900">{{ item.name }}</p>
                    <p class="text-stone-400 text-[11px]">{{ item.sku }} • {{ item.shelfLocation || item.statusTag || 'In Stock' }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-stone-900">${{ (item.quantity * item.unitPrice).toFixed(2) }}</p>
                  <p class="text-stone-500 text-[11px]">Qty: {{ item.quantity }} × ${{ item.unitPrice.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Financial Breakdown -->
          <div class="bg-warm-50 rounded-2xl p-4 border border-warm-200 text-xs space-y-2">
            <h4 class="font-bold uppercase tracking-wider text-stone-600 mb-1">
              Financial & Settlement Breakdown
            </h4>
            <div class="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span class="font-medium">${{ selectedOrder.pricing.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-stone-600">
              <span>Platform Fee:</span>
              <span class="font-medium text-stone-500">-${{ selectedOrder.pricing.platformFee.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-stone-600">
              <span>Shipping Fee:</span>
              <span class="font-medium">${{ selectedOrder.pricing.shippingFee.toFixed(2) }}</span>
            </div>
            <div class="pt-2 border-t border-warm-200 flex justify-between font-bold text-sm text-stone-900">
              <span>Net Merchant Payout:</span>
              <span class="text-emerald-700">${{ selectedOrder.pricing.payoutValue.toFixed(2) }}</span>
            </div>
            <p class="text-[11px] text-stone-500 pt-1">
              Payment Method: {{ selectedOrder.pricing.paymentMethod }} ({{ selectedOrder.pricing.paymentNote }})
            </p>
          </div>

          <!-- Merchant Internal Notes Section -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Internal Merchant Notes
            </h4>
            <div class="space-y-2 mb-3">
              <div
                v-for="note in selectedOrder.notes"
                :key="note.id"
                class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs"
              >
                <div class="flex items-center justify-between text-[10px] text-stone-400 font-bold mb-1">
                  <span>{{ note.author }}</span>
                  <span>{{ note.timestamp }}</span>
                </div>
                <p class="text-stone-800 font-medium">{{ note.text }}</p>
              </div>
              <p v-if="!selectedOrder.notes.length" class="text-xs text-stone-400 italic">
                No internal notes yet.
              </p>
            </div>

            <div class="flex gap-2">
              <input
                v-model="newNoteText"
                @keyup.enter="handleSaveNote"
                type="text"
                placeholder="Add note for packing team..."
                class="flex-1 px-3 py-2 text-xs rounded-xl border border-warm-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                @click="handleSaveNote"
                class="px-3.5 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
              >
                Add Note
              </button>
            </div>
          </div>

          <!-- Cancel order if not completed -->
          <div v-if="selectedOrder.status !== 'Cancelled'" class="pt-4 border-t border-warm-200">
            <button
              @click="handleCancel"
              class="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors"
            >
              Cancel Order & Issue Full Refund
            </button>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-warm-200 bg-warm-50 flex items-center justify-between">
          <button
            @click="openPackingSlipModal(selectedOrder)"
            class="px-4 py-2 rounded-xl border border-warm-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors"
          >
            Packing Slip
          </button>

          <button
            @click="isDetailsDrawerOpen = false"
            class="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
          >
            Done
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrders } from '~/composables/useOrders'

const {
  selectedOrder,
  isDetailsDrawerOpen,
  addOrderNote,
  cancelOrder,
  openContactModal,
  openPackingSlipModal,
} = useOrders()

const newNoteText = ref('')

const handleSaveNote = () => {
  if (selectedOrder.value && newNoteText.value.trim()) {
    addOrderNote(selectedOrder.value.id, newNoteText.value.trim())
    newNoteText.value = ''
  }
}

const handleCancel = () => {
  if (selectedOrder.value && confirm(`Are you sure you want to cancel order ${selectedOrder.value.displayId}? A refund will be issued.`)) {
    cancelOrder(selectedOrder.value.id, 'Merchant cancelled by request')
  }
}

const statusBadgeClass = computed(() => {
  if (!selectedOrder.value) return ''
  switch (selectedOrder.value.status) {
    case 'Needs Packing':
      return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
    case 'Ready for Pickup':
      return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]'
    case 'Confirmed Booking':
      return 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]'
    case 'Shipped':
      return 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]'
    case 'Completed':
      return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
    case 'Cancelled':
      return 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]'
    default:
      return 'bg-stone-100 text-stone-700'
  }
})
</script>
