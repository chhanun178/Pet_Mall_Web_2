<template>
  <div class="space-y-6">
    <!-- Header Strip & Add Actions -->
    <ProductsHeader />

    <!-- Filters: Search bar and category, stock, sort dropdowns -->
    <ProductFilters />

    <!-- Inventory Table with Status Toggles & Quick Actions -->
    <ProductTable />

    <!-- Pagination Footer -->
    <ProductPagination />
  </div>
</template>

<script setup lang="ts">
import ProductsHeader from '~/components/products/ProductsHeader.vue'
import ProductFilters from '~/components/products/ProductFilters.vue'
import ProductTable from '~/components/products/ProductTable.vue'
import ProductPagination from '~/components/products/ProductPagination.vue'

useHead({
  title: 'Inventory Catalog • Velvet Paws Atelier | Pet Mall',
  meta: [
    { name: 'description', content: 'Manage pet products and holistic services inventory' }
  ]
})
</script>
