<script setup lang="ts">
interface Props {
  showSwitchToCustomer?: boolean
  showSignOut?: boolean
}

withDefaults(defineProps<Props>(), {
  showSwitchToCustomer: false,
  showSignOut: false,
})

const emit = defineEmits<{
  switchToCustomer: []
  signOut: []
}>()
</script>

<template>
  <div
    class="rounded-2xl border border-warm-200 bg-warm-50 p-6 text-center space-y-4"
  >
    <div
      class="mx-auto w-12 h-12 rounded-2xl bg-[#1B6B52]/10 text-[#1B6B52] flex items-center justify-center"
    >
      <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    </div>

    <div class="space-y-1.5">
      <span
        class="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#1B6B52] bg-[#1B6B52]/10 px-2.5 py-0.5 rounded-full"
      >
        Desktop Only
      </span>
      <h2 class="text-lg font-bold tracking-tight text-stone-900">
        Vendor Partner Portal is Desktop Only
      </h2>
      <p class="text-xs leading-relaxed text-stone-600 max-w-sm mx-auto">
        Boutique management, order fulfillment, and analytics are designed for
        desktop screens (1024px and wider). Please open Pet Mall on a desktop
        browser.
      </p>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
      <button
        v-if="showSwitchToCustomer"
        type="button"
        class="w-full sm:w-auto px-4 h-11 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white transition-colors"
        @click="emit('switchToCustomer')"
      >
        Switch to Customer Sign In
      </button>

      <button
        v-if="showSignOut"
        type="button"
        class="w-full sm:w-auto px-4 h-11 rounded-xl border border-warm-200 bg-white hover:bg-warm-100 text-xs font-semibold text-stone-700 transition-colors"
        @click="emit('signOut')"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
