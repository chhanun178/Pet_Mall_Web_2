<template>
  <div
    class="bg-white rounded-2xl border border-warm-200/90 shadow-card hover:shadow-card-hover transition-all p-4 sm:p-5 relative group"
  >
    <!-- TOP ROW: Icon, Metadata, Payout, Actions -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <!-- Left side: Category Icon + Main Order Header -->
      <div class="flex items-start sm:items-center gap-3.5 min-w-0">
        <!-- Fulfillment / Status Category Icon -->
        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
          :class="categoryIconStyle.container"
        >
          <!-- Package Icon for Delivery / Packing -->
          <svg
            v-if="order.fulfillmentType === 'delivery' && order.status === 'Needs Packing'"
            class="w-5 h-5 sm:w-6 sm:h-6"
            :class="categoryIconStyle.icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>

          <!-- Storefront Icon for Store Pickup -->
          <svg
            v-else-if="order.fulfillmentType === 'pickup'"
            class="w-5 h-5 sm:w-6 sm:h-6"
            :class="categoryIconStyle.icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>

          <!-- Wellness / Flower / Lotus Icon for Services -->
          <svg
            v-else-if="order.fulfillmentType === 'service'"
            class="w-5 h-5 sm:w-6 sm:h-6"
            :class="categoryIconStyle.icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>

          <!-- Delivery Truck for Shipped -->
          <svg
            v-else-if="order.status === 'Shipped'"
            class="w-5 h-5 sm:w-6 sm:h-6"
            :class="categoryIconStyle.icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h2" />
          </svg>

          <!-- Checkmark for Completed -->
          <svg
            v-else-if="order.status === 'Completed'"
            class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>

          <!-- Default Package -->
          <svg
            v-else
            class="w-5 h-5 sm:w-6 sm:h-6 text-stone-500"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <!-- Order ID, Status, Customer & Pet Info -->
        <div class="min-w-0">
          <!-- Row 1: ID, Status Badge, Time -->
          <div class="flex items-center gap-2 flex-wrap">
            <button
              @click="openOrderDetails(order)"
              class="text-base sm:text-lg font-bold text-stone-900 hover:text-brand-600 transition-colors cursor-pointer text-left tracking-tight"
            >
              {{ order.displayId }}
            </button>

            <!-- Status Badge -->
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border"
              :class="statusBadgeStyle"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="statusDotStyle"></span>
              {{ order.status }}
            </span>

            <!-- Booking Time Badge (if service) -->
            <span
              v-if="order.service?.scheduledTime"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#FFF4E5] text-[#B45309] border border-[#FDE68A]"
            >
              <svg class="w-3.5 h-3.5 text-[#B45309]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ order.badgeText || order.service.scheduledTime }}
            </span>

            <!-- Relative / Placed time -->
            <span v-if="order.placedAgo" class="text-xs text-stone-600 font-medium hidden sm:inline">
              {{ order.placedAgo }}
            </span>
          </div>

          <!-- Row 2: Customer Name • Pet Breed • Fulfillment Info -->
          <div class="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 mt-1 flex-wrap">
            <span class="font-bold text-stone-900">{{ order.customer.name }}</span>
            <span class="text-stone-300">•</span>

            <!-- Pet Name & Breed Badge -->
            <span class="inline-flex items-center gap-1 font-semibold text-[#B45309] bg-[#FFF7ED] px-2 py-0.5 rounded-md border border-[#FED7AA]">
              <svg class="w-3.5 h-3.5 fill-current text-[#D97706]" viewBox="0 0 24 24">
                <ellipse cx="8.5" cy="5" rx="2" ry="3" />
                <ellipse cx="15.5" cy="5" rx="2" ry="3" />
                <ellipse cx="4.5" cy="10" rx="2" ry="3" />
                <ellipse cx="19.5" cy="10" rx="2" ry="3" />
                <path d="M12 10.5c-3.3 0-6 2.3-6 5.5 0 2.2 1.8 4 4 4 1.2 0 1.5-.7 2-.7s.8.7 2 .7c2.2 0 4-1.8 4-4 0-3.2-2.7-5.5-6-5.5z" />
              </svg>
              <span>{{ order.customer.petName }} ({{ order.customer.petBreed }})</span>
            </span>

            <span class="text-stone-300">•</span>

            <!-- Fulfillment Title / Location info -->
            <span class="text-stone-500 font-medium truncate max-w-[280px]">
              {{ order.customer.deliveryAddress || fulfillmentSubtitle }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right side: Financials & Action Buttons -->
      <div class="flex items-center justify-between sm:justify-end gap-4 lg:gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-warm-100">
        <!-- Payout / Service Fee / Total Paid -->
        <div class="text-left sm:text-right">
          <p class="text-[10px] font-bold uppercase tracking-wider text-stone-600">
            {{ pricingLabel }}
          </p>
          <p class="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight leading-tight">
            ${{ order.pricing.payoutValue.toFixed(2) }}
          </p>
          <p
            class="text-xs font-semibold mt-0.5"
            :class="paymentNoteClass"
          >
            {{ order.pricing.paymentNote || 'Paid in full' }}
          </p>
        </div>

        <!-- Action Buttons Group -->
        <div class="flex items-center gap-2">
          <!-- PRIMARY BUTTON: Dynamic per status -->
          <!-- 1. Needs Packing: Fulfill & Print Label -->
          <button
            v-if="order.status === 'Needs Packing'"
            @click="openFulfillModal(order)"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#FB923C] hover:bg-[#F97316] text-stone-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
            title="Generate shipping label and fulfill package"
          >
            <svg class="w-4 h-4 text-stone-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Fulfill & Print Label</span>
          </button>

          <!-- 2. Ready for Pickup: Mark Picked Up -->
          <button
            v-else-if="order.status === 'Ready for Pickup'"
            @click="openPickupModal(order)"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
            title="Confirm handoff to pet owner"
          >
            <svg class="w-4 h-4 text-[#1D4ED8]" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Mark Picked Up</span>
          </button>

          <!-- 3. Confirmed Booking: View Booking Details -->
          <button
            v-else-if="order.status === 'Confirmed Booking'"
            @click="openBookingModal(order)"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#0F568C] hover:bg-[#0c446f] text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
            title="Inspect health intake form & room allocation"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Booking Details</span>
          </button>

          <!-- 4. Shipped: View Tracking -->
          <button
            v-else-if="order.status === 'Shipped'"
            @click="openTrackingModal(order)"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-warm-200/90 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
            title="Live GPS & Carrier Scan Status"
          >
            <svg class="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>View Tracking</span>
          </button>

          <!-- 5. Default/Completed/Cancelled: Order Details -->
          <button
            v-else
            @click="openOrderDetails(order)"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-warm-200/90 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <span>View Details</span>
          </button>

          <!-- SECONDARY BUTTON: Per Card Type -->
          <!-- For Needs Packing: 3 dots dropdown menu -->
          <div v-if="order.status === 'Needs Packing'" class="relative">
            <button
              @click="toggleMenu"
              class="p-2 sm:p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors shadow-xs"
              title="More options"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isMenuOpen"
              class="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-warm-200 shadow-xl py-1 z-30 text-xs font-semibold text-stone-700"
            >
              <button
                @click="handleMenuAction('details')"
                class="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2"
              >
                <span>Full Order Details</span>
              </button>
              <button
                @click="handleMenuAction('slip')"
                class="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2"
              >
                <span>Print Packing Slip</span>
              </button>
              <button
                @click="handleMenuAction('contact')"
                class="w-full text-left px-3.5 py-2 hover:bg-stone-50 flex items-center gap-2"
              >
                <span>Message Customer</span>
              </button>
              <div class="border-t border-warm-100 my-1"></div>
              <button
                @click="handleMenuAction('cancel')"
                class="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
              >
                <span>Cancel & Refund</span>
              </button>
            </div>
          </div>

          <!-- For Store Pickup: Message SMS icon -->
          <button
            v-else-if="order.fulfillmentType === 'pickup'"
            @click="openContactModal(order)"
            class="p-2 sm:p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors shadow-xs"
            title="Send SMS reminder to customer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <!-- For Service Booking: Calendar / Reschedule Icon -->
          <button
            v-else-if="order.fulfillmentType === 'service'"
            @click="openBookingModal(order)"
            class="p-2 sm:p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors shadow-xs"
            title="Reschedule or update booking room"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- For Shipped: Packing slip / receipt icon -->
          <button
            v-else-if="order.status === 'Shipped'"
            @click="openPackingSlipModal(order)"
            class="p-2 sm:p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors shadow-xs"
            title="View shipping slip & receipt"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>

          <!-- General 3 dots -->
          <button
            v-else
            @click="openOrderDetails(order)"
            class="p-2 sm:p-2.5 rounded-xl border border-warm-200/90 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors shadow-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- BOTTOM ROW: Product Line Items & Location / Status Context -->
    <div class="mt-4 pt-3.5 border-t border-warm-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <!-- Items preview container -->
      <div class="flex items-center gap-4 sm:gap-6 flex-wrap min-w-0">
        <!-- Loop over physical product items -->
        <template v-if="order.fulfillmentType !== 'service'">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center gap-2.5 min-w-0"
          >
            <!-- Product Thumbnail -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-warm-100 border border-warm-200 overflow-hidden shrink-0 shadow-2xs">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-stone-400 bg-warm-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            <!-- Item Name & SKU/Shelf Location -->
            <div class="min-w-0">
              <p class="font-bold text-stone-900 text-xs sm:text-sm truncate max-w-[240px] sm:max-w-[320px]">
                {{ item.name }}
                <span class="text-brand-600 font-extrabold ml-1">x {{ item.quantity }}</span>
              </p>
              <p class="text-[11px] sm:text-xs text-stone-500 font-medium truncate mt-0.5">
                <span v-if="item.sku">SKU: {{ item.sku }}</span>
                <span v-if="item.shelfLocation" class="ml-1 text-stone-400">• Shelf Location: {{ item.shelfLocation }}</span>
                <span v-if="item.statusTag" class="ml-1 text-stone-400">• {{ item.statusTag }}</span>
                <span v-if="item.weightLbs" class="ml-1 text-stone-400">• Package Weight: {{ item.weightLbs }} lbs</span>
              </p>
            </div>
          </div>
        </template>

        <!-- Service Item Details (Acupressure / Spa) -->
        <template v-else>
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="font-bold text-stone-900 text-xs sm:text-sm truncate max-w-[260px] sm:max-w-[360px]">
                {{ order.service?.title }}
                <span class="text-brand-600 font-extrabold ml-1">x 1</span>
              </p>
              <p class="text-[11px] sm:text-xs text-stone-500 font-medium truncate mt-0.5">
                Practitioner: {{ order.service?.practitioner }} • {{ order.service?.room }}
              </p>
            </div>
          </div>
        </template>
      </div>

      <!-- Right-aligned context notes & badges -->
      <div class="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
        <!-- 1. Destination for Shipping -->
        <span
          v-if="order.fulfillmentType === 'delivery' && order.status === 'Needs Packing'"
          class="text-xs text-stone-500 font-medium"
        >
          {{ order.customer.deliveryAddress || 'Shipping to: Portland, OR 97201' }}
        </span>

        <!-- 2. Pickup Cubby Badge -->
        <div
          v-else-if="order.fulfillmentType === 'pickup'"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309]"
        >
          <svg class="w-3.5 h-3.5 text-[#D97706]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ order.customer.pickupCubby || 'Front Desk Pickup Cubby #04' }}</span>
        </div>

        <!-- 3. Service Intake and Special Alert Badges -->
        <template v-else-if="order.fulfillmentType === 'service'">
          <span class="text-xs text-stone-500 font-medium">
            Intake Form: <span class="font-bold text-stone-700">{{ order.service?.intakeStatus || 'Complete' }}</span>
          </span>
          <span
            v-if="order.service?.specialAlert"
            class="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]"
          >
            {{ order.service.specialAlert }}
          </span>
        </template>

        <!-- 4. Carrier Scan Status for Shipped -->
        <div
          v-else-if="order.status === 'Shipped'"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600"
        >
          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ order.carrierScanStatus || 'Carrier Scanned: Portland Hub' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Order } from '~/types/orders'
import { useOrders } from '~/composables/useOrders'

const props = defineProps<{
  order: Order
}>()

const {
  openFulfillModal,
  openPickupModal,
  openBookingModal,
  openTrackingModal,
  openPackingSlipModal,
  openOrderDetails,
  openContactModal,
} = useOrders()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleMenuAction = (action: 'details' | 'slip' | 'contact' | 'cancel') => {
  isMenuOpen.value = false
  if (action === 'details') openOrderDetails(props.order)
  if (action === 'slip') openPackingSlipModal(props.order)
  if (action === 'contact') openContactModal(props.order)
  if (action === 'cancel') openOrderDetails(props.order)
}

// Icon Style
const categoryIconStyle = computed(() => {
  if (props.order.fulfillmentType === 'pickup') {
    return { container: 'bg-[#DBEAFE] text-[#1D4ED8]', icon: 'text-[#1D4ED8]' }
  }
  if (props.order.fulfillmentType === 'service') {
    return { container: 'bg-[#E0F2FE] text-[#0369A1]', icon: 'text-[#0369A1]' }
  }
  if (props.order.status === 'Shipped') {
    return { container: 'bg-[#F1F5F9] text-[#334155]', icon: 'text-[#334155]' }
  }
  return { container: 'bg-[#FEF3C7] text-[#D97706]', icon: 'text-[#D97706]' }
})

// Status Badge Style
const statusBadgeStyle = computed(() => {
  switch (props.order.status) {
    case 'Needs Packing':
      return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
    case 'Ready for Pickup':
      return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]'
    case 'Confirmed Booking':
      return 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]'
    case 'Shipped':
      return 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]'
    case 'Completed':
      return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
    case 'Cancelled':
      return 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]'
    default:
      return 'bg-stone-100 text-stone-700 border-stone-200'
  }
})

const statusDotStyle = computed(() => {
  switch (props.order.status) {
    case 'Needs Packing':
      return 'bg-[#D97706]'
    case 'Ready for Pickup':
      return 'bg-[#2563EB]'
    case 'Confirmed Booking':
      return 'bg-[#0284C7]'
    case 'Shipped':
      return 'bg-[#64748B]'
    case 'Completed':
      return 'bg-[#16A34A]'
    case 'Cancelled':
      return 'bg-[#DC2626]'
    default:
      return 'bg-stone-400'
  }
})

const pricingLabel = computed(() => {
  if (props.order.fulfillmentType === 'service') return 'SERVICE FEE'
  if (props.order.status === 'Shipped' || props.order.status === 'Completed') return 'TOTAL PAID'
  return 'PAYOUT VALUE'
})

const paymentNoteClass = computed(() => {
  if (props.order.status === 'Shipped') return 'text-stone-500'
  if (props.order.status === 'Cancelled') return 'text-rose-600'
  return 'text-emerald-600'
})

const fulfillmentSubtitle = computed(() => {
  if (props.order.fulfillmentType === 'delivery') return 'Standard Courier Delivery'
  if (props.order.fulfillmentType === 'pickup') return 'Store Counter Pickup'
  if (props.order.fulfillmentType === 'service') return 'In-Atelier Wellness Suite'
  return ''
})
</script>
