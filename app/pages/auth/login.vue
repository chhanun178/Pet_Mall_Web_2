<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'
import type { Role } from '~/types/auth'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const route = useRoute()
const config = useRuntimeConfig()
const { login, loading } = useAuth()
const isDev = import.meta.dev

const oauthErrorMessages: Record<string, string> = {
  google_not_configured:
    'Google Sign-In needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the backend .env.',
  vendor_google_blocked:
    'Google Sign-In is for Customers only. Vendor Partners must use their admin-provisioned email and password.',
  google_cancelled: 'Google Sign-In was cancelled.',
  google_state_invalid: 'Google Sign-In session expired. Please try again.',
  google_failed: 'Could not complete Google Sign-In. Please try again.',
}

const activeRole = ref<'customer' | 'vendor'>(
  route.query.role === 'vendor' ? 'vendor' : 'customer',
)

const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const showPassword = ref(false)
const initialError =
  typeof route.query.error === 'string'
    ? oauthErrorMessages[route.query.error] || ''
    : ''
const errorMessage = ref(initialError)
const infoMessage = ref(
  route.query.reset === 'success'
    ? 'Your password has been reset. Please sign in with your new password.'
    : '',
)

const isVendor = computed(() => activeRole.value === 'vendor')
const inventorySignIn = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.split(/[?#]/, 1)[0] === '/products'
})

const expectedApiRole = computed<Role>(() =>
  isVendor.value ? 'VENDOR' : 'CUSTOMER',
)

function switchRole(role: 'customer' | 'vendor') {
  activeRole.value = role
  errorMessage.value = ''
  infoMessage.value = ''
}

function fillDemoCredentials() {
  errorMessage.value = ''
  infoMessage.value = ''
  if (isVendor.value) {
    email.value = 'partner@happypaws.shop'
    password.value = 'VendorPass2026!'
  } else {
    email.value = 'customer@petmall.com'
    password.value = 'PetLover2026!'
  }
}

function handleGoogleSignIn() {
  const apiBase = (config.public.apiBase as string) || 'http://localhost:4000'
  window.location.href = `${apiBase}/api/v1/auth/google`
}

async function handleSubmit() {
  errorMessage.value = ''
  infoMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Please enter both your email address and password.'
    return
  }

  try {
    const res = await login({
      email: email.value.trim(),
      password: password.value,
      expectedRole: expectedApiRole.value,
    })

    const defaultRoute = res.user.role === 'VENDOR' ? '/' : '/profile'
    const rawRedirect = route.query.redirect
    const safeRedirect =
      typeof rawRedirect === 'string' &&
      rawRedirect.startsWith('/') &&
      !rawRedirect.startsWith('//')
        ? rawRedirect
        : defaultRoute

    await navigateTo(safeRedirect)
  } catch (error: unknown) {
    const fetchErr = error as {
      data?: {
        message?: string | string[]
        requiresOtpVerification?: boolean
        email?: string
      }
      message?: string
    }
    if (fetchErr?.data?.requiresOtpVerification) {
      await navigateTo({
        path: '/auth/verify-otp',
        query: { email: fetchErr.data.email || email.value.trim() },
      })
      return
    }
    const rawMsg = fetchErr?.data?.message
    if (Array.isArray(rawMsg)) {
      errorMessage.value = rawMsg[0] || 'Unable to sign in.'
    } else {
      errorMessage.value =
        rawMsg || 'Invalid email or password. Please check your credentials.'
    }
  }
}
</script>

<template>
  <main class="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
    <section
      class="w-full max-w-[1040px] bg-white rounded-[28px] border border-warm-200 shadow-[0_12px_40px_rgba(41,37,36,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]"
    >
      <!-- Left Showcase Panel (Desktop) -->
      <div class="hidden lg:block p-4">
        <AuthShowcasePanel :mode="activeRole" />
      </div>

      <!-- Crisp Vertical Separator Line -->
      <div class="hidden lg:block bg-warm-200 my-8" aria-hidden="true" />

      <!-- Right Form Column -->
      <div class="flex flex-col justify-between p-5 sm:p-8 lg:p-10 min-w-0">
        <div>
          <!-- Mobile Compact Animal Header -->
          <div class="lg:hidden mb-5">
            <div class="relative h-32 sm:h-40 rounded-2xl overflow-hidden bg-petdark">
              <img
                :src="
                  isVendor
                    ? '/images/auth/hero-pets-vendor.jpg'
                    : '/images/auth/hero-pets-customer.jpg'
                "
                :alt="isVendor ? 'Pet Mall Partner' : 'Pet Mall Customer'"
                class="w-full h-full object-cover object-center"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              />
              <div class="absolute inset-x-0 bottom-0 p-3.5 flex items-center justify-between">
                <div class="flex items-center gap-2 text-white">
                  <span
                    class="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="7.5" cy="8.5" r="2" />
                      <circle cx="12" cy="6.5" r="2" />
                      <circle cx="16.5" cy="8.5" r="2" />
                      <path
                        d="M12 11.2c-2.9 0-5.2 2.1-5.2 4.6 0 1.5 1.2 2.7 2.8 2.7.9 0 1.6-.3 2.4-.3s1.5.3 2.4.3c1.6 0 2.8-1.2 2.8-2.7 0-2.5-2.3-4.6-5.2-4.6z"
                      />
                    </svg>
                  </span>
                  <span class="text-sm font-bold tracking-tight">Pet Mall</span>
                </div>
                <span
                  class="text-[11px] font-medium text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20"
                >
                  {{ isVendor ? 'Desktop Partner Portal' : 'Happy pets, happy home' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Top Bar: Back + Demo Fill -->
          <div class="flex items-center justify-between gap-3 mb-6">
            <NuxtLink
              to="/"
              class="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center text-stone-600 hover:bg-warm-50 hover:text-stone-900 transition-colors"
              aria-label="Back to Pet Mall"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NuxtLink>

            <button
              v-if="isDev"
              type="button"
              class="text-xs font-medium text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-full border border-warm-200 hover:bg-warm-50 transition-colors"
              :class="{ 'hidden lg:inline-flex': isVendor }"
              @click="fillDemoCredentials"
            >
              Fill demo {{ isVendor ? 'vendor' : 'customer' }}
            </button>
          </div>

          <!-- Segmented Role Switcher -->
          <div
            role="tablist"
            aria-label="Account role"
            class="grid grid-cols-2 p-1 rounded-xl bg-warm-100 border border-warm-200 mb-6"
          >
            <button
              type="button"
              role="tab"
              :aria-selected="!isVendor"
              class="h-10 rounded-lg text-sm font-semibold transition-all"
              :class="
                !isVendor
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              "
              @click="switchRole('customer')"
            >
              Customer
            </button>
            <button
              type="button"
              role="tab"
              :aria-selected="isVendor"
              class="h-10 rounded-lg text-sm font-semibold transition-all"
              :class="
                isVendor
                  ? 'bg-white text-[#1B6B52] shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              "
              @click="switchRole('vendor')"
            >
              Vendor Partner
            </button>
          </div>

          <div v-if="isVendor && !inventorySignIn" class="lg:hidden py-2">
            <AuthVendorDesktopNotice
              show-switch-to-customer
              @switch-to-customer="switchRole('customer')"
            />
          </div>

          <div :class="isVendor && !inventorySignIn ? 'hidden lg:block' : 'block'">
            <!-- Heading -->
            <div class="mb-5">
              <h1 class="text-2xl sm:text-[26px] font-bold tracking-tight text-stone-900">
                {{ isVendor ? 'Vendor Partner Portal' : 'Welcome back' }}
              </h1>
              <p class="mt-1 text-sm text-stone-500">
                {{
                  isVendor
                    ? 'Sign in with your admin-provisioned partner credentials.'
                    : 'Sign in to manage orders, refills, and pet profiles.'
                }}
              </p>
            </div>

            <!-- Error / Info Banners -->
            <div
              v-if="errorMessage"
              role="alert"
              class="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
            >
              {{ errorMessage }}
            </div>
            <div
              v-if="infoMessage"
              role="status"
              class="mb-4 rounded-xl border border-warm-300 bg-warm-50 px-3.5 py-2.5 text-sm text-stone-700"
            >
              {{ infoMessage }}
            </div>

            <!-- Login Form -->
            <form class="space-y-4" @submit.prevent="handleSubmit">
              <div>
                <label
                  for="login-email"
                  class="block text-[13px] font-medium text-stone-700 mb-1.5"
                >
                  {{ isVendor ? 'Partner email address' : 'Email address' }}
                </label>
                <div class="relative">
                  <span
                    class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-400"
                  >
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    id="login-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    :placeholder="
                      isVendor ? 'partner@happypaws.shop' : 'customer@petmall.com'
                    "
                    class="w-full h-12 pl-10 pr-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-shadow"
                    :class="
                      isVendor
                        ? 'focus:border-[#1B6B52] focus:ring-[#1B6B52]/15'
                        : 'focus:border-brand-600 focus:ring-brand-600/15'
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  for="login-password"
                  class="block text-[13px] font-medium text-stone-700 mb-1.5"
                >
                  Password
                </label>
                <div class="relative">
                  <span
                    class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-400"
                  >
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="login-password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    required
                    maxlength="72"
                    placeholder="Enter your password"
                    class="w-full h-12 pl-10 pr-11 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-shadow"
                    :class="
                      isVendor
                        ? 'focus:border-[#1B6B52] focus:ring-[#1B6B52]/15'
                        : 'focus:border-brand-600 focus:ring-brand-600/15'
                    "
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-1.5 px-2.5 flex items-center text-stone-400 hover:text-stone-700"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="!showPassword"
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2 pt-0.5">
                <label class="inline-flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="w-4 h-4 rounded border-warm-300"
                    :class="isVendor ? 'accent-[#1B6B52]' : 'accent-brand-600'"
                  />
                  Keep me signed in
                </label>

                <NuxtLink
                  :to="{
                    path: '/auth/forgot-password',
                    query: isVendor ? { role: 'vendor' } : undefined,
                  }"
                  class="text-xs font-medium hover:underline"
                  :class="isVendor ? 'text-[#1B6B52]' : 'text-brand-600'"
                >
                  Forgot password?
                </NuxtLink>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full h-12 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :class="
                  isVendor
                    ? 'bg-[#1B6B52] hover:bg-[#155440]'
                    : 'bg-brand-600 hover:bg-brand-700'
                "
              >
                <span>
                  {{
                    loading
                      ? 'Signing in...'
                      : isVendor
                        ? 'Sign in to Vendor Portal'
                        : 'Sign in to Pet Mall'
                  }}
                </span>
              </button>
            </form>

            <!-- Customer Mode: Separator + Google -->
            <template v-if="!isVendor">
              <div class="relative my-6 flex items-center">
                <div class="flex-grow border-t border-warm-200" />
                <span
                  class="mx-3 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-stone-400"
                >
                  Or continue with
                </span>
                <div class="flex-grow border-t border-warm-200" />
              </div>

              <button
                type="button"
                class="w-full h-12 rounded-xl border border-warm-200 bg-white hover:bg-warm-50 text-sm font-semibold text-stone-800 transition-colors flex items-center justify-center gap-2.5"
                @click="handleGoogleSignIn"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </template>

            <!-- Vendor Mode: Login-Only Notice below Crisp Horizontal Separator -->
            <template v-else>
              <div class="mt-6 pt-5 border-t border-warm-200">
                <div class="flex items-start gap-3 rounded-xl bg-warm-50 border border-warm-200 p-3.5">
                  <svg
                    class="w-4 h-4 text-[#1B6B52] shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <p class="text-xs leading-relaxed text-stone-600">
                    Vendor Partner accounts are desktop-only and provisioned by Pet Mall
                    Admin — public vendor registration is disabled.
                    <button
                      type="button"
                      class="font-semibold text-[#1B6B52] hover:underline ml-1"
                      @click="
                        infoMessage =
                          'Contact partners@petmall.com to request store onboarding.'
                      "
                    >
                      Contact Partner Support
                    </button>
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Bottom Footer Link (Customer Register Only) -->
        <div v-if="!isVendor" class="mt-6 text-center text-xs text-stone-500">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="font-semibold text-brand-600 hover:underline ml-1"
          >
            Create an account
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
