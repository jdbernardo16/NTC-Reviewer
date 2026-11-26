<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

const year = new Date().getFullYear()

const study = [
  { label: 'Reviewer hub', to: '/reviewer' },
  { label: 'Element 2 · Rules', to: '/reviewer/element-2' },
  { label: 'Element 3 · Fundamentals', to: '/reviewer/element-3' },
  { label: 'Element 4 · Practice', to: '/reviewer/element-4' },
]

const exam = [
  { label: 'Start a mock exam', to: '/exam' },
  { label: 'View last result', to: '/exam/result' },
  { label: 'Sources & disclaimer', to: '/sources' },
]

const official = [
  { label: 'National Telecommunications Commission', href: 'https://ntc.gov.ph' },
  { label: 'Philippine Amateur Radio Association', href: 'https://para.org.ph' },
  { label: 'DX3H NTC exam resources', href: 'https://www.dx3h.org/ntcexamresources-1' },
  { label: 'NTC Form 1-01 (PDF)', href: 'https://region7.ntc.gov.ph/wp-content/uploads/2024/01/Form_No._NTC_1-01_APPLICATION_FOR_RADIO_OPERATOR_EXAMINATION.pdf' },
]
</script>

<template>
  <footer class="grid-paper-dark border-t border-white/10 bg-ink-950 text-paper-100">
    <div class="container-page py-14 md:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-3" aria-label="NTC Reviewer home">
            <BrandMark size-class="h-10 w-10" />
            <span class="font-mono text-xs font-medium uppercase tracking-[0.22em] text-signal-500">
              NTC Reviewer
            </span>
          </NuxtLink>
          <p class="mt-5 max-w-sm text-sm leading-6 text-paper-100/55">
            A free study companion for the Philippine amateur radio licensure exam. Built for
            Class D and Class C candidates, with no account and no paywall.
          </p>
          <p class="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-100/35">
            Your answers stay in your browser
          </p>
        </div>

        <div>
          <h2 class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-100/40">Study</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in study" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-paper-100/70 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-100/40">Exam</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in exam" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-paper-100/70 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-100/40">
            Official resources
          </h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in official" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-start gap-1.5 text-sm leading-5 text-paper-100/70 transition-colors hover:text-white"
              >
                {{ link.label }}
                <ArrowUpRight class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-paper-100/40 md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} NTC Reviewer. Independent study tool.</p>
        <p class="max-w-2xl md:text-right">
          Not affiliated with or endorsed by the NTC. Mock results are practice estimates, not
          official ratings. Always verify requirements with the NTC.
        </p>
      </div>
    </div>
  </footer>
</template>
