<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
    <!-- Card 1: Today's Sales -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card hover:shadow-card-hover transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-500">Today's Sales</span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <circle cx="12" cy="12" r="2.5"/>
            <path d="M6 12h.01M18 12h.01"/>
          </svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">$1,420.50</div>
      </div>
    </div>

    <!-- Card 2: Pending Orders -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card hover:shadow-card-hover transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-500">Pending Orders</span>
        <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">18</div>
      </div>
    </div>

    <!-- Card 3: Pet Care Rituals -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card hover:shadow-card-hover transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-500">Pet Care Rituals</span>
        <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">6</div>
      </div>
    </div>

    <!-- Card 4: Storefront Rating -->
    <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card hover:shadow-card-hover transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-stone-500">Storefront Rating</span>
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center">
          <svg class="w-5 h-5 fill-amber-500 text-amber-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>
      <div class="mt-3">
        <div class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
          4.9 <span class="text-sm font-normal text-stone-400">/ 5.0</span>
        </div>
        <div class="mt-2 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <div class="flex text-amber-500">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <span>142 reviews</span>
        </div>
      </div>
    </div>
  </div>
</template>
