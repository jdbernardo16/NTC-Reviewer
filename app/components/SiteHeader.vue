<script setup lang="ts">
import { Menu, X, ArrowRight } from '@lucide/vue'

const route = useRoute()
const open = ref(false)
const { session: activeExam } = useActiveExam()

const links = [
  { label: 'Reviewer', to: '/reviewer' },
  { label: 'Mock exam', to: '/exam' },
  { label: 'Sources', to: '/sources' },
]

const activeExamLabel = computed(() => {
  if (!activeExam.value) return ''
  const element = activeExam.value.elements[activeExam.value.current]?.element
  return element ? `E${element}` : 'Live'
})

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

watch(
  () => route.path,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-ink-950/95 backdrop-blur-md">
    <div class="container-page flex h-16 items-center justify-between gap-4 md:h-20">
      <NuxtLink to="/" class="group flex items-center gap-3" aria-label="NTC Reviewer home">
        <BrandMark size-class="h-10 w-10 md:h-11 md:w-11" />
        <span class="flex flex-col leading-none">
          <span class="font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-signal-500">
            NTC Reviewer
          </span>
          <span class="mt-1.5 hidden text-sm font-medium text-paper-100/70 sm:block">
            Philippine amateur radio
          </span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
          :class="isActive(link.to) ? 'text-white' : 'text-paper-100/60 hover:text-white'"
        >
          {{ link.label }}
          <span
            v-if="isActive(link.to)"
            class="mx-auto mt-1.5 block h-px w-4 bg-signal-500"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink
          :to="activeExam ? '/exam/take' : '/exam'"
          class="hidden items-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600 sm:inline-flex"
        >
          {{ activeExam ? 'Resume exam' : 'Start mock exam' }}
          <span
            v-if="activeExam"
            class="rounded bg-ink-950/20 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em]"
          >
            {{ activeExamLabel }}
          </span>
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>

        <button
          type="button"
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-paper-100 md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <X v-if="open" class="h-5 w-5" aria-hidden="true" />
          <Menu v-else class="h-5 w-5" aria-hidden="true" />
          <span
            v-if="activeExam"
            class="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <div v-if="open" id="mobile-nav" class="border-t border-white/10 bg-ink-950 md:hidden">
      <nav class="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-3 text-base font-medium"
          :class="isActive(link.to) ? 'bg-white/5 text-white' : 'text-paper-100/70'"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          :to="activeExam ? '/exam/take' : '/exam'"
          class="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-4 py-3 text-base font-semibold text-white"
        >
          {{ activeExam ? 'Resume exam' : 'Start mock exam' }}
          <span
            v-if="activeExam"
            class="rounded bg-ink-950/20 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em]"
          >
            {{ activeExamLabel }}
          </span>
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
