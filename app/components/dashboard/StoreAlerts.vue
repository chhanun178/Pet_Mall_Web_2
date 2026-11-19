<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </div>
        <h2 class="text-sm font-bold text-stone-900">Store Alerts</h2>
      </div>
      <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" title="Active alerts"></span>
    </div>

    <!-- Alert List -->
    <div class="space-y-3">
      <!-- Alert 1 -->
      <div class="rounded-xl border-l-4 border-l-rose-500 bg-rose-50/40 border border-warm-200/60 p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold text-rose-800">Low Stock Warning</span>
        </div>
        <p class="text-xs text-stone-600 leading-relaxed mb-2">
          <strong class="text-stone-800">Herbal Ear Cleanse</strong> has only 3 bottles remaining.
        </p>
        <NuxtLink to="/products" class="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-800 transition-colors">
          Restock Inventory <span>→</span>
        </NuxtLink>
      </div>

      <!-- Alert 2 -->
      <div class="rounded-xl border-l-4 border-l-blue-500 bg-blue-50/40 border border-warm-200/60 p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold text-blue-800">Customer Inquiries Waiting</span>
        </div>
        <p class="text-xs text-stone-600 leading-relaxed mb-2">
          2 messages regarding balm ingredients unread for over 15 minutes.
        </p>
        <NuxtLink to="/chat" class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors">
          Open live messaging <span>→</span>
        </NuxtLink>
      </div>

      <!-- Alert 3 -->
      <div class="rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/40 border border-warm-200/60 p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold text-emerald-800">Stripe Payout Scheduled</span>
        </div>
        <p class="text-xs text-stone-600 leading-relaxed">
          <strong class="text-stone-800">$2,840.00</strong> will transfer to Chase ending in ••4102 tomorrow morning.
        </p>
      </div>
    </div>
  </div>
</template>
