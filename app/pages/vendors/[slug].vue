<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug || 'storefront'))

useHead({
  title: () => `${slug.value} • Storefront | Pet Mall`,
})
</script>

<template>
  <section class="rounded-2xl border border-warm-200/90 bg-white p-6 shadow-card">
    <h1 class="text-xl font-bold text-stone-900">Storefront Profile</h1>
    <p class="mt-1 text-sm text-stone-500">
      Public storefront preview for <span class="font-semibold text-stone-800">{{ slug }}</span>.
    </p>
  </section>
</template>
