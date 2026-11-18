<template>
  <header class="sticky top-0 z-40 bg-white border-b border-warm-200/80">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Left: Logo -->
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-600 font-bold group-hover:bg-brand-500 group-hover:text-white transition-colors">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <!-- Paw print icon -->
              <ellipse cx="8.5" cy="5" rx="2" ry="3"/>
              <ellipse cx="15.5" cy="5" rx="2" ry="3"/>
              <ellipse cx="4.5" cy="10" rx="2" ry="3"/>
              <ellipse cx="19.5" cy="10" rx="2" ry="3"/>
              <path d="M12 10.5c-3.3 0-6 2.3-6 5.5 0 2.2 1.8 4 4 4 1.2 0 1.5-.7 2-.7s.8.7 2 .7c2.2 0 4-1.8 4-4 0-3.2-2.7-5.5-6-5.5z"/>
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight text-stone-900">Pet<span class="text-brand-600">Mall</span></span>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <NuxtLink to="/products" class="hover:text-brand-600 transition-colors">Products</NuxtLink>
          <NuxtLink to="/services" class="hover:text-brand-600 transition-colors">Services</NuxtLink>
        </nav>
      </div>

      <!-- Right Actions: Notifications & Merchant Badge -->
      <div class="flex items-center gap-4">
        <!-- Bookmark / Notice Icon -->
        <button class="relative p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors" title="Notifications">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <!-- Merchant Profile Pill -->
        <div class="flex items-center gap-3 pl-2 sm:pl-3 border-l border-warm-200">
          <div class="w-9 h-9 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-sm ring-2 ring-warm-200">
            AP
          </div>
          <div class="hidden sm:block text-left">
            <div class="text-xs font-bold text-stone-900 leading-tight">Artisan Paws Co.</div>
            <div class="text-[11px] font-medium text-stone-500 flex items-center gap-1">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Verified Merchant
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
