<template>
  <aside class="w-56 shrink-0 hidden md:flex flex-col justify-between self-start sticky top-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-warm-200/90 p-3 shadow-card min-h-[calc(100vh-6rem)]">
    <!-- Menu items -->
    <nav class="space-y-1">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all bg-brand-50 text-brand-700 shadow-sm"
      >
        <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        </svg>
        <span>Dashboard</span>
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <span>Products</span>
      </NuxtLink>

      <NuxtLink
        to="/sales"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
        <span>Sales</span>
      </NuxtLink>

      <NuxtLink
        to="/chat"
        class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Messages</span>
        </div>
        <span class="w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
          3
        </span>
      </NuxtLink>

      <NuxtLink
        to="/orders"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <span>Orders</span>
      </NuxtLink>

      <NuxtLink
        to="/analytics"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <span>Analytics</span>
      </NuxtLink>

      <NuxtLink
        to="/payouts"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
        <span>Payouts</span>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
      >
        <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>Settings</span>
      </NuxtLink>
    </nav>

    <!-- Bottom: Storefront Profile Link -->
    <div class="pt-4 border-t border-warm-200/80">
      <NuxtLink
        to="/vendors/velvet-paws"
        class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-blue-200/80 bg-blue-50/40 text-blue-700 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold transition-all group"
      >
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          Storefront Profile
        </span>
        <svg class="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </NuxtLink>
    </div>
  </aside>
</template>
