<script setup lang="ts">
import BaseToggle from '~/components/ui/BaseToggle.vue'
import type { InventoryItem } from '~/types/products'

defineProps<{ items: InventoryItem[]; busy: boolean }>()
const emit = defineEmits<{
  edit: [item: InventoryItem]
  duplicate: [item: InventoryItem]
  stock: [item: InventoryItem]
  delete: [item: InventoryItem]
  status: [item: InventoryItem, active: boolean]
}>()

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const money = (cents: number) => usd.format(cents / 100)
const margin = (item: InventoryItem) => (((item.priceCents - item.costCents) / item.priceCents) * 100).toFixed(2)

function availability(item: InventoryItem) {
  if (!item.stock) return item.type === 'service' ? 'No slots available' : 'Out of stock'
  if (item.type === 'service') return `${item.stock} ${item.stock === 1 ? 'slot' : 'slots'} available`
  return `${item.stock} ${item.stock === 1 ? 'unit' : 'units'} in stock`
}

const actions = [
  { label: 'Edit', event: 'edit', icon: 'M13.5 6.5l4 4M4 20l4-.8L20 7.2a1.5 1.5 0 000-2.1l-1.1-1.1a1.5 1.5 0 00-2.1 0l-12 12L4 20z' },
  { label: 'Duplicate', event: 'duplicate', icon: 'M8 16H5V4h11v3M9 8h10v12H9z' },
  { label: 'Update stock for', event: 'stock', icon: 'M5 8a8 8 0 0113-2l2 2m0-5v5h-5M19 16a8 8 0 01-13 2l-2-2m0 5v-5h5' },
  { label: 'Delete', event: 'delete', icon: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7' },
] as const

function act(action: (typeof actions)[number]['event'], item: InventoryItem) {
  if (action === 'edit') emit('edit', item)
  if (action === 'duplicate') emit('duplicate', item)
  if (action === 'stock') emit('stock', item)
  if (action === 'delete') emit('delete', item)
}
</script>

<template>
  <table class="catalog-table w-full text-left" role="table" aria-label="Inventory listings">
    <thead role="rowgroup">
      <tr role="row" class="bg-[#f5f6fd] text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
        <th scope="col" role="columnheader">Item</th>
        <th scope="col" role="columnheader">Listing<br>Type</th>
        <th scope="col" role="columnheader">Retail &amp;<br>Margin</th>
        <th scope="col" role="columnheader">Stock /<br>Availability</th>
        <th scope="col" role="columnheader" class="sm:text-center">Status</th>
        <th scope="col" role="columnheader" class="sm:text-right">Actions</th>
      </tr>
    </thead>
    <tbody role="rowgroup" class="divide-y divide-[#edf0ff]">
      <tr v-for="item in items" :key="item.id" role="row" class="catalog-row">
        <th scope="row" role="rowheader" class="item-cell font-normal">
          <div class="flex min-w-0 items-center gap-3 sm:gap-4">
            <div class="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#e9edff] text-[#006398]">
              <svg v-if="item.type === 'service'" aria-hidden="true" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-5 0-9-4.5-9-11 4 0 8 3 9 6 1-3 5-6 9-6 0 6.5-4 11-9 11Zm0 0c-3-5-3-12 0-17 3 5 3 12 0 17Z" />
              </svg>
              <svg v-else aria-hidden="true" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.5" />
                <path d="m5 18 5-5 3 3 3-4 3 4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <img
                v-if="item.imageUrl"
                :key="item.imageUrl"
                :src="item.imageUrl"
                alt=""
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
                @error="($event.target as HTMLImageElement).hidden = true"
              />
            </div>
            <div class="min-w-0">
              <p class="break-words text-base font-semibold leading-snug">{{ item.name }}</p>
              <p class="mt-0.5 break-words text-xs text-[#6b7280]">{{ item.subtitle || item.category }}</p>
            </div>
          </div>
        </th>
        <td role="cell" class="type-cell text-[13px] text-[#584237]">
          <span v-if="item.type === 'service'" class="rounded-md bg-[#e2f0ff] px-2 py-0.5 font-medium text-[#00476e]">Service</span>
          <span v-else>Product</span>
        </td>
        <td role="cell" class="price-cell text-xs leading-[18px] text-[#6b7280]">
          <span class="mobile-label">Retail &amp; Margin</span>
          <p class="text-base font-semibold leading-6 text-[#141b2b]">{{ money(item.priceCents) }}</p>
          <p>{{ margin(item) }}% margin</p>
          <p class="text-[#6b7280]">({{ money(item.costCents) }} cost)</p>
        </td>
        <td role="cell" class="stock-cell text-sm">
          <span class="mobile-label">Availability</span>
          <div class="flex items-center gap-2" :class="{ 'text-[#ba1a1a]': item.stock <= 5 }">
            <span
              aria-hidden="true"
              class="size-2 shrink-0 rounded-full"
              :class="item.stock <= 5 ? 'bg-[#ef4444]' : item.type === 'service' ? 'bg-[#006398]' : 'bg-[#10b981]'"
            />
            <span>{{ availability(item) }}</span>
          </div>
        </td>
        <td role="cell" class="status-cell sm:text-center">
          <span class="mobile-label">Status</span>
          <BaseToggle
            :model-value="item.isActive"
            :disabled="busy"
            :aria-label="`Active listing for ${item.name}`"
            :class="item.isActive ? '!bg-[#fdba74]' : ''"
            class="align-middle focus-visible:ring-2 focus-visible:ring-[#006398] disabled:opacity-60"
            @update:model-value="emit('status', item, $event)"
          />
          <span class="ml-2 text-xs text-[#6b7280] sm:sr-only">{{ item.isActive ? 'Active' : 'Inactive' }}</span>
        </td>
        <td role="cell" class="actions-cell sm:text-right">
          <div class="inline-flex items-center gap-1 text-[#6b7280]">
            <button
              v-for="action in actions"
              :key="action.event"
              type="button"
              class="grid size-9 place-items-center rounded-md transition enabled:hover:bg-[#f1f3ff] enabled:hover:text-[#141b2b] disabled:opacity-50 sm:size-8"
              :class="{ 'enabled:hover:!text-[#ba1a1a]': action.event === 'delete' }"
              :title="action.event === 'stock' ? 'Update stock' : action.label"
              :aria-label="`${action.label} ${item.name}`"
              :disabled="busy"
              @click="act(action.event, item)"
            >
              <svg aria-hidden="true" class="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                <path :d="action.icon" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.mobile-label {
  @apply mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] sm:hidden;
}

@media (min-width: 640px) {
  .catalog-table :is(th, td) {
    @apply px-2.5;
  }

  .catalog-table :is(th, td):first-child {
    @apply pl-5;
  }

  .catalog-table :is(th, td):last-child {
    @apply pr-4;
  }

  .catalog-table thead th {
    @apply py-3;
  }

  .catalog-table tbody :is(th, td) {
    @apply py-4;
  }

  .catalog-table .item-cell { width: 46%; }
  .catalog-table .price-cell { min-width: 6rem; }
  .catalog-table .stock-cell { min-width: 6rem; }
}

@media (max-width: 639px) {
  .catalog-table,
  .catalog-table tbody { display: block; }

  .catalog-table thead {
    @apply sr-only;
  }

  .catalog-row {
    @apply grid grid-cols-2 items-center gap-x-4 gap-y-3 p-4;
  }

  .item-cell { grid-column: span 2; }

  .type-cell { grid-row: 2; grid-column: 2; justify-self: end; }

  .price-cell { grid-row: 2 / span 2; }
  .stock-cell { grid-row: 3; align-self: end; }
  .actions-cell { justify-self: end; }
}

@media (min-width: 1280px) {
  .catalog-row { height: 124px; }
}
</style>
