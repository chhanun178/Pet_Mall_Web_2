<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 shadow-card overflow-hidden">
    <!-- Card Header & Filters -->
    <div class="p-5 sm:p-6 border-b border-warm-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-stone-900 leading-snug">Recent Settlement Logs</h2>
        <p class="text-sm text-stone-600 mt-0.5 font-medium">
          Real-time payment clearance, channel deductions, and net deposited earnings.
        </p>
      </div>

      <!-- Search & Status Filter -->
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Search Input -->
        <div class="relative w-full sm:w-64">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search customer or order ID..."
            class="w-full pl-11 pr-4 py-2 rounded-xl bg-warm-50/60 border border-warm-200 text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:bg-white focus:border-brand-500 shadow-sm"
          />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select
            v-model="selectedStatus"
            class="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-warm-50/60 border border-warm-200 text-sm font-semibold text-stone-800 hover:border-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 shadow-sm cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="settling">Settling</option>
            <option value="refunded">Refunded</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-500">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Settlement Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-warm-50/70 border-b border-warm-200/80 text-xs font-bold uppercase tracking-wider text-stone-600 leading-normal">
            <th class="py-4 px-5 sm:px-6">Transaction ID</th>
            <th class="py-4 px-4">Date & Time</th>
            <th class="py-4 px-4">Customer</th>
            <th class="py-4 px-4">Items / Ritual</th>
            <th class="py-4 px-4">Payment</th>
            <th class="py-4 px-4">Platform Fee</th>
            <th class="py-4 px-4">Net Payout</th>
            <th class="py-4 px-6 text-right">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-warm-100 text-sm">
          <tr
            v-for="tx in filteredTransactions"
            :key="tx.id"
            class="odd:bg-white even:bg-warm-50 align-top"
          >
            <!-- Transaction ID -->
            <td class="py-5 px-5 sm:px-6 align-top">
              <span
                class="text-xs font-bold leading-snug inline-block"
                :class="tx.status === 'Refunded' ? 'text-stone-600' : 'text-[#B45309]'"
              >
                {{ tx.id }}
              </span>
            </td>

            <!-- Date & Time -->
            <td class="py-5 px-4 align-top">
              <span class="text-xs text-stone-600 font-medium leading-snug inline-block">
                {{ tx.dateTime }}
              </span>
            </td>

            <!-- Customer -->
            <td class="py-5 px-4 align-top">
              <div class="font-bold text-stone-900 text-sm leading-snug">
                {{ tx.customerName }}
              </div>
              <div class="text-xs text-stone-500 mt-1.5 leading-relaxed font-medium">
                {{ tx.customerEmail }}
              </div>
            </td>

            <!-- Items / Ritual -->
            <td class="py-5 px-4 align-top">
              <div
                class="text-sm font-semibold leading-snug"
                :class="tx.status === 'Refunded' ? 'text-stone-500' : 'text-stone-800'"
              >
                {{ tx.itemSummary }}
              </div>
            </td>

            <!-- Payment Method -->
            <td class="py-5 px-4 align-top">
              <div class="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 leading-snug">
                <!-- Apple Pay / Wallet Icon -->
                <svg
                  v-if="tx.paymentType === 'apple'"
                  class="w-5 h-5 text-stone-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6" />
                </svg>
                <!-- Klarna / Bag Icon -->
                <svg
                  v-else-if="tx.paymentType === 'klarna'"
                  class="w-5 h-5 text-stone-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <!-- Credit Card Icon -->
                <svg
                  v-else
                  class="w-5 h-5 text-stone-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 10h20" />
                </svg>
                <span>{{ tx.paymentMethod }}</span>
              </div>
            </td>

            <!-- Platform Fee -->
            <td class="py-5 px-4 align-top">
              <div class="text-xs text-stone-600 font-medium leading-snug">
                {{ tx.platformFee }}
              </div>
              <div v-if="tx.platformFeeRate" class="text-xs text-stone-500 mt-1 leading-relaxed font-medium">
                {{ tx.platformFeeRate }}
              </div>
            </td>

            <!-- Net Payout -->
            <td class="py-5 px-4 align-top">
              <div
                class="text-sm font-bold leading-snug"
                :class="tx.isNegativePayout ? 'text-rose-600' : 'text-stone-900'"
              >
                {{ tx.netPayout }}
              </div>
            </td>

            <!-- Status -->
            <td class="py-5 px-6 text-right align-top">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-snug"
                :class="{
                  'bg-emerald-50 text-emerald-700 border border-emerald-200/80': tx.status === 'Completed',
                  'bg-amber-50 text-amber-800 border border-amber-200/80': tx.status === 'Settling',
                  'bg-rose-50 text-rose-700 border border-rose-200/80': tx.status === 'Refunded',
                }"
              >
                {{ tx.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="px-5 sm:px-6 py-4 border-t border-warm-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
      <div>
        Showing <span class="font-bold text-stone-900">1 - {{ filteredTransactions.length }}</span> of <span class="font-bold text-stone-900">128</span> recorded transactions
      </div>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-warm-200 text-stone-500 hover:text-stone-800 hover:bg-warm-50 font-semibold transition-colors cursor-pointer"
        >
          Previous
        </button>

        <button
          type="button"
          class="w-7 h-7 rounded-lg bg-[#9A3412] text-white font-bold flex items-center justify-center text-xs shadow-sm cursor-pointer"
        >
          1
        </button>

        <button
          type="button"
          class="w-7 h-7 rounded-lg border border-warm-200 flex items-center justify-center text-stone-700 hover:bg-warm-50 hover:text-stone-950 font-medium transition-colors cursor-pointer"
        >
          2
        </button>

        <button
          type="button"
          class="w-7 h-7 rounded-lg border border-warm-200 flex items-center justify-center text-stone-700 hover:bg-warm-50 hover:text-stone-950 font-medium transition-colors cursor-pointer"
        >
          3
        </button>

        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-warm-200 text-stone-700 hover:text-stone-950 hover:bg-warm-50 font-semibold transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSales } from '~/composables/useSales'

const { searchQuery, selectedStatus, filteredTransactions } = useSales()
</script>
