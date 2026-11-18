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
useHead({
  title: 'Inventory Catalog • Velvet Paws Atelier | Pet Mall',
  meta: [
    { name: 'description', content: 'Manage pet products and holistic services inventory' }
  ]
})
</script>
