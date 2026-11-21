<template>
  <div
    v-if="isStaffModalOpen"
    class="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    @click.self="closeStaffModal"
  >
    <div class="bg-white rounded-2xl max-w-xl w-full border border-warm-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-warm-200/90 flex items-center justify-between bg-warm-50/60">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path stroke-linecap="round" d="M12 7v5l3 3" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-stone-900">Adjust Saturday Staff Slots</h3>
            <p class="text-xs text-stone-500">Allocate wellness therapists & fulfillment crew for peak demand</p>
          </div>
        </div>

        <button
          @click="closeStaffModal"
          class="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-4">
        <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
          <span class="text-amber-600 font-bold shrink-0">ⓘ</span>
          <p>
            Historical telemetry flags <strong>Saturday 10:00 AM – 2:00 PM</strong> as your highest concurrent booking hour with <strong>72 appointments</strong>. Minimum 5 staff recommended.
          </p>
        </div>

        <div class="space-y-3">
          <div
            v-for="slot in staffSlots"
            :key="slot.id"
            class="p-4 rounded-xl border border-warm-200/90 bg-warm-50/30 flex items-center justify-between gap-4"
          >
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-stone-900">{{ slot.timeRange }}</h4>
              <p class="text-[11px] text-stone-500 mt-0.5">
                Target: {{ slot.neededStaff }} staff required •
                <span
                  class="font-bold uppercase tracking-wider text-[10px]"
                  :class="slot.assignedStaff >= slot.neededStaff ? 'text-emerald-700' : 'text-rose-700'"
                >
                  {{ slot.assignedStaff >= slot.neededStaff ? 'Fully Covered' : 'Understaffed' }}
                </span>
              </p>
            </div>

            <!-- Increment / Decrement Counter -->
            <div class="flex items-center gap-2">
              <button
                @click="updateStaffSlot(slot.id, -1)"
                class="w-8 h-8 rounded-lg bg-white border border-warm-200 hover:bg-warm-100 text-stone-800 font-bold flex items-center justify-center transition-all shadow-xs"
                :disabled="slot.assignedStaff <= 1"
              >
                -
              </button>
              <span class="w-7 text-center font-black text-stone-900 text-sm">
                {{ slot.assignedStaff }}
              </span>
              <button
                @click="updateStaffSlot(slot.id, 1)"
                class="w-8 h-8 rounded-lg bg-white border border-warm-200 hover:bg-warm-100 text-stone-800 font-bold flex items-center justify-center transition-all shadow-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-warm-200 bg-warm-50/60 flex items-center justify-end gap-3">
        <button
          @click="closeStaffModal"
          class="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-bold transition-colors"
        >
          Cancel
        </button>
        <button
          @click="saveStaffSchedule"
          class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          Confirm & Save Schedule
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { isStaffModalOpen, closeStaffModal, staffSlots, updateStaffSlot, saveStaffSchedule } = useAnalytics()
</script>
