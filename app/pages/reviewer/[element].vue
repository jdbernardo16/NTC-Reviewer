<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, ListChecks } from '@lucide/vue'
import { ELEMENTS, EXAM_RULES, elementBySlug } from '~/data/elements'
import { lessonByElement } from '~/data/lessons'
import { bankCounts } from '~/data/questions'

const route = useRoute()
const element = elementBySlug(String(route.params.element))

if (!element) {
  throw createError({ statusCode: 404, statusMessage: 'Element not found' })
}

const lesson = lessonByElement(element.id)
const heroAccent = {
  signal: 'text-signal-500',
  teal: 'text-teal-500',
  gold: 'text-gold-500',
}[element.accent]

const elementIndex = ELEMENTS.findIndex((item) => item.id === element.id)
const previous = elementIndex > 0 ? ELEMENTS[elementIndex - 1] : undefined
const next = elementIndex < ELEMENTS.length - 1 ? ELEMENTS[elementIndex + 1] : undefined

const readingMinutes = computed(() => {
  const words = JSON.stringify(lesson.sections).replace(/[{}[\]",:]/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(4, Math.round(words / 190))
})

useSeoMeta({
  title: `${element.code} · ${element.name}`,
  description: element.description,
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-paper-300 bg-ink-950 text-paper-50">
      <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div class="container-page relative py-12 md:py-16">
        <nav class="flex flex-wrap items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper-100/40" aria-label="Breadcrumb">
          <NuxtLink to="/reviewer" class="transition-colors hover:text-paper-100">Reviewer</NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="text-paper-100/70">{{ element.code }}</span>
        </nav>

        <div class="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em]" :class="heroAccent">
              {{ element.code }} · {{ element.kicker }}
            </p>
            <h1 class="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {{ element.name }}
            </h1>
            <p class="mt-4 max-w-2xl text-base leading-7 text-paper-100/60">
              {{ element.description }}
            </p>
          </div>

          <dl class="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-3 lg:border-0 lg:pt-0">
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Required for</dt>
              <dd class="mt-1 text-sm font-medium text-paper-50">
                {{ element.requiredFor.map((track) => `Class ${track}`).join(' · ') }}
              </dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Mock items</dt>
              <dd class="mt-1 text-sm font-medium text-paper-50">{{ EXAM_RULES.itemsPerElement }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Mock time</dt>
              <dd class="mt-1 text-sm font-medium text-paper-50">{{ EXAM_RULES.minutesPerElement }} min</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <div class="container-page py-10 md:py-16">
      <div class="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
        <!-- Sidebar -->
        <aside class="lg:sticky lg:top-28 lg:self-start">
          <div class="hidden lg:block">
            <p class="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
              <ListChecks class="h-3.5 w-3.5" aria-hidden="true" />
              On this page
            </p>
            <nav class="mt-4 space-y-1 border-l border-paper-300" aria-label="Section navigation">
              <a
                v-for="(section, index) in lesson.sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-5 text-ink-600 transition-colors hover:border-signal-500 hover:text-ink-950"
              >
                <span class="mr-1.5 font-mono text-[0.55rem] text-ink-500">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ section.title }}
              </a>
            </nav>
          </div>

          <details class="rounded-xl border border-paper-300 bg-white/50 p-4 lg:hidden">
            <summary class="cursor-pointer text-sm font-semibold text-ink-900">On this page</summary>
            <nav class="mt-3 space-y-1.5" aria-label="Section navigation">
              <a
                v-for="(section, index) in lesson.sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block text-sm text-ink-600"
              >
                <span class="mr-1.5 font-mono text-[0.55rem] text-ink-500">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ section.title }}
              </a>
            </nav>
          </details>

          <div class="mt-5 hidden rounded-xl border border-paper-300 bg-paper-100 p-4 lg:block">
            <p class="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-500">
              <Clock class="h-3.5 w-3.5" aria-hidden="true" />
              About {{ readingMinutes }} min
            </p>
            <p class="mt-2 text-xs leading-5 text-ink-600">
              {{ bankCounts[element.id] }} questions in the bank for this element.
            </p>
            <NuxtLink
              to="/exam"
              class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-signal-600"
            >
              Take the mock
              <ArrowRight class="h-3.5 w-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>
        </aside>

        <!-- Lesson -->
        <article class="min-w-0">
          <div class="rounded-2xl border border-paper-300 bg-white/50 p-5 md:p-7">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-600">Why this element matters</p>
            <p class="mt-3 text-base leading-8 text-ink-700">{{ lesson.intro }}</p>
          </div>

          <div class="mt-4 rounded-xl border-l-4 border-signal-500 bg-signal-100 px-5 py-4">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-600">Exam note</p>
            <p class="mt-1.5 text-sm leading-7 text-ink-700">{{ lesson.examNote }}</p>
          </div>

          <div class="mt-12">
            <section
              v-for="(section, index) in lesson.sections"
              :id="section.id"
              :key="section.id"
              class="scroll-mt-28 border-t border-paper-300 py-10 first:border-0 first:pt-0"
            >
              <div class="flex items-baseline gap-3">
                <span class="font-mono text-[0.65rem] text-ink-500">{{ String(index + 1).padStart(2, '0') }}</span>
                <h2 class="text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">{{ section.title }}</h2>
              </div>
              <div class="mt-5 space-y-5">
                <LessonBlock v-for="(block, blockIndex) in section.blocks" :key="blockIndex" :block="block" />
              </div>
            </section>
          </div>

          <div class="mt-6">
            <QuickCheck :element="element.id" />
          </div>

          <div class="mt-8 rounded-2xl bg-ink-950 p-6 text-paper-50 md:p-8">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal-500">Next step</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-white">
              Ready to put {{ element.code }} under a timer?
            </h2>
            <p class="mt-2 max-w-xl text-sm leading-7 text-paper-100/55">
              The mock exam draws {{ EXAM_RULES.itemsPerElement }} questions from this element and
              gives you {{ EXAM_RULES.minutesPerElement }} minutes. You can flag and revisit items before submitting.
            </p>
            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/exam"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
              >
                Start the mock exam
                <ArrowRight class="h-4 w-4" aria-hidden="true" />
              </NuxtLink>
              <NuxtLink
                to="/reviewer"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-white/5"
              >
                Back to the hub
              </NuxtLink>
            </div>
          </div>

          <nav class="mt-8 flex flex-col justify-between gap-4 border-t border-paper-300 pt-6 sm:flex-row" aria-label="Element navigation">
            <NuxtLink
              v-if="previous"
              :to="`/reviewer/${previous.slug}`"
              class="group inline-flex items-center gap-3 text-sm"
            >
              <ArrowLeft class="h-4 w-4 text-ink-500 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              <span>
                <span class="block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Previous</span>
                <span class="font-medium text-ink-900">{{ previous.code }} · {{ previous.shortName }}</span>
              </span>
            </NuxtLink>
            <span v-else />

            <NuxtLink
              v-if="next"
              :to="`/reviewer/${next.slug}`"
              class="group inline-flex items-center gap-3 text-right sm:ml-auto"
            >
              <span>
                <span class="block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Next</span>
                <span class="font-medium text-ink-900">{{ next.code }} · {{ next.shortName }}</span>
              </span>
              <ArrowRight class="h-4 w-4 text-ink-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </NuxtLink>
          </nav>

          <p class="mt-8 flex items-center gap-2 text-xs text-ink-500">
            <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
            Study notes are summaries. The official text always prevails.
            <NuxtLink to="/sources" class="underline decoration-paper-300 underline-offset-4 hover:text-ink-900">
              View sources
            </NuxtLink>
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
