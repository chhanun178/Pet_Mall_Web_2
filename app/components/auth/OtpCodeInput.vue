<script setup lang="ts">
interface Props {
  modelValue: string
  accent?: 'customer' | 'vendor'
  success?: boolean
  error?: boolean
  disabled?: boolean
  autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'customer',
  success: false,
  error: false,
  disabled: false,
  autoFocus: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const digits = ref<string[]>(['', '', '', '', '', ''])
const inputRefs = ref<(HTMLInputElement | null)[]>([])

watch(
  () => props.modelValue,
  (val) => {
    const cleaned = (val || '').replace(/\D/g, '').slice(0, 6)
    if (cleaned !== digits.value.join('')) {
      for (let i = 0; i < 6; i++) {
        digits.value[i] = cleaned[i] || ''
      }
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (props.autoFocus) {
    nextTick(() => inputRefs.value[0]?.focus())
  }
})

function syncValue() {
  const code = digits.value.join('')
  emit('update:modelValue', code)
  if (/^\d{6}$/.test(code)) {
    emit('complete', code)
  }
}

function focusFirst() {
  nextTick(() => inputRefs.value[0]?.focus())
}

defineExpose({ focusFirst })

function applyPastedCode(cleaned: string) {
  const chars = cleaned.slice(0, 6).split('')
  for (let i = 0; i < 6; i++) {
    digits.value[i] = chars[i] || ''
  }
  syncValue()
  const focusIdx = Math.min(chars.length, 5)
  nextTick(() => {
    inputRefs.value[focusIdx]?.focus()
  })
}

function handleDigitInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const numeric = target.value.replace(/\D/g, '')

  if (numeric.length > 1) {
    applyPastedCode(numeric)
    return
  }

  digits.value[index] = numeric
  target.value = numeric
  syncValue()

  if (numeric && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    digits.value[index - 1] = ''
    syncValue()
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  const pasted = event.clipboardData?.getData('text') || ''
  const cleaned = pasted.replace(/\D/g, '').slice(0, 6)
  if (!cleaned) return
  event.preventDefault()
  applyPastedCode(cleaned)
}
</script>

<template>
  <div
    class="grid grid-cols-6 gap-1.5 sm:gap-2.5"
    :class="{ 'otp-shake': error && !success }"
    @paste="handlePaste"
  >
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :ref="(el) => (inputRefs[index] = el as HTMLInputElement | null)"
      :value="digit"
      :disabled="disabled || success"
      type="text"
      inputmode="numeric"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      maxlength="6"
      :aria-label="`OTP digit ${index + 1}`"
      :style="success ? { transitionDelay: `${index * 45}ms` } : undefined"
      class="w-full h-12 sm:h-[52px] text-center text-base sm:text-lg font-bold rounded-xl border bg-white text-stone-900 focus:outline-none transition-[transform,border-color,background-color,box-shadow] duration-200 will-change-transform"
      :class="
        success
          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-700 scale-[1.04] ring-2 ring-emerald-500/20'
          : error
            ? 'border-red-300 bg-red-50/30 text-red-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/15'
            : accent === 'vendor'
              ? 'border-warm-200 focus:border-[#1B6B52] focus:ring-2 focus:ring-[#1B6B52]/15'
              : 'border-warm-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15'
      "
      @input="handleDigitInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
    />
  </div>
</template>

<style scoped>
.otp-shake {
  animation: pm-otp-shake 340ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes pm-otp-shake {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(4px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-5px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(5px, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .otp-shake {
    animation: none;
  }
}
</style>
