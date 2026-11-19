<template>
  <div class="revenue-chart-card bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card h-full flex flex-col justify-between">
    <!-- Header & Legend -->
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold text-stone-900 leading-snug">Weekly Revenue Distribution</h2>
        <p class="text-sm text-stone-600 mt-0.5 font-medium">
          Physical goods volume vs. Holistic pet care appointments (Past 4 Weeks)
        </p>
      </div>

      <!-- Legend -->
      <div class="legend-container flex items-center gap-5 text-xs font-semibold text-stone-700 shrink-0">
        <div class="legend-item flex items-center gap-2">
          <span class="legend-dot" style="background-color: #EA580C;"></span>
          <span class="text-xs font-semibold text-stone-700">Physical Goods</span>
        </div>
        <div class="legend-item flex items-center gap-2">
          <span class="legend-dot" style="background-color: #0284C7;"></span>
          <span class="text-xs font-semibold text-stone-700">Services & Rituals</span>
        </div>
      </div>
    </div>

    <!-- Chart Body -->
    <div class="chart-wrapper relative pt-3">
      <!-- Plot Area with explicit height -->
      <div class="chart-plot-area">
        <!-- 4 Dashed Grid Lines -->
        <div class="grid-lines-layer pointer-events-none">
          <div class="grid-line-dashed"></div>
          <div class="grid-line-dashed"></div>
          <div class="grid-line-dashed"></div>
          <div class="grid-line-dashed"></div>
        </div>

        <!-- 4 Weekly Paired Bar Columns -->
        <div class="bars-columns-layer">
          <div
            v-for="week in weeklyRevenue"
            :key="week.label"
            class="bar-column-item"
          >
            <!-- Orange Bar: Physical Goods -->
            <div
              class="revenue-bar goods-bar"
              :style="{ height: `${week.goodsHeight}%`, backgroundColor: '#EA580C' }"
              :title="`${week.label} Physical Goods: ${week.goodsAmount}`"
            ></div>

            <!-- Blue Bar: Services & Rituals -->
            <div
              class="revenue-bar services-bar"
              :style="{ height: `${week.servicesHeight}%`, backgroundColor: '#0284C7' }"
              :title="`${week.label} Services & Rituals: ${week.servicesAmount}`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Solid Baseline -->
      <div class="chart-baseline"></div>

      <!-- X-Axis Labels (Directly Aligned Under Columns) -->
      <div class="x-axis-container">
        <div
          v-for="week in weeklyRevenue"
          :key="week.label"
          class="x-axis-item"
        >
          <div class="text-xs font-bold text-stone-800 leading-snug">{{ week.label }}</div>
          <div class="text-xs text-stone-500 font-medium mt-0.5">{{ week.total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSales } from '~/composables/useSales'

const { weeklyRevenue } = useSales()
</script>

<style scoped>
/* Bulletproof Scoped Styles so rendering never breaks regardless of CSS purge/JIT */
.legend-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  display: inline-block !important;
  width: 9px !important;
  height: 9px !important;
  min-width: 9px;
  min-height: 9px;
  border-radius: 9999px !important;
  flex-shrink: 0;
}

.chart-wrapper {
  position: relative;
  width: 100%;
}

.chart-plot-area {
  position: relative;
  width: 100%;
  height: 200px;
}

.grid-lines-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line-dashed {
  width: 100%;
  border-bottom: 1px dashed rgba(220, 226, 235, 0.85);
}

.bars-columns-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  z-index: 2;
}

.bar-column-item {
  flex: 1;
  max-width: 120px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  padding: 0 4px;
}

.revenue-bar {
  width: 26px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .revenue-bar {
    width: 30px;
  }
  .bar-column-item {
    gap: 8px;
  }
}

.revenue-bar:hover {
  filter: brightness(1.08);
  transform: translateY(-2px);
}

.goods-bar {
  background-color: #EA580C;
}

.services-bar {
  background-color: #0284C7;
}

.chart-baseline {
  width: 100%;
  border-bottom: 1.5px solid #E2E8F0;
}

.x-axis-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding-top: 14px;
}

.x-axis-item {
  flex: 1;
  max-width: 120px;
  text-align: center;
}
</style>