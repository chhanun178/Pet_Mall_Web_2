<template>
  <footer class="bg-petdark text-stone-300 pt-14 pb-8">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
        <!-- Col 1: Brand Info (Spans 2 cols) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <ellipse cx="8.5" cy="5" rx="2" ry="3"/>
                <ellipse cx="15.5" cy="5" rx="2" ry="3"/>
                <ellipse cx="4.5" cy="10" rx="2" ry="3"/>
                <ellipse cx="19.5" cy="10" rx="2" ry="3"/>
                <path d="M12 10.5c-3.3 0-6 2.3-6 5.5 0 2.2 1.8 4 4 4 1.2 0 1.5-.7 2-.7s.8.7 2 .7c2.2 0 4-1.8 4-4 0-3.2-2.7-5.5-6-5.5z"/>
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-white">Pet<span class="text-brand-500">Mall</span></span>
          </div>
          <p class="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
            The warm, community-first marketplace connecting loving pet parents with mindful independent makers, holistic spa therapists, and certified caretakers.
          </p>
        </div>

        <!-- Col 2: Shop & Explore -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Shop & Explore</h3>
          <ul class="space-y-2 text-xs text-stone-400 font-medium">
            <li><a href="#" class="hover:text-brand-400 transition-colors">Puppy Collection</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Cat Essentials</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Organic Treats</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Holistic Remedies</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <!-- Col 3: Services -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Services</h3>
          <ul class="space-y-2 text-xs text-stone-400 font-medium">
            <li><a href="#" class="hover:text-brand-400 transition-colors">Canine Coat Spas</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Quiet-Zone Cat Cuts</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Holistic Acupressure</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Nutritional Guidance</a></li>
            <li><a href="#" class="hover:text-brand-400 transition-colors">Behavior Coaching</a></li>
          </ul>
        </div>

        <!-- Col 4: Perks & Newsletter -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-200 mb-2">Pet Parent Perks</h3>
          <p class="text-xs text-stone-400 leading-relaxed mb-3">
            Get curated seasonal care tips, wellness recipes, and exclusive artisan discounts.
          </p>
          <form @submit.prevent class="space-y-2">
            <input
              type="email"
              placeholder="Enter your email address"
              class="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Join Pet Mall Family</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          © 2025 Pet Mall Commerce Inc. All rights reserved. Crafted with care for animals and their people.
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-stone-300 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Merchant Portal</a>
        </div>
      </div>
    </div>
  </footer>
</template>
