<template>
  <div class="space-y-6">
    <!-- Vendor Storefront Identity Strip -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full overflow-hidden bg-amber-100 ring-2 ring-warm-200 shrink-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=160&auto=format&fit=crop&q=80"
          alt="Velvet Paws Apothecary"
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 class="text-lg font-bold text-stone-900 leading-tight">
          Velvet Paws Atelier & Apothecary
        </h1>
        <p class="text-xs text-stone-500 mt-0.5 leading-relaxed">
          Botanical balms, small-batch herbal tinctures, and bespoke holistic pet rituals • Multi-vendor Stall #VP-892
        </p>
      </div>
    </div>

    <!-- Inventory Catalog Bar & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-stone-900">Inventory Catalog</h2>
        <p class="text-xs text-stone-500 mt-0.5">This is the page where the vendor can manage their products.</p>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <!-- Add New Product Button -->
        <button
          @click="$emit('add-product')"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/>
          </svg>
          <span>Add New Product</span>
        </button>

        <!-- Add New Service Button -->
        <button
          @click="$emit('add-service')"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/>
          </svg>
          <span>Add New Service</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'add-product'): void
  (e: 'add-service'): void
}>()
</script>
