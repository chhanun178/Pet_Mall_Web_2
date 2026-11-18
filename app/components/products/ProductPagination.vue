<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 text-xs text-stone-500">
    <div>
      Showing <span class="font-bold text-stone-800">1-5</span> of <span class="font-bold text-stone-800">28</span> items
    </div>

    <div class="flex items-center gap-1">
      <button
        class="w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-white transition-colors"
        disabled
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button class="w-7 h-7 rounded-lg bg-brand-100/80 text-brand-900 font-bold flex items-center justify-center text-xs shadow-sm">
        1
      </button>

      <button class="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors">
        2
      </button>

      <button class="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors">
        3
      </button>

      <button class="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-700 hover:bg-white transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>
