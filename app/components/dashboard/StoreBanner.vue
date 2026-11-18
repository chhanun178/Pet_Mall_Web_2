<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
    <!-- Store Identity -->
    <div class="flex items-start sm:items-center gap-4">
      <!-- Store Avatar -->
      <div class="relative shrink-0">
        <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-amber-100/60 border border-warm-200 overflow-hidden flex items-center justify-center shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=160&auto=format&fit=crop&q=80"
            alt="Velvet Paws Atelier"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Online Indicator -->
        <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Online & Active">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </span>
      </div>

      <!-- Info -->
      <div class="space-y-1">
        <div class="flex flex-wrap items-center gap-2.5">
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
            Velvet Paws Atelier & Apothecary
          </h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-warm-200/70 text-stone-700 text-xs font-semibold">
            <svg class="w-3 h-3 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
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
      <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 text-blue-600 text-sm font-semibold transition-all shadow-sm">
        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/>
        </svg>
        Add New Product
      </button>

      <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-sm font-semibold transition-all shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Service
      </button>
    </div>
  </div>
</template>
