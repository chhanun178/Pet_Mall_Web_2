<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const config = useRuntimeConfig()
const { registerCustomer, loading } = useAuth()

function handleGoogleSignIn() {
  const apiBase = (config.public.apiBase as string) || 'http://localhost:4000'
  window.location.href = `${apiBase}/api/v1/auth/google`
}

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const infoMessage = ref('')

const passwordValid = computed(
  () =>
    password.value.length >= 8 &&
    /[A-Z]/.test(password.value) &&
    /[0-9]/.test(password.value),
)

async function handleSubmit() {
  errorMessage.value = ''
  infoMessage.value = ''

  if (!fullName.value.trim() || !email.value.trim()) {
    errorMessage.value = 'Please fill in your full name and email address.'
    return
  }

  if (!passwordValid.value) {
    errorMessage.value =
      'Password must be at least 8 characters with 1 uppercase letter and 1 number.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (!agreeTerms.value) {
    errorMessage.value = 'Please accept the Terms of Service and Privacy Policy.'
    return
  }

  try {
    const res = await registerCustomer({
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() || undefined,
      password: password.value,
    })

    await navigateTo({
      path: '/auth/verify-otp',
      query: { email: res.email },
    })
  } catch (error: unknown) {
    const fetchErr = error as {
      data?: { message?: string | string[] }
      message?: string
    }
    const rawMsg = fetchErr?.data?.message
    if (Array.isArray(rawMsg)) {
      errorMessage.value = rawMsg[0] || 'Unable to create account.'
    } else {
      errorMessage.value =
        rawMsg || 'Could not create your customer account. Please try again.'
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
        <AuthShowcasePanel mode="customer" />
      </div>

      <!-- Crisp Vertical Separator Line -->
      <div class="hidden lg:block bg-warm-200 my-8" aria-hidden="true" />

      <!-- Right Form Column -->
      <div class="flex flex-col justify-between p-5 sm:p-8 lg:p-10 min-w-0">
        <div>
          <!-- Mobile Compact Header -->
          <div class="lg:hidden mb-5 flex items-center justify-between">
            <NuxtLink to="/" class="inline-flex items-center gap-2 text-stone-900">
              <span
                class="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center"
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
              <span class="text-base font-bold tracking-tight">Pet Mall</span>
            </NuxtLink>
            <span class="text-xs font-medium text-stone-500">Customer Sign Up</span>
          </div>

          <!-- Top Bar -->
          <div class="flex items-center justify-between gap-3 mb-5">
            <NuxtLink
              to="/auth/login"
              class="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center text-stone-600 hover:bg-warm-50 hover:text-stone-900 transition-colors"
              aria-label="Back to sign in"
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

            <span
              class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100"
            >
              Customer Account
            </span>
          </div>

          <!-- Heading -->
          <div class="mb-5">
            <h1 class="text-2xl sm:text-[26px] font-bold tracking-tight text-stone-900">
              Create your account
            </h1>
            <p class="mt-1 text-sm text-stone-500">
              Shop curated nutrition, essentials, and local grooming care.
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

          <!-- Registration Form -->
          <form class="space-y-3.5" @submit.prevent="handleSubmit">
            <div>
              <label
                for="reg-name"
                class="block text-[13px] font-medium text-stone-700 mb-1"
              >
                Full name
              </label>
              <input
                id="reg-name"
                v-model="fullName"
                type="text"
                autocomplete="name"
                required
                placeholder="Alex Rivera"
                class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  for="reg-email"
                  class="block text-[13px] font-medium text-stone-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="reg-email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="you@example.com"
                  class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                />
              </div>

              <div>
                <label
                  for="reg-phone"
                  class="block text-[13px] font-medium text-stone-700 mb-1"
                >
                  Phone <span class="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  id="reg-phone"
                  v-model="phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+1 (555) 234-5678"
                  class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  for="reg-password"
                  class="block text-[13px] font-medium text-stone-700 mb-1"
                >
                  Password
                </label>
                <div class="relative">
                  <input
                    id="reg-password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    required
                    minlength="8"
                    maxlength="72"
                    placeholder="Min. 8 chars (A-Z, 0-9)"
                    class="w-full h-11 pl-3.5 pr-10 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-1 px-2 flex items-center text-stone-400 hover:text-stone-700"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label
                  for="reg-confirm"
                  class="block text-[13px] font-medium text-stone-700 mb-1"
                >
                  Confirm password
                </label>
                <input
                  id="reg-confirm"
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  minlength="8"
                  placeholder="Repeat password"
                  class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                />
              </div>
            </div>

            <p class="text-[11px] text-stone-400">
              Use 8+ characters with at least 1 uppercase letter and 1 number.
            </p>

            <label class="flex items-start gap-2.5 text-xs text-stone-600 pt-0.5 cursor-pointer select-none">
              <input
                v-model="agreeTerms"
                type="checkbox"
                class="mt-0.5 w-4 h-4 rounded border-warm-300 accent-brand-600"
              />
              <span>
                I agree to the Pet Mall Terms of Service and Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              :disabled="loading"
              class="w-full h-12 rounded-xl bg-brand-600 hover:bg-brand-700 text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Creating account...' : 'Create Customer Account' }}
            </button>
          </form>

          <!-- Separator + Google -->
          <div class="relative my-5 flex items-center">
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
            class="w-full h-11 rounded-xl border border-warm-200 bg-white hover:bg-warm-50 text-sm font-semibold text-stone-800 transition-colors flex items-center justify-center gap-2.5"
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
        </div>

        <div class="mt-5 text-center text-xs text-stone-500">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="font-semibold text-brand-600 hover:underline ml-1"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
