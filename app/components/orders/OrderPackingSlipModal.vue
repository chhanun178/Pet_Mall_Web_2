<template>
  <div
    v-if="isPackingSlipModalOpen"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
  >
    <div
      class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Close button (hidden on print) -->
      <button
        @click="isPackingSlipModalOpen = false"
        class="print:hidden absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Printable Area -->
      <div id="packing-slip-content" class="text-stone-800 font-sans">
        <!-- Packing Slip Header -->
        <div class="flex items-start justify-between border-b-2 border-stone-900 pb-5 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black text-stone-900 tracking-tight">Pet<span class="text-[#EA580C]">Mall</span></span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600">
                Merchant Fulfillment
              </span>
            </div>
            <p class="text-sm font-bold text-stone-800 mt-1">Artisan Paws Co. Atelier</p>
            <p class="text-xs text-stone-500">108 NW 9th Ave • Portland, OR 97209</p>
            <p class="text-xs text-stone-500">support@artisanpaws.com • (503) 555-PAWS</p>
          </div>

          <div class="text-right">
            <h2 class="text-xl font-black text-stone-900 uppercase tracking-tight">PACKING SLIP</h2>
            <p class="text-base font-extrabold text-[#D97706] font-mono mt-0.5">
              {{ activeOrder.displayId }}
            </p>
            <p class="text-xs text-stone-500 mt-1">
              Date: <span class="font-bold text-stone-700">{{ currentDate }}</span>
            </p>
            <!-- Simulated Barcode -->
            <div class="mt-2 flex flex-col items-end">
              <div class="h-6 w-32 bg-stone-900 flex items-stretch gap-0.5 p-0.5">
                <div class="w-1 bg-white"></div>
                <div class="w-2 bg-white"></div>
                <div class="w-0.5 bg-white"></div>
                <div class="w-1.5 bg-white"></div>
                <div class="w-1 bg-white"></div>
                <div class="w-2 bg-white"></div>
              </div>
              <span class="text-[9px] font-mono tracking-widest text-stone-400 mt-0.5">*{{ activeOrder.displayId.replace('#', '') }}*</span>
            </div>
          </div>
        </div>

        <!-- Order & Recipient Information -->
        <div class="grid grid-cols-2 gap-6 bg-warm-50/70 rounded-2xl p-4 border border-warm-200/80 mb-6 text-xs">
          <div>
            <p class="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-1">
              SHIP TO / CUSTOMER:
            </p>
            <p class="font-bold text-stone-900 text-sm">{{ activeOrder.customer.name }}</p>
            <p class="text-stone-600 font-medium">Pet: {{ activeOrder.customer.petName }} ({{ activeOrder.customer.petBreed }})</p>
            <p class="text-stone-500 mt-1">{{ activeOrder.customer.deliveryAddress || 'Portland, OR 97201' }}</p>
            <p class="text-stone-500">{{ activeOrder.customer.phone }} • {{ activeOrder.customer.email }}</p>
          </div>

          <div>
            <p class="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-1">
              DISPATCH DETAILS:
            </p>
            <p class="text-stone-700"><span class="font-semibold">Method:</span> {{ activeOrder.customer.deliveryAddress || 'Standard Courier' }}</p>
            <p class="text-stone-700"><span class="font-semibold">Payment:</span> {{ activeOrder.pricing.paymentMethod }} ({{ activeOrder.pricing.paymentNote }})</p>
            <p class="text-stone-700"><span class="font-semibold">Fulfillment Type:</span> {{ activeOrder.fulfillmentType.toUpperCase() }}</p>
            <p v-if="activeOrder.trackingNumber" class="text-stone-700 font-mono"><span class="font-semibold">Tracking:</span> {{ activeOrder.trackingNumber }}</p>
          </div>
        </div>

        <!-- Line Items Table -->
        <div class="border border-warm-200 rounded-2xl overflow-hidden mb-6">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-warm-100/80 border-b border-warm-200 text-stone-700 font-bold uppercase tracking-wider">
                <th class="py-2.5 px-3">Item Description</th>
                <th class="py-2.5 px-3">SKU & Bin</th>
                <th class="py-2.5 px-3 text-center">Qty</th>
                <th class="py-2.5 px-3 text-right">Price</th>
                <th class="py-2.5 px-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-warm-100 text-stone-800">
              <tr v-for="item in activeOrder.items" :key="item.id" class="hover:bg-warm-50/50">
                <td class="py-3 px-3">
                  <div class="font-bold text-stone-900">{{ item.name }}</div>
                  <div v-if="item.statusTag" class="text-[10px] text-emerald-600 font-medium">{{ item.statusTag }}</div>
                </td>
                <td class="py-3 px-3 font-mono text-[11px] text-stone-600">
                  {{ item.sku }}
                  <span v-if="item.shelfLocation" class="block text-stone-400 text-[10px]">{{ item.shelfLocation }}</span>
                </td>
                <td class="py-3 px-3 text-center font-bold text-stone-900">
                  {{ item.quantity }}
                </td>
                <td class="py-3 px-3 text-right font-medium">
                  ${{ item.unitPrice.toFixed(2) }}
                </td>
                <td class="py-3 px-3 text-right font-bold text-stone-900">
                  ${{ (item.quantity * item.unitPrice).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Summary & Quality Check -->
        <div class="flex items-end justify-between border-t border-warm-200 pt-4 text-xs">
          <div class="space-y-1">
            <p class="font-bold text-stone-900">Atelier Quality Guarantee</p>
            <p class="text-stone-500 max-w-sm">
              All items are 100% natural, pet-safe, and handcrafted in small batches. Thank you for supporting independent pet wellness!
            </p>
            <div class="pt-2 flex items-center gap-4 text-stone-400 text-[11px]">
              <span>Packed by: _______________</span>
              <span>Checked by: _______________</span>
            </div>
          </div>

          <div class="text-right space-y-1">
            <div class="text-stone-500">Total Items: <span class="font-bold text-stone-800">{{ totalItems }}</span></div>
            <div class="text-base font-extrabold text-stone-900">
              Total Value: ${{ activeOrder.pricing.payoutValue.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer (Print Controls) -->
      <div class="print:hidden flex items-center justify-between pt-6 mt-6 border-t border-warm-100">
        <button
          type="button"
          @click="isPackingSlipModalOpen = false"
          class="px-4 py-2.5 rounded-xl border border-warm-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Close
        </button>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="triggerPrint"
            class="px-5 py-2.5 rounded-xl bg-[#FDBA74] hover:bg-[#FB923C] text-stone-900 text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <svg class="w-4 h-4 text-stone-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Packing Slip</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrders } from '~/composables/useOrders'
import { useProducts } from '~/composables/useProducts'

const { selectedOrder, paginatedOrders, isPackingSlipModalOpen } = useOrders()
const { showToast } = useProducts()

const activeOrder = computed(() => {
  return selectedOrder.value || paginatedOrders.value[0]
})

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const totalItems = computed(() => {
  if (!activeOrder.value) return 0
  return activeOrder.value.items.reduce((acc, item) => acc + item.quantity, 0)
})

const triggerPrint = () => {
  if (typeof window !== 'undefined') {
    showToast('Sending packing slip to connected printer...')
    window.print()
  }
}
</script>
