<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <!-- Left: Shop Avatar & Title Info -->
    <div class="flex items-center gap-3.5">
      <!-- Shop Avatar with Live Indicator -->
      <div class="relative shrink-0">
        <div class="w-12 h-12 rounded-2xl bg-amber-900/10 border border-warm-300 overflow-hidden shadow-xs flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&auto=format&fit=crop&q=80"
            alt="Artisan Paws Co."
            class="w-full h-full object-cover"
          />
        </div>
        <span
          class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20"
          title="Online & Ready for Dispatch"
        ></span>
      </div>

      <!-- Title & Subtitle -->
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-2xl font-bold text-stone-900 tracking-tight">Orders & Bookings</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D46213] border border-[#FED7AA]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
            Live Pipeline
          </span>
        </div>
        <p class="text-xs sm:text-sm text-stone-500 mt-0.5">
          Track fulfillment status, process shipments, and coordinate upcoming pet wellness sessions.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Header info component for Orders & Bookings view
</script>
