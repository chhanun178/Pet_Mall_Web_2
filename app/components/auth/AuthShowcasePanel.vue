<script setup lang="ts">
interface Props {
  mode: 'customer' | 'vendor'
}

const props = defineProps<Props>()

const isVendor = computed(() => props.mode === 'vendor')

const heroImage = computed(() =>
  isVendor.value
    ? '/images/auth/hero-pets-vendor.jpg'
    : '/images/auth/hero-pets-customer.jpg',
)

const heroAlt = computed(() =>
  isVendor.value
    ? 'Pet Mall partner boutique with a happy dog'
    : 'Happy golden retriever and cat in a bright warm home',
)

const headlineLine1 = computed(() =>
  isVendor.value ? 'Grow your pet' : 'Happy pets,',
)

const headlineLine2 = computed(() =>
  isVendor.value ? 'brand with us.' : 'happy home.',
)
</script>

<template>
  <div
    class="relative w-full h-full min-h-[560px] lg:min-h-[640px] rounded-[24px] overflow-hidden bg-petdark select-none"
  >
    <img
      :src="heroImage"
      :alt="heroAlt"
      decoding="async"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
    />

    <!-- Subtle top & bottom gradient scrims for crisp legibility -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75"
    />

    <!-- Top Lockup & Floating Badge -->
    <div class="relative z-10 flex items-center justify-between p-6">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
      >
        <span
          class="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="7.5" cy="8.5" r="2" />
            <circle cx="12" cy="6.5" r="2" />
            <circle cx="16.5" cy="8.5" r="2" />
            <path
              d="M12 11.2c-2.9 0-5.2 2.1-5.2 4.6 0 1.5 1.2 2.7 2.8 2.7.9 0 1.6-.3 2.4-.3s1.5.3 2.4.3c1.6 0 2.8-1.2 2.8-2.7 0-2.5-2.3-4.6-5.2-4.6z"
            />
          </svg>
        </span>
        <span class="text-lg font-bold tracking-tight">Pet Mall</span>
      </NuxtLink>

      <div
        class="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white"
        :aria-label="isVendor ? 'Verified Partner Portal' : 'Customer Favorites'"
      >
        <svg
          v-if="!isVendor"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
          <path d="M9 21V12h6v9" />
        </svg>
      </div>
    </div>

    <!-- Bottom Minimal Headline & Indicator -->
    <div class="absolute inset-x-0 bottom-0 z-10 p-7">
      <h2
        class="text-[30px] leading-[1.15] font-bold tracking-tight text-white"
      >
        {{ headlineLine1 }}<br />{{ headlineLine2 }}
      </h2>

      <div class="mt-4 flex items-center gap-1.5" aria-hidden="true">
        <span
          class="h-1.5 rounded-full transition-all duration-300"
          :class="!isVendor ? 'w-5 bg-white' : 'w-1.5 bg-white/45'"
        />
        <span
          class="h-1.5 rounded-full transition-all duration-300"
          :class="isVendor ? 'w-5 bg-white' : 'w-1.5 bg-white/45'"
        />
        <span class="w-1.5 h-1.5 rounded-full bg-white/45" />
      </div>
    </div>
  </div>
</template>
