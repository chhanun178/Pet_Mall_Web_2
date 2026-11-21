<template>
  <div class="space-y-6 pb-12">
    <!-- Top Analytics Header with Live Telemetry badge, Date/Audience Selectors & Pet Cohort Buttons -->
    <AnalyticsHeader />

    <!-- 4 KPI Metrics matching Sales/Orders styling -->
    <AnalyticsMetrics />

    <!-- Middle Row: Traffic Funnel (Left) + Pet Demographics Donut (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      <div class="lg:col-span-8 flex flex-col">
        <AnalyticsFunnelCard class="h-full" />
      </div>
      <div class="lg:col-span-4 flex flex-col">
        <AnalyticsPetProfilesCard class="h-full" />
      </div>
    </div>

    <!-- Weekly Demand Cadence (Full Width) -->
    <div>
      <AnalyticsDemandCadenceCard />
    </div>

    <!-- Bottom Section: High-Impact Hero Products Grid -->
    <AnalyticsHeroProducts />

    <!-- Interactive Dialogs -->
    <AnalyticsStaffModal />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Storefront Analytics • Pet Mall Artisan Merchant Portal',
  meta: [
    {
      name: 'description',
      content: 'Storefront analytics, conversion funnels, pet demographics, and weekly demand telemetry for Artisan Paws Co.',
    },
  ],
})
</script>
