<template>
  <div
    v-if="isBookingModalOpen && selectedOrder"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button -->
      <button
        @click="isBookingModalOpen = false"
        class="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-stone-900">
            Wellness Session & Intake Dossier
          </h3>
          <p class="text-xs text-stone-500">
            Booking <span class="font-bold text-stone-700">{{ selectedOrder.displayId }}</span> • {{ selectedOrder.service?.title }}
          </p>
        </div>
      </div>

      <!-- Time & Practitioner Banner -->
      <div class="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-4 border border-sky-100 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-xs font-bold text-blue-900 uppercase tracking-wider">Appointment Slot:</span>
          </div>
          <p class="text-sm font-extrabold text-stone-900 mt-1">
            {{ selectedOrder.service?.scheduledTime || selectedOrder.badgeText }}
          </p>
          <p class="text-xs text-stone-600 font-medium">
            Assigned: <span class="font-bold text-stone-800">{{ selectedOrder.service?.practitioner }}</span> ({{ selectedOrder.service?.room }})
          </p>
        </div>
        <div class="text-right sm:text-right shrink-0">
          <span class="text-xs font-bold uppercase tracking-wider text-stone-600 block">Pre-Auth Fee</span>
          <span class="text-xl font-extrabold text-blue-900">
            ${{ selectedOrder.pricing.payoutValue.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Pet Profile & Health Questionnaire Card -->
      <div class="space-y-3.5 mb-5 text-xs">
        <div class="flex items-center justify-between">
          <h4 class="font-bold uppercase tracking-wider text-stone-600">
            Pet Patient Profile
          </h4>
          <span
            v-if="selectedOrder.service?.specialAlert"
            class="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold"
          >
            {{ selectedOrder.service.specialAlert }}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-warm-50 rounded-2xl p-3.5 border border-warm-200">
          <div>
            <span class="text-stone-400 block text-[11px]">Companion Name</span>
            <span class="font-bold text-stone-900 text-sm">{{ selectedOrder.customer.petName }}</span>
          </div>
          <div>
            <span class="text-stone-400 block text-[11px]">Breed & Age</span>
            <span class="font-bold text-stone-900 text-sm">{{ selectedOrder.customer.petBreed }} • {{ selectedOrder.service?.petAge || '3 yrs' }}</span>
          </div>
          <div>
            <span class="text-stone-400 block text-[11px]">Intake Status</span>
            <span class="font-bold text-emerald-700 text-sm">✓ Complete & Signed</span>
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div class="font-bold text-amber-900 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Holistic Practitioner Precautions:</span>
          </div>
          <p class="text-stone-700 font-medium">
            Owner notes: {{ selectedOrder.service?.allergies || 'Customer requested extra focus on lower back and hindquarters. Responds well to calming lavender mist.' }}
          </p>
          <p class="text-stone-600">
            Temperament: {{ selectedOrder.service?.temperament || 'Calm, gentle, friendly.' }}
          </p>
        </div>
      </div>

      <!-- Reschedule Section Toggle -->
      <div v-if="showReschedule" class="mb-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
        <label class="block text-xs font-bold text-stone-800">Choose New Time Slot</label>
        <div class="flex items-center gap-2">
          <select
            v-model="newTimeSlot"
            class="flex-1 px-3 py-2 text-xs rounded-xl border border-warm-200 bg-white font-medium"
          >
            <option>Today, 4:00 PM (45 mins)</option>
            <option>Tomorrow, 10:00 AM (45 mins)</option>
            <option>Tomorrow, 2:30 PM (45 mins)</option>
            <option>Friday, 11:15 AM (45 mins)</option>
          </select>
          <button
            type="button"
            @click="handleConfirmReschedule"
            class="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex items-center justify-between pt-3 border-t border-warm-100 flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="showReschedule = !showReschedule"
            class="px-3 py-2 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
          >
            {{ showReschedule ? 'Cancel Reschedule' : 'Reschedule Time' }}
          </button>
          <button
            type="button"
            @click="openContactModal(selectedOrder)"
            class="px-3 py-2 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Message Owner
          </button>
        </div>

        <button
          type="button"
          @click="handleCheckIn"
          class="px-5 py-2 rounded-xl bg-[#0B4870] hover:bg-[#073655] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
        >
          Check-In Pet Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrders } from '~/composables/useOrders'

const {
  selectedOrder,
  isBookingModalOpen,
  checkInBooking,
  rescheduleBooking,
  openContactModal,
} = useOrders()

const showReschedule = ref(false)
const newTimeSlot = ref('Today, 4:00 PM (45 mins)')

const handleCheckIn = () => {
  if (selectedOrder.value) {
    checkInBooking(selectedOrder.value.id)
    isBookingModalOpen.value = false
  }
}

const handleConfirmReschedule = () => {
  if (selectedOrder.value) {
    rescheduleBooking(selectedOrder.value.id, newTimeSlot.value)
    showReschedule.value = false
  }
}
</script>
