<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card">
    <!-- Header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h2 class="text-sm font-bold text-stone-900 leading-tight">Weekly Revenue</h2>
        <p class="text-xs text-stone-500 mt-0.5">Physical items vs Wellness services</p>
      </div>
      <div class="text-xl font-extrabold text-stone-900">$8,940</div>
    </div>

    <!-- Bar Chart Graphic -->
    <div class="h-36 flex items-end justify-between gap-2.5 pt-4 pb-2 px-1 border-b border-warm-100">
      <div
        v-for="(day, index) in chartDays"
        :key="index"
        class="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
      >
        <!-- Stacked Bar Column -->
        <div class="w-full max-w-[28px] flex flex-col justify-end rounded-lg overflow-hidden bg-warm-100 transition-transform group-hover:scale-105" :style="{ height: `${day.height}%` }">
          <!-- Top portion: Services (Blue) -->
          <div
            class="w-full bg-sky-800 transition-all"
            :style="{ height: `${day.servicesRatio}%` }"
            :title="`Services: ${day.services}`"
          ></div>
          <!-- Bottom portion: Products (Amber) -->
          <div
            class="w-full bg-amber-500 transition-all"
            :style="{ height: `${100 - day.servicesRatio}%` }"
            :title="`Products: ${day.products}`"
          ></div>
        </div>

        <!-- Day Label -->
        <span
          class="text-xs font-bold transition-colors"
          :class="day.isHighlight ? 'text-brand-600 font-extrabold' : 'text-stone-400 group-hover:text-stone-700'"
        >
          {{ day.label }}
        </span>
      </div>
    </div>

    <!-- Legend & Breakdown -->
    <div class="mt-4 space-y-2 text-xs">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
          <span class="text-stone-600 font-medium">Handcrafted Products</span>
        </div>
        <span class="font-bold text-stone-900">68% ($6,080)</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-sky-800 shrink-0"></span>
          <span class="text-stone-600 font-medium">Wellness & Grooming</span>
        </div>
        <span class="font-bold text-stone-900">32% ($2,860)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const chartDays = [
  { label: 'M', height: 60, servicesRatio: 30, products: '$720', services: '$310' },
  { label: 'T', height: 75, servicesRatio: 25, products: '$950', services: '$320' },
  { label: 'W', height: 50, servicesRatio: 40, products: '$510', services: '$340' },
  { label: 'T', height: 85, servicesRatio: 30, products: '$1,020', services: '$440' },
  { label: 'F', height: 90, servicesRatio: 35, products: '$1,140', services: '$610' },
  { label: 'S', height: 100, servicesRatio: 35, products: '$1,290', services: '$690', isHighlight: true },
  { label: 'S', height: 70, servicesRatio: 25, products: '$850', services: '$280' },
]
</script>
