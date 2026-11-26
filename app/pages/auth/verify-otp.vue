<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const route = useRoute()
const { verifyCustomerOtp, resendCustomerOtp, loading } = useAuth()

const email = ref(
  typeof route.query.email === 'string' ? route.query.email.trim() : '',
)
const otpCode = ref('')
const otpInputRef = ref<{ focusFirst: () => void } | null>(null)
const verified = ref(false)
const errorMessage = ref('')
const infoMessage = ref(
  email.value
    ? `We sent a 6-digit verification code to ${email.value}.`
    : 'Enter your email and 6-digit verification code.',
)
const cooldown = ref(60)

let cooldownTimer: ReturnType<typeof setInterval> | null = null
let redirectTimer: ReturnType<typeof setTimeout> | null = null

const canSubmit = computed(
  () =>
    !verified.value &&
    email.value.trim().length > 0 &&
    /^\d{6}$/.test(otpCode.value),
)

function startCooldown(seconds = 60) {
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldown.value = seconds
  cooldownTimer = setInterval(() => {
    if (cooldown.value <= 1) {
      cooldown.value = 0
      if (cooldownTimer) clearInterval(cooldownTimer)
      cooldownTimer = null
    } else {
      cooldown.value -= 1
    }
  }, 1000)
}

onMounted(() => {
  startCooldown(60)
})

onBeforeUnmount(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
  if (redirectTimer) clearTimeout(redirectTimer)
})

async function handleVerify() {
  if (verified.value || loading.value) return
  errorMessage.value = ''

  if (!canSubmit.value) {
    errorMessage.value = 'Please enter a valid email address and 6-digit OTP code.'
    return
  }

  try {
    await verifyCustomerOtp({
      email: email.value.trim(),
      otp: otpCode.value,
    })

    verified.value = true
    redirectTimer = setTimeout(() => {
      void navigateTo('/profile')
    }, 1250)
  } catch (error: unknown) {
    const fetchErr = error as { data?: { message?: string | string[] } }
    const rawMsg = fetchErr?.data?.message
    errorMessage.value = Array.isArray(rawMsg)
      ? rawMsg[0] || 'Invalid verification code.'
      : rawMsg || 'Invalid or expired verification code.'
  }
}

async function handleResend() {
  errorMessage.value = ''
  if (!email.value.trim() || cooldown.value > 0 || verified.value) return

  try {
    const res = await resendCustomerOtp({ email: email.value.trim() })
    infoMessage.value = res.message
    otpCode.value = ''
    startCooldown(60)
    otpInputRef.value?.focusFirst()
  } catch (error: unknown) {
    const fetchErr = error as { data?: { message?: string } }
    errorMessage.value =
      fetchErr?.data?.message || 'Unable to resend OTP right now. Please try again.'
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

      <!-- Right OTP Verification Column -->
      <div class="flex flex-col justify-between p-4 sm:p-8 lg:p-10 min-w-0">
        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between gap-3 mb-6">
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
              class="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border transition-colors"
              :class="
                verified
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-brand-600 bg-brand-50 border-brand-100'
              "
            >
              {{ verified ? 'Verified' : 'Email Verification' }}
            </span>
          </div>

          <Transition name="pm-step" mode="out-in">
            <!-- Animated Success State -->
            <AuthOtpSuccessCelebration
              v-if="verified"
              key="verified-state"
              title="Email verified!"
              subtitle="Your Pet Mall account is active. Taking you to your profile..."
              accent="customer"
            />

            <!-- OTP Entry Form -->
            <div v-else key="otp-form">
              <div class="mb-6">
                <h1 class="text-2xl sm:text-[26px] font-bold tracking-tight text-stone-900">
                  Enter verification code
                </h1>
                <p class="mt-1 text-sm text-stone-500">
                  Verify your email with the 6-digit OTP code to activate your Customer account.
                </p>
              </div>

              <div
                v-if="errorMessage"
                role="alert"
                class="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              >
                {{ errorMessage }}
              </div>
              <div
                v-else-if="infoMessage"
                role="status"
                class="mb-4 rounded-xl border border-warm-200 bg-warm-50 px-3.5 py-2.5 text-sm text-stone-700"
              >
                {{ infoMessage }}
              </div>

              <form class="space-y-5" @submit.prevent="handleVerify">
                <div>
                  <label
                    for="otp-email"
                    class="block text-[13px] font-medium text-stone-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="otp-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="you@example.com"
                    class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                  />
                </div>

                <div>
                  <span class="block text-[13px] font-medium text-stone-700 mb-2">
                    6-digit OTP code
                  </span>
                  <AuthOtpCodeInput
                    ref="otpInputRef"
                    v-model="otpCode"
                    accent="customer"
                    :error="Boolean(errorMessage)"
                    :disabled="loading"
                    auto-focus
                    @complete="handleVerify"
                  />
                  <p class="mt-2 text-[11px] text-stone-400">
                    Tip: Paste the full 6-digit code directly into any box.
                  </p>
                </div>

                <button
                  type="submit"
                  :disabled="loading || !canSubmit"
                  class="w-full h-12 rounded-xl bg-brand-600 hover:bg-brand-700 text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ loading ? 'Verifying...' : 'Verify & Sign in' }}
                </button>
              </form>

              <div class="mt-5 pt-4 border-t border-warm-200 flex items-center justify-between text-xs text-stone-500">
                <span>Didn't receive a code?</span>
                <button
                  type="button"
                  :disabled="cooldown > 0 || loading"
                  class="font-semibold text-brand-600 hover:underline disabled:text-stone-400 disabled:no-underline"
                  @click="handleResend"
                >
                  {{ cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div v-if="!verified" class="mt-6 text-center text-xs text-stone-500">
          Wrong email address?
          <NuxtLink
            to="/auth/register"
            class="font-semibold text-brand-600 hover:underline ml-1"
          >
            Back to registration
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pm-step-enter-active,
.pm-step-leave-active {
  transition:
    opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
.pm-step-enter-from {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
}
.pm-step-leave-to {
  opacity: 0;
  transform: translate3d(0, -6px, 0);
}

@media (prefers-reduced-motion: reduce) {
  .pm-step-enter-active,
  .pm-step-leave-active {
    transition: none;
  }
}
</style>
