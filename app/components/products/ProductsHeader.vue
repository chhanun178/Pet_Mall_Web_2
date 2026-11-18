<template>
  <div class="space-y-6">
    <!-- Vendor Storefront Identity Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div class="flex items-center gap-4">
        <!-- Avatar with Verified Merchant Badge -->
        <div class="relative w-16 h-16 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=160&auto=format&fit=crop&q=80"
            alt="Velvet Paws Atelier & Apothecary"
            class="w-full h-full rounded-2xl object-cover ring-1 ring-stone-200/80"
          />
          <span
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center ring-2 ring-white text-white shadow-sm"
            title="Verified Merchant"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>

        <!-- Identity Info -->
        <div class="space-y-1">
          <h1 class="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
            Velvet Paws Atelier & Apothecary
          </h1>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F4F1EA] text-stone-700 text-xs font-semibold">
              <svg class="w-3.5 h-3.5 text-[#C86400]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Stall #VP-892
            </span>
          </div>
          <p class="text-xs sm:text-sm text-stone-500 leading-relaxed">
            Botanical balms, small-batch herbal tinctures, and bespoke holistic pet rituals • Multi-vendor Verified Merchant
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 shrink-0 self-start md:self-center">
        <!-- Add New Product Button -->
        <button
          @click="openAddProduct"
          type="button"
          class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50/50 text-[#2563EB] text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <svg class="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/>
          </svg>
          <span>Add New Product</span>
        </button>

        <!-- Add Service Button -->
        <button
          @click="openAddService"
          type="button"
          class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F58700] hover:bg-[#E07A00] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-6-6h12"/>
          </svg>
          <span>Add Service</span>
        </button>
      </div>
    </div>

    <!-- Inventory Catalog Subheading -->
    <div class="pt-1">
      <h2 class="text-xl font-bold tracking-tight text-stone-900">Inventory Catalog</h2>
      <p class="text-xs text-stone-500 mt-0.5">This is the page where the vendor can manage their products.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { openAddProduct, openAddService } = useProducts()
</script>
