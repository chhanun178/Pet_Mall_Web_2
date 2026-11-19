<template>
  <div class="space-y-6">
    <!-- Storefront Identity, Period Selector & Section Subheading -->
    <SalesHeader />

    <!-- 4 Key Revenue & Channel Split Cards -->
    <SalesStatCards />

    <!-- Middle Grid: Weekly Revenue Distribution (2 cols) + Top Grossing Offerings (1 col) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div class="lg:col-span-2">
        <SalesRevenueChart />
      </div>
      <div>
        <SalesTopOfferings />
      </div>
    </div>

    <!-- Recent Settlement Logs Table with Search, Filter & Pagination -->
    <SalesSettlementTable />

    <!-- Next Scheduled Payout Footer Card -->
    <SalesPayoutBanner />
  </div>
</template>

<script setup lang="ts">
import SalesHeader from '~/components/sales/SalesHeader.vue'
import SalesStatCards from '~/components/sales/SalesStatCards.vue'
import SalesRevenueChart from '~/components/sales/SalesRevenueChart.vue'
import SalesTopOfferings from '~/components/sales/SalesTopOfferings.vue'
import SalesSettlementTable from '~/components/sales/SalesSettlementTable.vue'
import SalesPayoutBanner from '~/components/sales/SalesPayoutBanner.vue'

useHead({
  title: 'Sales & Transactions • Velvet Paws Atelier | Pet Mall',
  meta: [
    {
      name: 'description',
      content: 'Review gross merchant volume, physical product vs. holistic service revenue ratios, and reconciled payouts.',
    },
  ],
})
</script>
