<template>
  <div class="min-h-screen flex flex-col bg-warm-50 text-stone-800 font-sans selection:bg-brand-500 selection:text-white">
    <!-- Top Global Header -->
    <LayoutAppHeader />

    <!-- Main App Body with Sidebar & Content -->
    <div class="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
      <!-- Left Navigation Sidebar -->
      <LayoutDashboardSidebar />

      <!-- Main Page Content -->
      <main class="flex-1 min-w-0">
        <slot />
      </main>
    </div>

    <!-- Trust Features Banner -->
    <LayoutTrustBadges />

    <!-- Dark Footer -->
    <LayoutAppFooter />
  </div>
</template>
