<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card flex flex-col justify-between">
    <!-- Header -->
    <div>
      <h2 class="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
        Pet Profiles
      </h2>
      <p class="text-xs text-stone-600 mt-0.5">
        Verified demographic segments
      </p>
    </div>

    <!-- Center Donut Chart -->
    <div class="my-5 flex flex-col items-center justify-center relative">
      <div class="relative w-44 h-44 flex items-center justify-center">
        <svg class="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
          <!-- Background track -->
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="transparent"
            stroke="#F5F3EF"
            stroke-width="14"
          />
          
          <!-- Segment 1: Canine (Dogs) 64% -> 289.02 * 0.64 = 184.97 -->
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="transparent"
            stroke="#C2410C"
            stroke-width="14"
            stroke-dasharray="184.97 289.02"
            stroke-dashoffset="0"
            class="transition-all duration-700"
          />

          <!-- Segment 2: Feline (Cats) 31% -> 289.02 * 0.31 = 89.60 -->
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="transparent"
            stroke="#0284C7"
            stroke-width="14"
            stroke-dasharray="89.60 289.02"
            stroke-dashoffset="-188.97"
            class="transition-all duration-700"
          />

          <!-- Segment 3: Small Pets / Equine 5% -> 289.02 * 0.05 = 14.45 -->
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="transparent"
            stroke="#F59E0B"
            stroke-width="14"
            stroke-dasharray="14.45 289.02"
            stroke-dashoffset="-280.57"
            class="transition-all duration-700"
          />
        </svg>

        <!-- Center Label in Donut -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span class="text-2xl font-black tracking-tight text-stone-900 leading-none">
            {{ totalPetsLogged }}
          </span>
          <span class="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-1">
            Pets Logged
          </span>
        </div>
      </div>
    </div>

    <!-- Demographics Legend List -->
    <div class="space-y-2.5 pt-2">
      <div
        v-for="item in demographics"
        :key="item.species"
        class="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-warm-50 transition-colors"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full shrink-0"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span class="font-bold text-stone-800">{{ item.displayName }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-semibold text-stone-600">{{ item.count.toLocaleString() }}</span>
          <span class="font-extrabold text-stone-900 w-9 text-right">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'

const { demographics, totalPetsLogged } = useAnalytics()
</script>
