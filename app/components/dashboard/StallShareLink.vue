<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 shadow-card">
    <div class="flex items-center gap-3 mb-4">
      <div
        class="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      </div>
      <div>
        <h2 class="text-sm font-bold text-stone-900 leading-tight">Stall Live Link</h2>
        <p class="text-xs text-stone-400 font-mono mt-0.5">petmall.co/market/velvet-paws</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2.5">
      <button @click="copyLink"
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 hover:bg-warm-100 text-stone-700 text-xs font-semibold transition-all shadow-sm active:scale-95">
        <svg class="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>{{ copied ? 'Copied!' : 'Copy Link' }}</span>
      </button>

      <NuxtLink to="/vendors/velvet-paws" target="_blank"
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-900 hover:bg-sky-950 text-white text-xs font-semibold transition-all shadow-sm active:scale-95">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>Preview</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

const copyLink = () => {
  navigator.clipboard?.writeText('https://petmall.co/market/velvet-paws')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>
