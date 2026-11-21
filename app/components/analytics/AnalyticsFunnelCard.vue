<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card flex flex-col justify-between">
    <!-- Top Header -->
    <div>
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Traffic & Customer Conversion Funnel
          </h2>
          <p class="text-xs text-stone-600 mt-0.5">
            Holistic path from arrival to verified purchase or wellness appointment.
          </p>
        </div>
      </div>

      <!-- Funnel Stages List -->
      <div class="mt-6 space-y-5">
        <div v-for="step in funnelSteps" :key="step.stepNumber" class="space-y-1.5">
          <!-- Stage Info Row -->
          <div class="flex items-center justify-between text-xs sm:text-sm">
            <div class="flex items-center gap-2.5 min-w-0">
              <span
                class="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs"
                :class="step.colorClass">
                {{ step.stepNumber }}
              </span>
              <span class="font-bold text-stone-900 truncate">{{ step.title }}</span>
              <span class="text-stone-600 text-xs hidden md:inline truncate">{{ step.subtitle }}</span>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span class="font-extrabold text-stone-900">{{ step.displayCount }}</span>
              <span class="px-2 py-0.5 rounded-md text-xs font-bold border" :class="step.badgeClass">
                {{ step.displayPercentage }}
              </span>
            </div>
          </div>

          <!-- Progress Bar Track -->
          <div class="h-2.5 w-full bg-warm-100/90 rounded-full overflow-hidden p-0.5">
            <div class="h-full rounded-full transition-all duration-700 ease-out" :class="step.colorClass"
              :style="{ width: `${Math.max(step.percentage, 4)}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { funnelSteps } = useAnalytics()
</script>
