<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'
import { useProducts } from '~/composables/useProducts'

const { toastMessage } = useProducts()
const { isVendor, logout } = useAuth()
const route = useRoute()
const catalog = computed(() => route.meta.inventoryCatalog === true)
const services = computed(() => route.query.type === 'service')
const desktopOnly = computed(() => isVendor.value && !catalog.value)

useHead(() => ({
  link: catalog.value ? [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' }] : [],
}))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-warm-50 text-stone-800 font-sans selection:bg-brand-500 selection:text-white" :class="{ 'catalog-layout': catalog }">
    <!-- Top Global Header -->
    <LayoutAppHeader :catalog="catalog" :class="{ 'catalog-navbar': catalog }">
      <template v-if="catalog" #navigation>
        <nav aria-label="Catalog listings" class="hidden items-center gap-6 text-sm font-semibold text-[#584237] sm:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <NuxtLink to="/products" :aria-current="!services ? 'page' : undefined" :class="{ 'text-[#9d4300]': !services }">Products</NuxtLink>
          <NuxtLink :to="{ path: '/products', query: { type: 'service' } }" :aria-current="services ? 'page' : undefined" :class="{ 'text-[#9d4300]': services }">Services</NuxtLink>
        </nav>
      </template>
    </LayoutAppHeader>

    <!-- Vendor Desktop-Only Guard on Mobile/Tablet (<1024px) -->
    <div v-if="desktopOnly" class="lg:hidden flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <AuthVendorDesktopNotice show-sign-out @sign-out="logout()" />
      </div>
    </div>

    <!-- Main App Body with Sidebar & Content -->
    <div
      class="flex-1 max-w-[1600px] w-full mx-auto px-4 relative items-start"
      :class="[desktopOnly ? 'hidden lg:flex' : 'flex', { 'catalog-shell': catalog }]"
    >
      <!-- Left Navigation Sidebar -->
      <LayoutDashboardSidebar :class="{ 'catalog-sidebar': catalog }" :storefront-link="catalog ? '/profile' : undefined" />

      <!-- Main Page Content -->
      <div class="min-w-0 flex-1">
        <main class="py-6 pl-0 md:pl-4" :class="{ 'catalog-main': catalog }">
          <slot />
        </main>
        <template v-if="catalog">
          <LayoutTrustBadges class="catalog-trust" />
          <LayoutAppFooter class="catalog-footer" />
        </template>
      </div>
    </div>

    <!-- Trust Features Banner -->
    <LayoutTrustBadges v-if="!catalog" />

    <!-- Dark Footer -->
    <LayoutAppFooter v-if="!catalog" />

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
        role="status"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-900 text-white shadow-xl border border-stone-800 text-sm font-medium"
      >
        <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          ✓
        </div>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.catalog-layout {
  background: #fdf6f6;
  color: #141b2b;
}

.catalog-layout :deep(*) {
  font-family: 'Plus Jakarta Sans', 'Google Sans', sans-serif;
}

.catalog-navbar { height: 4rem; }
.catalog-navbar :deep(> div) { padding-inline: 1rem; }
.catalog-shell { max-width: none; padding: 0; }
.catalog-sidebar { display: none; }
.catalog-main { padding: 1rem 1rem 3rem; }
.catalog-trust { padding-block: 2rem; }
.catalog-footer { background: #181c24; }
.catalog-trust :deep(> div), .catalog-footer :deep(> div) { padding-inline: 1.5rem; }

@media (min-width: 1024px) {
  .catalog-navbar :deep(> div) { padding-inline: 1.5rem; }
  .catalog-shell { background: linear-gradient(to right, white 240px, transparent 240px); }
  .catalog-sidebar {
    display: flex;
    top: 4rem;
    width: 240px;
    height: calc(100dvh - 4rem);
    padding: 1rem 0.75rem;
    background: white;
    overflow-y: auto;
  }
  .catalog-sidebar :deep(a[aria-current='page']) {
    border-left: 4px solid #9d4300;
    border-radius: 0.625rem;
    padding-left: 0.5rem;
    background: #fdf6f6;
    color: #9d4300;
  }
  .catalog-sidebar :deep(a[aria-current='page'] svg) { color: inherit; }
  .catalog-sidebar :deep(nav a) { padding-block: 0.625rem; }
  .catalog-main { padding: 0 1.5rem 4rem; }
  .catalog-footer :deep(> div) { padding-inline: 2rem; }
}
</style>
