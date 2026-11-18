<template>
  <button
    type="button"
    role="switch"
    :aria-checked="enabled"
    @click="toggle"
    class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
    :class="enabled ? 'bg-[#F58700]' : 'bg-stone-300'"
  >
    <span
      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
      :class="enabled ? 'translate-x-4' : 'translate-x-0'"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultState?: boolean
}>(), {
  modelValue: undefined,
  defaultState: true
})

const emit = defineEmits(['update:modelValue', 'change'])

const innerState = ref(props.defaultState)
const enabled = computed(() => props.modelValue !== undefined ? props.modelValue : innerState.value)

const toggle = () => {
  const next = !enabled.value
  innerState.value = next
  emit('update:modelValue', next)
  emit('change', next)
}
</script>
