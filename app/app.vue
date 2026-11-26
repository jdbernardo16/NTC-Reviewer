<template>
  <div class="flex min-h-screen flex-col">
    <NuxtLoadingIndicator color="#e8611c" :height="2" />
    <NuxtRouteAnnouncer />
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main-content" class="flex-1">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
