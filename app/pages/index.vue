<template>
  <div class="space-y-6">
    <!-- 4 Key Metric / KPI Cards -->
    <DashboardStatCards />

    <!-- Main Grid: Orders & Appointments (Left) + Alerts, Revenue Chart & Live Link (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Left Column (Wider: 2 cols on desktop) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Incoming Orders Table -->
        <DashboardOrdersTable />

        <!-- Holistic Service Appointments -->
        <DashboardServiceBookings />
      </div>

      <!-- Right Column (1 col on desktop) -->
      <div class="space-y-6">
        <!-- Store Alerts with live indicator -->
        <DashboardStoreAlerts />

        <!-- Weekly Revenue Stacked Chart -->
        <DashboardRevenueChart />

        <!-- Stall Live Link & Quick Copy -->
        <DashboardStallShareLink />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Merchant Dashboard • Velvet Paws Atelier | Pet Mall',
  meta: [
    { name: 'description', content: 'Pet Mall Multi-vendor Merchant Dashboard' }
  ]
})
</script>
