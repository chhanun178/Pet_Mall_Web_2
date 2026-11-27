<script setup lang="ts">
import type { InventoryItem, ListingType, PetType, ProductInput } from '~/types/products'

const props = defineProps<{
  open: boolean
  type: ListingType
  item: InventoryItem | null
  categories: string[]
  saving: boolean
  error: string
  focusStock: boolean
}>()
const emit = defineEmits<{ close: []; save: [input: ProductInput, image: File | null] }>()

const dialog = ref<HTMLDialogElement>()
const imageInput = ref<HTMLInputElement>()
const stockInput = ref<HTMLInputElement>()
const name = ref('')
const description = ref('')
const subtitle = ref('')
const category = ref('')
const petType = ref<PetType>('all')
const price = ref<number | ''>('')
const cost = ref<number | ''>('')
const stock = ref<number | ''>('')
const image = shallowRef<File | null>(null)
const preview = ref('')
const existingImage = ref<string | null>(null)
const imageError = ref('')
const removeImage = ref(false)

const margin = computed(() => {
  if (price.value === '' || price.value <= 0 || cost.value === '') return '—'
  const profit = (Math.round(price.value * 100) - Math.round(cost.value * 100)) / 100
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profit)
  return `${((profit / price.value) * 100).toFixed(2)}% / ${formatted}`
})

function clearSelection() {
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value = ''
  image.value = null
  imageError.value = ''
  if (imageInput.value) imageInput.value.value = ''
}

watch(() => props.open, (open) => {
  clearSelection()
  if (!open) {
    dialog.value?.close()
    return
  }
  const item = props.item
  name.value = item?.name ?? ''
  description.value = item?.description ?? ''
  subtitle.value = item?.subtitle ?? ''
  category.value = item?.category ?? ''
  petType.value = item?.petType ?? 'all'
  price.value = item ? item.priceCents / 100 : ''
  cost.value = item ? item.costCents / 100 : ''
  stock.value = item?.stock ?? ''
  existingImage.value = item?.imageUrl ?? null
  removeImage.value = false
  dialog.value?.showModal()
  if (props.focusStock) stockInput.value?.focus()
}, { flush: 'post' })

onBeforeUnmount(clearSelection)

function chooseImage(file?: File) {
  if (!file) return
  clearSelection()
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || !file.size || file.size > 5 * 1024 * 1024) {
    imageError.value = 'Choose a JPEG, PNG, or WebP image up to 5 MB.'
    return
  }
  image.value = file
  preview.value = URL.createObjectURL(file)
  removeImage.value = false
}

function submit() {
  if (props.saving || imageError.value || price.value === '' || cost.value === '' || stock.value === '') return
  emit('save', {
    name: name.value.trim(),
    description: description.value.trim(),
    subtitle: subtitle.value.trim(),
    category: category.value.trim(),
    type: props.type,
    petType: petType.value,
    priceCents: Math.round(price.value * 100),
    costCents: Math.round(cost.value * 100),
    stock: stock.value,
    ...(removeImage.value ? { removeImage: true } : {}),
  }, image.value)
}
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="product-drawer-title"
    class="product-drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[480px] bg-white text-[#141b2b] shadow-2xl"
    @cancel.prevent="!saving && emit('close')"
    @click.self="!saving && emit('close')"
  >
    <form class="flex h-full flex-col" @submit.prevent="submit">
      <header class="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <h2 id="product-drawer-title" class="text-xl font-bold sm:text-2xl">
          {{ item ? `Edit ${type}` : `Add a new ${type}` }}
        </h2>
        <button type="button" aria-label="Close editor" :disabled="saving" class="rounded-lg p-2 hover:bg-[#f1f3ff]" @click="emit('close')">
          <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <fieldset :disabled="saving" class="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 pb-6 sm:px-6">
        <section class="space-y-3" aria-labelledby="listing-details">
          <h3 id="listing-details" class="font-bold">Basic Information</h3>
          <label>
            <span>{{ type === 'product' ? 'Product' : 'Service' }} Title</span>
            <input v-model="name" required pattern=".*\S.*" maxlength="160" type="text" autofocus>
          </label>
          <label>
            <span>Description</span>
            <textarea v-model="description" rows="3" maxlength="4000" />
          </label>
          <label>
            <span>Catalog subtitle <span class="font-normal text-[#6b7280]">(optional)</span></span>
            <input v-model="subtitle" type="text" maxlength="160" :placeholder="type === 'product' ? 'e.g. 3 size options' : 'e.g. 60 min private session'">
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label>
              <span>Category</span>
              <input v-model="category" required pattern=".*\S.*" type="text" maxlength="80" list="listing-categories" placeholder="e.g. Supplements">
              <datalist id="listing-categories">
                <option v-for="option in categories" :key="option" :value="option" />
              </datalist>
            </label>
            <label>
              <span>Pet Type</span>
              <select v-model="petType">
                <option value="all">All Pets</option>
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="other">Other Pets</option>
              </select>
            </label>
          </div>
        </section>

        <section class="space-y-3" aria-labelledby="listing-price">
          <h3 id="listing-price" class="font-bold">Pricing &amp; Inventory</h3>
          <div class="grid grid-cols-2 gap-3">
            <label>
              <span>Retail Price ($)</span>
              <input v-model.number="price" required type="number" min="0.01" max="999999.99" step="0.01" inputmode="decimal">
            </label>
            <label>
              <span>{{ type === 'product' ? 'Item Cost' : 'Service Cost' }} ($)</span>
              <input v-model.number="cost" required type="number" min="0" max="999999.99" step="0.01" inputmode="decimal">
            </label>
          </div>
          <div class="flex items-center justify-between gap-2 rounded-lg bg-[#f1f3ff] p-3 text-sm">
            <span class="text-[#6b7280]">Margin / Profit</span>
            <span class="font-semibold">{{ margin }}</span>
          </div>
          <label>
            <span>{{ type === 'product' ? 'Stock Quantity' : 'Available Slots' }}</span>
            <input ref="stockInput" v-model.number="stock" required type="number" min="0" max="1000000" step="1" inputmode="numeric">
          </label>
        </section>

        <section class="space-y-3" aria-labelledby="listing-media">
          <h3 id="listing-media" class="font-bold">Media</h3>
          <label
            class="image-picker grid cursor-pointer place-items-center gap-1 rounded-xl border border-dashed border-[#cdd3e7] p-4 text-center hover:bg-[#f1f3ff] focus-within:ring-2 focus-within:ring-[#006398]"
            @dragover.prevent
            @drop.prevent="chooseImage($event.dataTransfer?.files[0])"
          >
            <input
              ref="imageInput"
              type="file"
              class="sr-only"
              accept="image/jpeg,image/png,image/webp"
              aria-label="Listing image"
              @change="chooseImage(($event.target as HTMLInputElement).files?.[0])"
            >
            <img v-if="preview || (existingImage && !removeImage)" :src="preview || existingImage || undefined" alt="Listing image preview" class="mb-1 size-20 rounded-lg object-cover">
            <svg v-else aria-hidden="true" class="mb-1 size-6 text-[#6b7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 16V4m-5 5 5-5 5 5M4 15v5h16v-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="font-semibold text-[#9d4300]">{{ preview || (existingImage && !removeImage) ? 'Replace image' : 'Click to upload or drag and drop' }}</span>
            <span class="text-xs text-[#6b7280]">JPEG, PNG or WebP · up to 5 MB</span>
          </label>
          <button
            v-if="preview || (existingImage && !removeImage) || imageError"
            type="button"
            class="text-sm font-semibold text-[#ba1a1a] hover:underline"
            @click="preview || imageError ? clearSelection() : removeImage = true"
          >
            {{ preview || imageError ? 'Clear selection' : 'Remove image' }}
          </button>
          <button v-if="removeImage && !imageError" type="button" class="text-sm font-semibold text-[#006398] hover:underline" @click="removeImage = false">Keep image</button>
          <p v-if="imageError" role="alert" class="text-sm text-[#ba1a1a]">{{ imageError }}</p>
        </section>
      </fieldset>

      <footer class="space-y-2 border-t border-[#edf0ff] bg-white px-5 py-4 sm:px-6">
        <p v-if="error" role="alert" class="text-sm text-[#ba1a1a]">{{ error }}</p>
        <div class="flex justify-end gap-3">
          <button type="button" :disabled="saving" class="rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-[#f1f3ff]" @click="emit('close')">Cancel</button>
          <button type="submit" :disabled="saving" class="rounded-lg bg-[#fdba74] px-6 py-2.5 text-sm font-semibold text-[#582200] hover:bg-[#ffab58] disabled:opacity-60">
            {{ saving ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.product-drawer::backdrop { background: rgb(20 27 43 / 35%); }

.product-drawer label:not(.image-picker) {
  @apply grid gap-1 text-[13px] font-medium;
}

.product-drawer :is(input:not([type=file]), select, textarea) {
  @apply w-full min-w-0 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006398];
}

.product-drawer textarea { @apply resize-y; }
</style>
