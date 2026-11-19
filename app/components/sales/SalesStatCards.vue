<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
    <!-- Card 1: Gross Sales -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600">Gross Sales</span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2.5" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12h.01M18 12h.01" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">$24,850.00</div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60">
            ↑ +18.4%
          </span>
          <span class="text-stone-600 font-medium">vs last period</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Physical Goods -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600">Physical Goods</span>
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">$17,420.00</div>
        <div class="mt-3.5 flex items-center gap-3 text-xs">
          <div class="flex-1 h-2 rounded-full bg-warm-100 overflow-hidden">
            <div class="h-full rounded-full bg-[#EA580C]" style="width: 70.1%; background-color: #EA580C;"></div>
          </div>
          <span class="font-bold text-stone-700 shrink-0">70.1%</span>
        </div>
      </div>
    </div>

    <!-- Card 3: Holistic Services -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600">Holistic Services</span>
        <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/60 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">$7,430.00</div>
        <div class="mt-3.5 flex items-center gap-3 text-xs">
          <div class="flex-1 h-2 rounded-full bg-warm-100 overflow-hidden">
            <div class="h-full rounded-full bg-[#0284C7]" style="width: 29.9%; background-color: #0284C7;"></div>
          </div>
          <span class="font-bold text-sky-700 shrink-0">29.9%</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Average Order Value -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-600">Average Order Value</span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <div class="mt-3">
        <div class="text-2xl font-extrabold tracking-tight text-stone-900">$46.80</div>
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60">
            ↑ +$3.40
          </span>
          <span class="text-stone-600 font-medium">basket growth</span>
        </div>
      </div>
    </div>
  </div>
</template>
