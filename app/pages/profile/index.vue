<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

definePageMeta({
  middleware: ['auth'],
})

const { user, isVendor, displayName, initials, fetchCurrentUser, logout } = useAuth()

onMounted(async () => {
  try {
    await fetchCurrentUser()
  } catch {
    // Session expired; middleware or authorizedFetch will redirect
  }
})
</script>

<template>
  <div class="max-w-3xl space-y-6">
    <div class="bg-white rounded-2xl border border-warm-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
          :class="isVendor ? 'bg-[#1B6B52]' : 'bg-brand-600'"
        >
          {{ initials }}
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-xl font-bold tracking-tight text-stone-900">
              {{ displayName }}
            </h1>
            <span
              class="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              :class="
                isVendor
                  ? 'bg-[#1B6B52]/10 text-[#1B6B52]'
                  : 'bg-brand-50 text-brand-600'
              "
            >
              {{ user?.role }}
            </span>
          </div>
          <p class="text-sm text-stone-500 mt-0.5">{{ user?.email }}</p>
        </div>
      </div>

      <button
        type="button"
        class="h-10 px-4 rounded-xl border border-warm-200 text-xs font-semibold text-stone-700 hover:bg-warm-50 transition-colors self-start sm:self-center"
        @click="logout()"
      >
        Sign out
      </button>
    </div>

    <!-- Customer Details -->
    <div
      v-if="user?.customerProfile"
      class="bg-white rounded-2xl border border-warm-200 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div>
        <p class="text-xs font-medium text-stone-500">Customer Name</p>
        <p class="text-sm font-semibold text-stone-900 mt-1">
          {{ user.customerProfile.fullName }}
        </p>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-500">PawPoints Balance</p>
        <p class="text-sm font-semibold text-brand-600 mt-1">
          {{ user.customerProfile.loyaltyPoints }} pts
        </p>
      </div>
    </div>

    <!-- Vendor Details -->
    <div
      v-if="user?.vendorProfile"
      class="bg-white rounded-2xl border border-warm-200 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div>
        <p class="text-xs font-medium text-stone-500">Store Name</p>
        <p class="text-sm font-semibold text-stone-900 mt-1">
          {{ user.vendorProfile.storeName }}
        </p>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-500">Owner Name</p>
        <p class="text-sm font-semibold text-stone-900 mt-1">
          {{ user.vendorProfile.ownerName }}
        </p>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-500">Category</p>
        <p class="text-sm font-semibold text-stone-900 mt-1">
          {{ user.vendorProfile.businessCategory }}
        </p>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-500">Partner Status</p>
        <p class="text-sm font-semibold text-[#1B6B52] mt-1">
          {{ user.vendorProfile.vendorStatus }} • {{ user.vendorProfile.taxOrLicenseId }}
        </p>
      </div>
    </div>
  </div>
</template>
