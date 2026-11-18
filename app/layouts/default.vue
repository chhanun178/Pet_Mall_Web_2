<template>
  <div class="min-h-screen flex flex-col bg-warm-50 text-stone-800 font-sans selection:bg-brand-500 selection:text-white">
    <!-- Top Global Header -->
    <LayoutAppHeader />

    <!-- Main App Body with Sidebar & Content -->
    <div class="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
      <!-- Left Navigation Sidebar -->
      <LayoutDashboardSidebar />

      <!-- Main Page Content -->
      <main class="flex-1 min-w-0">
        <slot />
      </main>
    </div>

    <!-- Trust Features Banner -->
    <LayoutTrustBadges />

    <!-- Dark Footer -->
    <LayoutAppFooter />

    <!-- Global Product & Service Slide-over Drawer -->
    <ProductsProductDrawer />

    <!-- Global Success Toast Notification -->
    <transition
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-900 text-white shadow-xl border border-stone-800 text-xs sm:text-sm font-medium"
      >
        <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          ✓
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { toastMessage } = useProducts()
</script>
