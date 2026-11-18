<template>
  <div class="space-y-6">
    <!-- Header Strip & Add Actions -->
    <ProductsHeader @add-product="isDrawerOpen = true" />

    <!-- Filters: Search bar and category, stock, sort dropdowns -->
    <ProductFilters />

    <!-- Inventory Table with Status Toggles & Quick Actions -->
    <ProductTable @edit-item="openEditDrawer" />

    <!-- Pagination Footer -->
    <ProductPagination />

    <!-- Slide-over Drawer for Adding / Editing Product -->
    <ProductDrawer
      :is-open="isDrawerOpen"
      @close="isDrawerOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Inventory Catalog • Velvet Paws Atelier | Pet Mall',
  meta: [
    { name: 'description', content: 'Manage pet products and holistic services inventory' }
  ]
})

const isDrawerOpen = ref(false)

const openEditDrawer = (item: any) => {
  isDrawerOpen.value = true
}
</script>
