<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  accent?: 'customer' | 'vendor'
}

withDefaults(defineProps<Props>(), {
  accent: 'customer',
})
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    class="py-6 sm:py-8 flex flex-col items-center text-center otp-success-enter"
  >
    <!-- GPU-Composited Animated Checkmark & Particle Halo -->
    <div class="relative w-24 h-24 flex items-center justify-center mb-5">
      <!-- Expanding Radial Halo -->
      <span
        class="absolute inset-1 rounded-full otp-halo"
        :class="accent === 'vendor' ? 'bg-[#1B6B52]/15' : 'bg-emerald-500/15'"
        aria-hidden="true"
      />

      <!-- 6 Lightweight Geometric Sparks -->
      <span class="otp-spark otp-spark-1 bg-brand-500" aria-hidden="true" />
      <span class="otp-spark otp-spark-2 bg-emerald-500" aria-hidden="true" />
      <span class="otp-spark otp-spark-3 bg-amber-400" aria-hidden="true" />
      <span class="otp-spark otp-spark-4 bg-brand-400" aria-hidden="true" />
      <span class="otp-spark otp-spark-5 bg-emerald-400" aria-hidden="true" />
      <span class="otp-spark otp-spark-6 bg-amber-500" aria-hidden="true" />

      <!-- Main Check Circle -->
      <div
        class="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-sm otp-circle-pop"
        :class="accent === 'vendor' ? 'bg-[#1B6B52]' : 'bg-emerald-600'"
      >
        <svg
          class="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path class="otp-check-path" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <span
      class="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
      :class="
        accent === 'vendor'
          ? 'bg-[#1B6B52]/10 text-[#1B6B52]'
          : 'bg-emerald-50 text-emerald-700'
      "
    >
      Verified
    </span>

    <h2 class="text-2xl font-bold tracking-tight text-stone-900">
      {{ title }}
    </h2>
    <p class="mt-1.5 text-sm text-stone-500 max-w-xs">
      {{ subtitle }}
    </p>

    <!-- Composited Progress Bar (transform: scaleX only) -->
    <div class="mt-6 w-48 h-1 rounded-full bg-warm-200 overflow-hidden" aria-hidden="true">
      <div
        class="h-full w-full origin-left otp-progress"
        :class="accent === 'vendor' ? 'bg-[#1B6B52]' : 'bg-emerald-600'"
      />
    </div>
  </div>
</template>

<style scoped>
.otp-success-enter {
  animation: pm-fade-up 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.otp-circle-pop {
  will-change: transform, opacity;
  animation: pm-circle-pop 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.otp-halo {
  will-change: transform, opacity;
  animation: pm-halo-burst 750ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both;
}

.otp-check-path {
  stroke-dasharray: 26;
  stroke-dashoffset: 26;
  animation: pm-check-draw 380ms cubic-bezier(0.22, 1, 0.36, 1) 180ms forwards;
}

.otp-progress {
  will-change: transform;
  animation: pm-progress-fill 1150ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
}

.otp-spark {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  opacity: 0;
  will-change: transform, opacity;
}

.otp-spark-1 {
  animation: pm-spark-1 680ms cubic-bezier(0.16, 1, 0.3, 1) 140ms both;
}
.otp-spark-2 {
  animation: pm-spark-2 680ms cubic-bezier(0.16, 1, 0.3, 1) 170ms both;
}
.otp-spark-3 {
  animation: pm-spark-3 680ms cubic-bezier(0.16, 1, 0.3, 1) 150ms both;
}
.otp-spark-4 {
  animation: pm-spark-4 680ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both;
}
.otp-spark-5 {
  animation: pm-spark-5 680ms cubic-bezier(0.16, 1, 0.3, 1) 160ms both;
}
.otp-spark-6 {
  animation: pm-spark-6 680ms cubic-bezier(0.16, 1, 0.3, 1) 190ms both;
}

@keyframes pm-fade-up {
  from {
    opacity: 0;
    transform: translate3d(0, 8px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes pm-circle-pop {
  0% {
    opacity: 0;
    transform: scale3d(0.65, 0.65, 1);
  }
  70% {
    opacity: 1;
    transform: scale3d(1.07, 1.07, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes pm-halo-burst {
  0% {
    opacity: 0.7;
    transform: scale3d(0.75, 0.75, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1.45, 1.45, 1);
  }
}

@keyframes pm-check-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pm-progress-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes pm-spark-1 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(-34px, -28px, 0) scale(0.3);
  }
}

@keyframes pm-spark-2 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(36px, -26px, 0) scale(0.3);
  }
}

@keyframes pm-spark-3 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(-40px, 8px, 0) scale(0.3);
  }
}

@keyframes pm-spark-4 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(40px, 10px, 0) scale(0.3);
  }
}

@keyframes pm-spark-5 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(-24px, 34px, 0) scale(0.3);
  }
}

@keyframes pm-spark-6 {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate3d(26px, 32px, 0) scale(0.3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .otp-success-enter,
  .otp-circle-pop,
  .otp-halo,
  .otp-check-path,
  .otp-progress,
  .otp-spark {
    animation: none !important;
  }
  .otp-check-path {
    stroke-dashoffset: 0;
  }
  .otp-progress {
    transform: scaleX(1);
  }
}
</style>
