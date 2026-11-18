<template>
  <div class="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
    <!-- Store Identity -->
    <div class="flex items-start sm:items-center gap-4">
      <!-- Store Avatar (Dog in yellow hoodie with green checkmark) -->
      <div class="relative shrink-0">
        <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-sky-400 shadow-inner flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80"
            alt="Velvet Paws Atelier"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Online Verified Checkmark Badge -->
        <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00BA88] border-2 border-white flex items-center justify-center text-white shadow-sm" title="Verified Merchant">
          <svg class="w-3 h-3 fill-current stroke-current" stroke-width="0.5" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </span>
      </div>

      <!-- Info -->
      <div class="space-y-1.5">
        <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
          Velvet Paws Atelier & Apothecary
        </h1>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FDF3E9] text-stone-800 text-xs font-semibold">
            <!-- Terracotta House/Stall Icon -->
            <svg class="w-3.5 h-3.5 text-[#E05A17]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            Stall #VP-892
          </span>
        </div>
        <p class="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed">
          Botanical balms, small-batch herbal tinctures, and bespoke holistic pet rituals • Multi-vendor Verified Merchant
        </p>
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <div class="flex items-center gap-3 shrink-0">
      <!-- Add New Product Button -->
      <button
        type="button"
        @click="openAddProduct"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#D5E6FF] bg-[#F5F9FF] hover:bg-[#EBF3FF] text-[#1D68E2] text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <svg class="w-4 h-4 text-[#1D68E2]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/>
        </svg>
        <span>Add New Product</span>
      </button>

      <!-- Add Service Button -->
      <button
        type="button"
        @click="openAddService"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F58700] hover:bg-[#E07A00] text-white text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>Add Service</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { openAddProduct, openAddService } = useProducts()
</script>
