<script setup lang="ts">
import { ArrowLeft, Home } from '@lucide/vue'

useHead({
  title: 'Page not found',
})

defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
  }
}>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper-50">
    <header class="border-b border-white/10 bg-ink-950">
      <div class="container-page flex h-16 items-center justify-between md:h-20">
        <NuxtLink to="/" class="flex items-center gap-3" aria-label="NTC Reviewer home">
          <BrandMark size-class="h-10 w-10" />
          <span class="font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-signal-500">
            NTC Reviewer
          </span>
        </NuxtLink>
      </div>
    </header>

    <main class="container-page flex flex-1 items-center py-20">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-600">
          {{ error.statusCode || 404 }} · Off frequency
        </p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-ink-950 md:text-5xl">
          Nothing on this frequency.
        </h1>
        <p class="mx-auto mt-4 max-w-md text-sm leading-7 text-ink-600">
          The page you were looking for is not here. It may have moved, or the link may be wrong.
          Head back to the reviewer or start a mock exam.
        </p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
            @click="goHome"
          >
            <Home class="h-4 w-4" aria-hidden="true" />
            Back to home
          </button>
          <NuxtLink
            to="/reviewer"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-paper-300 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-500"
          >
            <ArrowLeft class="h-4 w-4" aria-hidden="true" />
            Open the reviewer
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
