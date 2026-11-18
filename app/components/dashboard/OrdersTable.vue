<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 shadow-card overflow-hidden">
    <!-- Header -->
    <div class="p-5 sm:p-6 border-b border-warm-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-stone-900 leading-tight">Recent Incoming Orders</h2>
          <p class="text-xs text-stone-500">Awaiting fulfillment and parcel handover</p>
        </div>
      </div>

      <div class="flex items-center gap-3 self-end sm:self-auto">
        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors">
          <svg class="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filter
        </button>
        <NuxtLink to="/orders" class="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">
          View All (18)
        </NuxtLink>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-warm-50/70 border-b border-warm-200/80 text-[11px] font-bold uppercase tracking-wider text-stone-400">
            <th class="py-3 px-5 sm:px-6">Order ID & Customer</th>
            <th class="py-3 px-4">Items Summary</th>
            <th class="py-3 px-4">Total Amount</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-5 text-right">Quick Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-warm-100 text-sm">
          <!-- Row 1 -->
          <tr class="hover:bg-warm-50/40 transition-colors">
            <td class="py-4 px-5 sm:px-6">
              <div class="font-bold text-stone-900">#ORD-9028</div>
              <div class="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <svg class="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Clara Hensley
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-warm-200 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1608248597359-2ffb91a9f02c?w=100&auto=format&fit=crop&q=80"
                    alt="Chamomile Balm"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-semibold text-stone-900 text-xs sm:text-sm">Chamomile & Oat Paw Balm</div>
                  <div class="text-xs text-stone-400">60ml • Qty 2</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="font-bold text-stone-900">$32.00</div>
              <div class="text-[11px] font-medium text-emerald-600">Paid via Apple Pay</div>
            </td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Processing
              </span>
            </td>
            <td class="py-4 px-5 text-right">
              <button class="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors" title="Dispatch order">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </td>
          </tr>

          <!-- Row 2 -->
          <tr class="hover:bg-warm-50/40 transition-colors">
            <td class="py-4 px-5 sm:px-6">
              <div class="font-bold text-stone-900">#ORD-9025</div>
              <div class="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <svg class="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                David Thorne
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-warm-200 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80"
                    alt="Ear Cleanser"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-semibold text-stone-900 text-xs sm:text-sm">Organic Calendula Ear Cleanser</div>
                  <div class="text-xs text-stone-400">100ml • Qty 1</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="font-bold text-stone-900">$22.50</div>
              <div class="text-[11px] font-medium text-emerald-600">Paid via Card</div>
            </td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Ready for Pickup
              </span>
            </td>
            <td class="py-4 px-5 text-right">
              <button class="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors" title="View details">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </td>
          </tr>

          <!-- Row 3 -->
          <tr class="hover:bg-warm-50/40 transition-colors">
            <td class="py-4 px-5 sm:px-6">
              <div class="font-bold text-stone-900">#ORD-9019</div>
              <div class="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <svg class="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Maya Lin-Sterling
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-warm-200 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=100&auto=format&fit=crop&q=80"
                    alt="Hemp Leash"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-semibold text-stone-900 text-xs sm:text-sm">Braided Sage Hemp Leash</div>
                  <div class="text-xs text-stone-400">Standard 6ft • Qty 1</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="font-bold text-stone-900">$48.00</div>
              <div class="text-[11px] font-medium text-emerald-600">Paid via PayPal</div>
            </td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/80">
                <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                Shipped
              </span>
            </td>
            <td class="py-4 px-5 text-right">
              <button class="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors" title="Tracking details">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
