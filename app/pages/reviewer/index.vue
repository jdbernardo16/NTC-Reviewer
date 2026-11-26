<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Check, Info, ShieldCheck } from '@lucide/vue'
import { ELEMENTS, EXAM_RULES } from '~/data/elements'
import { bankCounts, bankTotal } from '~/data/questions'

useSeoMeta({
  title: 'Reviewer · Elements 2, 3, 4',
  description:
    'Structured study notes for the Philippine NTC amateur radio exam: rules and regulations, electronics fundamentals, and amateur radio practice. Free, no sign-in.',
})

const comparison = [
  { label: 'Examination', d: 'Element 2 only', c: 'Elements 2, 3, and 4' },
  { label: 'Call-sign prefix', d: 'DY', c: 'DW' },
  { label: 'Bands', d: '2 m (144–146 MHz) only', c: 'Selected HF + VHF/UHF' },
  { label: 'Power', d: '50 W fixed VHF; 10 W mobile/portable', c: '100 W CW / 200 W PEP on HF; 100 W VHF' },
  { label: 'Minimum age', d: '9 with parental consent', c: '12' },
  { label: 'Typical use', d: 'Local 2 m voice, clubs, emergencies', c: 'HF and local VHF/UHF' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-paper-300 bg-ink-950 text-paper-50">
      <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div class="container-page relative py-16 md:py-20">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-500">The reviewer</p>
        <div class="mt-4 grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h1 class="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Everything the paper expects you to know.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-paper-100/60">
              Three structured element guides, written for the Philippine NTC exam. Start with the
              rules, add the fundamentals, then learn the station. Each page ends with a quick
              self-check so you can test recall before the full mock.
            </p>
          </div>
          <dl class="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 lg:border-0 lg:pt-0">
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-paper-100/40">Elements</dt>
              <dd class="mt-1 text-2xl font-semibold text-white">3</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-paper-100/40">Questions</dt>
              <dd class="mt-1 text-2xl font-semibold text-white">{{ bankTotal }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-paper-100/40">Tracks</dt>
              <dd class="mt-1 text-2xl font-semibold text-white">2</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <div class="container-page py-12 md:py-16">
      <div class="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div>
          <!-- Coverage notice -->
          <div class="rounded-2xl border border-signal-500/30 bg-signal-100 p-5 md:p-6">
            <div class="flex items-start gap-3">
              <Info class="mt-0.5 h-5 w-5 shrink-0 text-signal-600" aria-hidden="true" />
              <div>
                <h2 class="text-base font-semibold text-ink-950">Class D is Element 2 only</h2>
                <p class="mt-1.5 text-sm leading-7 text-ink-700">
                  The current NTC Form 1-01 lists Class D as Element 2 and Class C as Elements 2, 3,
                  and 4. The older 1987 circular listed all three elements for Class D — that is why
                  some old reviewers still say otherwise. For Class C, study all three; if you fail
                  Elements 3 and 4 but pass Element 2, you may still be eligible for Class D.
                </p>
              </div>
            </div>
          </div>

          <!-- Element cards -->
          <div class="mt-8 space-y-5">
            <article
              v-for="element in ELEMENTS"
              :key="element.id"
              class="group relative overflow-hidden rounded-2xl border border-paper-300 bg-white/50 p-6 transition-colors hover:border-ink-500 md:p-8"
            >
              <div class="absolute inset-y-0 left-0 w-1" :class="element.dotClass" aria-hidden="true" />
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="max-w-2xl">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-[0.65rem] uppercase tracking-[0.18em]" :class="element.textClass">
                      {{ element.code }} · {{ element.kicker }}
                    </span>
                    <span class="rounded-full bg-paper-200 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink-600">
                      {{ bankCounts[element.id] }} questions
                    </span>
                  </div>
                  <h2 class="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink-950 md:text-3xl">
                    {{ element.name }}
                  </h2>
                  <p class="mt-3 text-sm leading-7 text-ink-600">{{ element.description }}</p>
                </div>
                <div class="flex flex-col items-start gap-2">
                  <span
                    v-for="track in element.requiredFor"
                    :key="track"
                    class="rounded-full px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em]"
                    :class="track === 'D' ? 'bg-signal-100 text-signal-600' : 'bg-ink-950 text-paper-50'"
                  >
                    Class {{ track }}
                  </span>
                </div>
              </div>

              <div class="mt-6 grid gap-2 sm:grid-cols-2">
                <div v-for="topic in element.topics" :key="topic" class="flex items-start gap-2 text-sm leading-6 text-ink-600">
                  <Check class="mt-1 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />
                  {{ topic }}
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-4 border-t border-paper-200 pt-5">
                <NuxtLink
                  :to="`/reviewer/${element.slug}`"
                  class="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
                >
                  Study {{ element.code }}
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                <span class="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-500">
                  {{ EXAM_RULES.itemsPerElement }} items · {{ EXAM_RULES.minutesPerElement }} min in the mock
                </span>
              </div>
            </article>
          </div>

          <!-- Comparison -->
          <section class="mt-14" aria-labelledby="compare-heading">
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Class D vs Class C</p>
                <h2 id="compare-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                  What changes when you go for Class C.
                </h2>
              </div>
              <NuxtLink to="/sources" class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700">
                Sources
                <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
              </NuxtLink>
            </div>

            <div class="mt-6 overflow-hidden rounded-2xl border border-paper-300">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr class="bg-ink-950 text-paper-50">
                      <th class="px-4 py-3 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-paper-100/50">
                        &nbsp;
                      </th>
                      <th class="px-4 py-3 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-signal-500">
                        Class D · Foundation
                      </th>
                      <th class="px-4 py-3 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-paper-100/70">
                        Class C · Technician
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in comparison" :key="row.label" class="border-b border-paper-200 last:border-0 even:bg-paper-50">
                      <th class="whitespace-nowrap px-4 py-3 text-xs font-semibold text-ink-900">{{ row.label }}</th>
                      <td class="px-4 py-3 leading-6 text-ink-600">{{ row.d }}</td>
                      <td class="px-4 py-3 leading-6 text-ink-600">{{ row.c }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p class="mt-3 text-xs leading-5 text-ink-500">
              Class C band access is set in the annexes of MC 02-06-2019. Check the current NTC band
              plan before operating; this table is a study summary, not an operating authority.
            </p>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div class="rounded-2xl border border-paper-300 bg-white/60 p-5">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">Suggested order</p>
            <ol class="mt-4 space-y-4">
              <li v-for="(step, index) in [
                { title: 'Element 2 first', text: 'It is the only element Class D needs, and it carries the most rule-based recall.' },
                { title: 'Add Element 3', text: 'Learn the formulas and unit conversions before the mock pressure kicks in.' },
                { title: 'Finish with Element 4', text: 'The station material is easier once the fundamentals are in place.' },
                { title: 'Take the mock', text: 'Use the result to find weak topics, then return to the relevant section.' },
              ]" :key="step.title" class="flex gap-3">
                <span class="font-mono text-[0.6rem] text-signal-600">0{{ index + 1 }}</span>
                <div>
                  <p class="text-sm font-semibold text-ink-900">{{ step.title }}</p>
                  <p class="mt-1 text-xs leading-5 text-ink-600">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>

          <div class="rounded-2xl bg-ink-950 p-5 text-paper-50">
            <ShieldCheck class="h-5 w-5 text-signal-500" aria-hidden="true" />
            <p class="mt-3 text-sm font-semibold text-white">The passing rule</p>
            <p class="mt-1.5 text-xs leading-6 text-paper-100/55">
              A {{ EXAM_RULES.passAverage }}% average across the elements, with no element below
              {{ EXAM_RULES.elementFloor }}%. For Class C, passing Element 2 alone can still make you
              eligible for Class D.
            </p>
            <NuxtLink to="/exam" class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-signal-500">
              Test it under time
              <ArrowRight class="h-3.5 w-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>

          <div class="rounded-2xl border border-paper-300 bg-paper-100 p-5">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">Question bank</p>
            <div class="mt-3 space-y-2.5">
              <div v-for="element in ELEMENTS" :key="element.id" class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-ink-700">
                  <span class="h-2 w-2 rounded-full" :class="element.dotClass" aria-hidden="true" />
                  Element {{ element.id }}
                </span>
                <span class="font-mono text-xs text-ink-900">{{ bankCounts[element.id] }}</span>
              </div>
            </div>
            <p class="mt-4 border-t border-paper-300 pt-3 text-xs leading-5 text-ink-500">
              Each mock draws {{ EXAM_RULES.itemsPerElement }} per element, so retakes use a different set.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
