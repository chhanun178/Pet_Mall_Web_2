<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

const route = useRoute()
const { requestPasswordReset, resetPasswordWithOtp, loading } = useAuth()

const isVendor = computed(() => route.query.role === 'vendor')
const accentMode = computed(() => (isVendor.value ? 'vendor' : 'customer'))
const step = ref<'email' | 'reset' | 'done'>('email')

const email = ref(
  typeof route.query.email === 'string' ? route.query.email.trim() : '',
)
const otpCode = ref('')
const otpInputRef = ref<{ focusFirst: () => void } | null>(null)
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const infoMessage = ref('')
const cooldown = ref(0)

let cooldownTimer: ReturnType<typeof setInterval> | null = null
let redirectTimer: ReturnType<typeof setTimeout> | null = null

const passwordValid = computed(
  () =>
    newPassword.value.length >= 8 &&
    newPassword.value.length <= 72 &&
    /[A-Z]/.test(newPassword.value) &&
    /[0-9]/.test(newPassword.value),
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

onBeforeUnmount(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
  if (redirectTimer) clearTimeout(redirectTimer)
})

async function handleSendCode() {
  errorMessage.value = ''
  infoMessage.value = ''

  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email address.'
    return
  }

  try {
    const res = await requestPasswordReset({ email: email.value.trim() })
    infoMessage.value = res.message
    step.value = 'reset'
    otpCode.value = ''
    startCooldown(60)
    nextTick(() => otpInputRef.value?.focusFirst())
  } catch (error: unknown) {
    const fetchErr = error as { data?: { message?: string | string[] } }
    const rawMsg = fetchErr?.data?.message
    errorMessage.value = Array.isArray(rawMsg)
      ? rawMsg[0] || 'Unable to send reset code.'
      : rawMsg || 'Unable to send reset code. Please try again.'
  }
}

async function handleResetPassword() {
  if (step.value === 'done' || loading.value) return
  errorMessage.value = ''

  if (!/^\d{6}$/.test(otpCode.value)) {
    errorMessage.value = 'Please enter the 6-digit OTP code from your email.'
    return
  }

  if (!passwordValid.value) {
    errorMessage.value =
      'Password must be 8–72 characters with at least 1 uppercase letter and 1 number.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    await resetPasswordWithOtp({
      email: email.value.trim(),
      otp: otpCode.value,
      newPassword: newPassword.value,
    })

    step.value = 'done'
    redirectTimer = setTimeout(() => {
      void navigateTo({
        path: '/auth/login',
        query: {
          reset: 'success',
          ...(isVendor.value ? { role: 'vendor' } : {}),
        },
      })
    }, 1250)
  } catch (error: unknown) {
    const fetchErr = error as { data?: { message?: string | string[] } }
    const rawMsg = fetchErr?.data?.message
    errorMessage.value = Array.isArray(rawMsg)
      ? rawMsg[0] || 'Unable to reset password.'
      : rawMsg || 'Invalid or expired reset code.'
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
        <AuthShowcasePanel :mode="accentMode" />
      </div>

      <!-- Crisp Vertical Separator Line -->
      <div class="hidden lg:block bg-warm-200 my-8" aria-hidden="true" />

      <!-- Right Password Reset Column -->
      <div class="flex flex-col justify-between p-4 sm:p-8 lg:p-10 min-w-0">
        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between gap-3 mb-6">
            <NuxtLink
              :to="{
                path: '/auth/login',
                query: isVendor ? { role: 'vendor' } : undefined,
              }"
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
                step === 'done'
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : isVendor
                    ? 'text-[#1B6B52] bg-[#1B6B52]/10 border-[#1B6B52]/20'
                    : 'text-brand-600 bg-brand-50 border-brand-100'
              "
            >
              {{ step === 'done' ? 'Verified' : 'Password Recovery' }}
            </span>
          </div>

          <Transition name="pm-step" mode="out-in">
            <!-- Animated Success State -->
            <AuthOtpSuccessCelebration
              v-if="step === 'done'"
              key="reset-done"
              title="Password updated!"
              subtitle="Verification succeeded. Redirecting you to sign in..."
              :accent="accentMode"
            />

            <div v-else :key="step">
              <!-- Heading -->
              <div class="mb-6">
                <h1 class="text-2xl sm:text-[26px] font-bold tracking-tight text-stone-900">
                  {{ step === 'email' ? 'Forgot password?' : 'Set a new password' }}
                </h1>
                <p class="mt-1 text-sm text-stone-500">
                  {{
                    step === 'email'
                      ? 'Enter your account email and we will send a 6-digit reset OTP.'
                      : `Enter the 6-digit code sent to ${email} and choose a new password.`
                  }}
                </p>
              </div>

              <!-- Error / Status Banners -->
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

              <!-- Step 1: Request Reset OTP -->
              <form v-if="step === 'email'" class="space-y-4" @submit.prevent="handleSendCode">
                <div>
                  <label
                    for="forgot-email"
                    class="block text-[13px] font-medium text-stone-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="forgot-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="you@example.com"
                    class="w-full h-12 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-shadow"
                    :class="
                      isVendor
                        ? 'focus:border-[#1B6B52] focus:ring-[#1B6B52]/15'
                        : 'focus:border-brand-600 focus:ring-brand-600/15'
                    "
                  />
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full h-12 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  :class="
                    isVendor
                      ? 'bg-[#1B6B52] hover:bg-[#155440]'
                      : 'bg-brand-600 hover:bg-brand-700'
                  "
                >
                  {{ loading ? 'Sending code...' : 'Send 6-digit reset OTP' }}
                </button>
              </form>

              <!-- Step 2: Enter OTP + New Password -->
              <form v-else class="space-y-4" @submit.prevent="handleResetPassword">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[13px] font-medium text-stone-700">
                      6-digit reset code
                    </span>
                    <button
                      type="button"
                      :disabled="cooldown > 0 || loading"
                      class="text-xs font-semibold hover:underline disabled:text-stone-400 disabled:no-underline"
                      :class="isVendor ? 'text-[#1B6B52]' : 'text-brand-600'"
                      @click="handleSendCode"
                    >
                      {{ cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP' }}
                    </button>
                  </div>
                  <AuthOtpCodeInput
                    ref="otpInputRef"
                    v-model="otpCode"
                    :accent="accentMode"
                    :error="Boolean(errorMessage)"
                    :disabled="loading"
                  />
                </div>

                <div>
                  <label
                    for="reset-password"
                    class="block text-[13px] font-medium text-stone-700 mb-1"
                  >
                    New password
                  </label>
                  <div class="relative">
                    <input
                      id="reset-password"
                      v-model="newPassword"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      minlength="8"
                      maxlength="72"
                      placeholder="Min. 8 chars (A-Z, 0-9)"
                      class="w-full h-11 pl-3.5 pr-10 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2"
                      :class="
                        isVendor
                          ? 'focus:border-[#1B6B52] focus:ring-[#1B6B52]/15'
                          : 'focus:border-brand-600 focus:ring-brand-600/15'
                      "
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
                    for="reset-confirm"
                    class="block text-[13px] font-medium text-stone-700 mb-1"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="reset-confirm"
                    v-model="confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    required
                    minlength="8"
                    maxlength="72"
                    placeholder="Repeat new password"
                    class="w-full h-11 px-3.5 rounded-xl border border-warm-200 bg-white text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2"
                    :class="
                      isVendor
                        ? 'focus:border-[#1B6B52] focus:ring-[#1B6B52]/15'
                        : 'focus:border-brand-600 focus:ring-brand-600/15'
                    "
                  />
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full h-12 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  :class="
                    isVendor
                      ? 'bg-[#1B6B52] hover:bg-[#155440]'
                      : 'bg-brand-600 hover:bg-brand-700'
                  "
                >
                  {{ loading ? 'Resetting password...' : 'Reset password' }}
                </button>
              </form>
            </div>
          </Transition>
        </div>

        <div v-if="step !== 'done'" class="mt-6 text-center text-xs text-stone-500">
          Remembered your password?
          <NuxtLink
            :to="{
              path: '/auth/login',
              query: isVendor ? { role: 'vendor' } : undefined,
            }"
            class="font-semibold hover:underline ml-1"
            :class="isVendor ? 'text-[#1B6B52]' : 'text-brand-600'"
          >
            Back to sign in
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
