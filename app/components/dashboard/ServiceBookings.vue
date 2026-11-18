<template>
  <div class="bg-white rounded-2xl border border-warm-200/90 p-5 sm:p-6 shadow-card">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4m-5 4h18"/>
          </svg>
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-stone-900 leading-tight">Holistic Service Appointments</h2>
          <p class="text-xs text-stone-500">In-person consultations and spa rituals for today</p>
        </div>
      </div>

      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100/70 text-amber-800 self-start sm:self-auto">
        6 Bookings Today
      </span>
    </div>

    <!-- Appointment Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Appointment 1 -->
      <div class="bg-warm-50/50 rounded-xl border border-warm-200/80 p-4 flex flex-col justify-between hover:border-brand-200 hover:bg-white transition-all">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-blue-700 tracking-wide">
              TODAY • 02:30 PM
            </span>
            <span class="px-2 py-0.5 rounded-md bg-stone-200/60 text-stone-600 text-[11px] font-semibold">
              45 Min
            </span>
          </div>

          <h3 class="text-sm font-bold text-stone-900 mb-1">
            Aromatherapy Paw & Coat Soak
          </h3>

          <div class="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-2.5">
            <span>🐾</span>
            <span>Bella • Golden Retriever (3 yrs)</span>
          </div>

          <p class="text-xs text-stone-500 bg-white/80 border border-warm-200/60 rounded-lg p-2.5 leading-relaxed">
            Sensitive skin protocol. Owner requested allergen-free lavender & colloidal oat emulsion.
          </p>
        </div>

        <div class="flex items-center justify-between pt-4 mt-4 border-t border-warm-200/70">
          <span class="text-base font-extrabold text-stone-900">$65.00</span>
          <button class="px-3 py-1.5 rounded-lg border border-warm-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors">
            Prepare Station
          </button>
        </div>
      </div>

      <!-- Appointment 2 -->
      <div class="bg-warm-50/50 rounded-xl border border-warm-200/80 p-4 flex flex-col justify-between hover:border-brand-200 hover:bg-white transition-all">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-blue-700 tracking-wide">
              TODAY • 04:15 PM
            </span>
            <span class="px-2 py-0.5 rounded-md bg-stone-200/60 text-stone-600 text-[11px] font-semibold">
              60 Min
            </span>
          </div>

          <h3 class="text-sm font-bold text-stone-900 mb-1">
            Herbal Wellness & Diet Ritual
          </h3>

          <div class="flex items-center gap-1.5 text-xs font-semibold text-blue-800 mb-2.5">
            <span>🐾</span>
            <span>Milo • French Bulldog (5 yrs)</span>
          </div>

          <p class="text-xs text-stone-500 bg-white/80 border border-warm-200/60 rounded-lg p-2.5 leading-relaxed">
            Digestive balance consultation. Tincture sampling and customized gut wellness meal routine.
          </p>
        </div>

        <div class="flex items-center justify-between pt-4 mt-4 border-t border-warm-200/70">
          <span class="text-base font-extrabold text-stone-900">$85.00</span>
          <button class="px-3 py-1.5 rounded-lg border border-warm-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors">
            View Pet Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
