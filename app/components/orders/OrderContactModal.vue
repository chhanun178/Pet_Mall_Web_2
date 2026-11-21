<template>
  <div
    v-if="isContactModalOpen && selectedOrder"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button -->
      <button
        @click="isContactModalOpen = false"
        class="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-stone-900">
            Notify Customer
          </h3>
          <p class="text-xs text-stone-500">
            To: <span class="font-bold text-stone-700">{{ selectedOrder.customer.name }}</span> ({{ selectedOrder.customer.petName }})
          </p>
        </div>
      </div>

      <!-- Channel Toggle -->
      <div class="flex rounded-xl bg-warm-100 p-1 mb-4 text-xs font-bold">
        <button
          type="button"
          @click="channel = 'SMS'"
          class="flex-1 py-1.5 rounded-lg transition-all"
          :class="channel === 'SMS' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'"
        >
          SMS ({{ selectedOrder.customer.phone }})
        </button>
        <button
          type="button"
          @click="channel = 'Email'"
          class="flex-1 py-1.5 rounded-lg transition-all"
          :class="channel === 'Email' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'"
        >
          Email ({{ selectedOrder.customer.email }})
        </button>
      </div>

      <!-- Quick Templates -->
      <div class="mb-3">
        <p class="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
          Quick Templates
        </p>
        <div class="flex flex-wrap gap-1.5 text-xs">
          <button
            type="button"
            @click="applyTemplate('pickup')"
            class="px-2.5 py-1 rounded-lg border border-warm-200 bg-warm-50 hover:bg-warm-100 text-stone-700 font-medium transition-colors"
          >
            Pickup Ready
          </button>
          <button
            type="button"
            @click="applyTemplate('shipped')"
            class="px-2.5 py-1 rounded-lg border border-warm-200 bg-warm-50 hover:bg-warm-100 text-stone-700 font-medium transition-colors"
          >
            Tracking Sent
          </button>
          <button
            type="button"
            @click="applyTemplate('appointment')"
            class="px-2.5 py-1 rounded-lg border border-warm-200 bg-warm-50 hover:bg-warm-100 text-stone-700 font-medium transition-colors"
          >
            Wellness Reminder
          </button>
        </div>
      </div>

      <!-- Message Textarea -->
      <div class="mb-5">
        <textarea
          v-model="messageBody"
          rows="4"
          class="w-full p-3 rounded-xl border border-warm-200 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none font-sans"
          placeholder="Write your update..."
        ></textarea>
        <p class="text-[11px] text-stone-400 text-right mt-1">
          {{ messageBody.length }} characters • Delivered instantly
        </p>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-warm-100">
        <button
          type="button"
          @click="isContactModalOpen = false"
          class="px-4 py-2.5 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSend"
          class="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all shadow-xs active:scale-[0.98]"
        >
          Send {{ channel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOrders } from '~/composables/useOrders'

const { selectedOrder, isContactModalOpen, sendCustomerMessage } = useOrders()

const channel = ref<'SMS' | 'Email'>('SMS')
const messageBody = ref('')

const applyTemplate = (type: 'pickup' | 'shipped' | 'appointment') => {
  if (!selectedOrder.value) return
  const o = selectedOrder.value
  if (type === 'pickup') {
    messageBody.value = `Hi ${o.customer.name}! Your Pet Mall order ${o.displayId} for ${o.customer.petName} is bagged and ready for pickup at ${o.customer.pickupCubby || 'Front Desk Cubby #04'}. Store open until 7:00 PM.`
  } else if (type === 'shipped') {
    messageBody.value = `Hi ${o.customer.name}! Order ${o.displayId} is on its way to you via ${o.shippingCarrier || 'courier'}. Tracking: ${o.trackingNumber || 'Available shortly'}. Thank you for supporting Artisan Paws!`
  } else if (type === 'appointment') {
    messageBody.value = `Hi ${o.customer.name}! Friendly reminder that ${o.customer.petName}'s session is scheduled for ${o.service?.scheduledTime || 'today'}. Please arrive 5 minutes early.`
  }
}

watch(
  () => selectedOrder.value,
  () => {
    if (selectedOrder.value) {
      if (selectedOrder.value.fulfillmentType === 'pickup') {
        applyTemplate('pickup')
      } else if (selectedOrder.value.fulfillmentType === 'service') {
        applyTemplate('appointment')
      } else {
        applyTemplate('shipped')
      }
    }
  },
  { immediate: true }
)

const handleSend = () => {
  if (selectedOrder.value && messageBody.value.trim()) {
    sendCustomerMessage(selectedOrder.value.id, messageBody.value, channel.value)
  }
}
</script>
