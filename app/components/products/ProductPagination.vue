<script setup lang="ts">
const props = defineProps<{ page: number; pageSize: number; total: number; count: number }>()
const emit = defineEmits<{ change: [page: number] }>()
const lastPage = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => {
  const first = Math.max(1, Math.min(props.page - 1, lastPage.value - 2))
  return Array.from({ length: Math.min(3, lastPage.value) }, (_, index) => first + index)
})
const firstItem = computed(() => (props.page - 1) * props.pageSize + 1)
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-[#6b7280]">
    <p>Showing {{ firstItem }}–{{ firstItem + count - 1 }} of {{ total }} {{ total === 1 ? 'item' : 'items' }}</p>
    <nav v-if="lastPage > 1" aria-label="Inventory pagination" class="flex items-center gap-1.5">
      <button type="button" class="page-button" aria-label="Previous page" :disabled="page <= 1" @click="emit('change', page - 1)">
        <svg aria-hidden="true" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m14 7-5 5 5 5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        v-for="number in pages"
        :key="number"
        type="button"
        class="page-button"
        :class="{ 'bg-[#fce8d3] font-bold text-[#9d4300]': number === page }"
        :aria-label="`Page ${number}`"
        :aria-current="number === page ? 'page' : undefined"
        @click="number !== page && emit('change', number)"
      >{{ number }}</button>
      <button type="button" class="page-button" aria-label="Next page" :disabled="page >= lastPage" @click="emit('change', page + 1)">
        <svg aria-hidden="true" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m10 7 5 5-5 5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.page-button {
  @apply grid size-8 place-items-center rounded-md text-[13px] enabled:hover:bg-[#f1f3ff] disabled:opacity-40;
}
</style>
