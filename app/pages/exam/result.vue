<script setup lang="ts">
import { ArrowRight, Check, CircleAlert, Download, RotateCcw, X } from '@lucide/vue'
import { EXAM_RULES, elementById } from '~/data/elements'
import { questionById } from '~/data/questions'
import {
  formatDuration,
  loadResult,
  trackLabel,
  type ExamResult,
} from '~/utils/exam'
import { downloadResultPdf } from '~/utils/pdf'

useSeoMeta({
  title: 'Mock Exam Result',
  robots: 'noindex',
})

const result = ref<ExamResult | null>(null)
const ready = ref(false)
const downloading = ref(false)
const downloadError = ref('')
const onlyMissed = ref(false)

onMounted(() => {
  result.value = loadResult()
  ready.value = true
})

const status = computed(() => {
  if (!result.value) {
    return {
      label: '',
      headline: '',
      blurb: '',
      tone: 'border-paper-300 bg-paper-100 text-ink-700',
      eyebrow: 'text-ink-500',
    }
  }
  if (result.value.outcome === 'pass') {
    return {
      label: 'PASS',
      headline: 'You passed the mock.',
      blurb: 'You met the 70% average and the 50% per-element floor. Keep this result as a benchmark, not a guarantee.',
      tone: 'border-pass-500 bg-pass-100 text-pass-500',
      eyebrow: 'text-pass-500',
    }
  }
  if (result.value.outcome === 'class-d-eligible') {
    return {
      label: 'CLASS D ELIGIBLE',
      headline: 'You are in Class D territory.',
      blurb:
        'The Class C average was not met, but Element 2 is at or above 50%. Under MC 03-08-2012, a Class C candidate who passes Element 2 may be eligible for a Class D license.',
      tone: 'border-signal-500 bg-signal-100 text-signal-600',
      eyebrow: 'text-signal-600',
    }
  }
  const floors = result.value.elements.filter((element) => element.percent < EXAM_RULES.elementFloor)
  const labels = floors.map((element) => `Element ${element.element}`)
  const list =
    labels.length === 1
      ? labels[0]
      : labels.length === 2
        ? `${labels[0]} and ${labels[1]}`
        : `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`
  return {
    label: 'FAIL',
    headline: 'Not this time.',
    blurb:
      floors.length > 0
        ? `${list} fell below the 50% floor. The average alone is not enough.`
        : `The overall average was below ${EXAM_RULES.passAverage}%. Review the weak topics below, then try another paper.`,
    tone: 'border-fail-500 bg-fail-100 text-fail-500',
    eyebrow: 'text-fail-500',
  }
})

const completedLabel = computed(() => {
  if (!result.value) return ''
  return new Date(result.value.completedAt).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const examDateLabel = computed(() => {
  if (!result.value?.config.examDate) return ''
  const date = new Date(`${result.value.config.examDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return result.value.config.examDate
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
})

const reviewGroups = computed(() => {
  if (!result.value) return []
  return result.value.elements.map((element) => {
    const meta = elementById(element.element)
    const items = result.value!.questionResults
      .filter((item) => item.element === element.element)
      .flatMap((item) => {
        const question = questionById(item.questionId)
        return question ? [{ ...item, question }] : []
      })
      .filter((item) => (onlyMissed.value ? !item.correct : true))
    return { ...element, meta, items }
  })
})

const totalCorrect = computed(() =>
  result.value ? result.value.elements.reduce((sum, element) => sum + element.correct, 0) : 0,
)
const totalItems = computed(() =>
  result.value ? result.value.elements.reduce((sum, element) => sum + element.total, 0) : 0,
)

function answerText(question: { choices: readonly string[] } | undefined, chosen: number | null): string {
  if (!question) return '—'
  if (chosen === null) return 'Not answered'
  return question.choices[chosen] ?? '—'
}

async function download() {
  if (!result.value || downloading.value) return
  downloading.value = true
  downloadError.value = ''
  try {
    await downloadResultPdf(result.value)
  } catch (error) {
    console.error(error)
    downloadError.value = 'The PDF could not be generated in this browser. Try a different browser or use Print.'
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="!ready" class="container-page py-20">
      <div class="mx-auto max-w-md rounded-2xl border border-paper-300 bg-white/50 p-8 text-center">
        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-paper-300 border-t-signal-500" />
        <p class="mt-4 text-sm text-ink-600">Loading your result…</p>
      </div>
    </div>

    <div v-else-if="!result" class="container-page py-20">
      <div class="mx-auto max-w-xl rounded-2xl border border-paper-300 bg-white/50 p-8 text-center">
        <CircleAlert class="mx-auto h-9 w-9 text-ink-500" aria-hidden="true" />
        <h1 class="mt-4 text-2xl font-semibold text-ink-950">No result yet</h1>
        <p class="mt-2 text-sm leading-7 text-ink-600">
          Finish a mock exam and your result will appear here. The result is stored in this browser,
          so it will not follow you to another device.
        </p>
        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink
            to="/exam"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Start a mock exam
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink
            to="/reviewer"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-paper-300 px-5 py-3 text-sm font-semibold text-ink-700"
          >
            Open the reviewer
          </NuxtLink>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Result hero -->
      <section class="relative overflow-hidden bg-ink-950 text-paper-50">
        <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div class="container-page relative py-12 md:py-16">
          <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-500">Mock examination result</p>

          <div class="mt-5 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span class="inline-flex rounded-lg border-2 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em]" :class="status.tone">
                {{ status.label }}
              </span>
              <h1 class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {{ status.headline }}
              </h1>
              <p class="mt-4 max-w-2xl text-sm leading-7 text-paper-100/60 md:text-base">
                {{ status.blurb }}
              </p>

              <dl class="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm">
                <div>
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Candidate</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ result.config.name }}</dd>
                </div>
                <div>
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Track</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ trackLabel(result.track) }}</dd>
                </div>
                <div>
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Completed</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ completedLabel }}</dd>
                </div>
                <div>
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Time used</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ formatDuration(result.durationSec) }}</dd>
                </div>
                <div v-if="examDateLabel">
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Exam date</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ examDateLabel }}</dd>
                </div>
                <div v-if="result.config.location">
                  <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Testing center</dt>
                  <dd class="mt-1 font-medium text-paper-50">{{ result.config.location }}</dd>
                </div>
              </dl>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/40">Overall average</p>
              <p class="mt-2 text-6xl font-semibold leading-none tracking-tight text-white">
                {{ result.overall }}<span class="text-2xl text-signal-500">%</span>
              </p>
              <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  class="h-full rounded-full"
                  :class="result.overall >= EXAM_RULES.passAverage ? 'bg-pass-500' : 'bg-signal-500'"
                  :style="{ width: `${Math.min(100, result.overall)}%` }"
                />
              </div>
              <p class="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper-100/40">
                {{ EXAM_RULES.passAverage }}% to pass · {{ EXAM_RULES.elementFloor }}% floor
              </p>
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              :disabled="downloading"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600 disabled:opacity-60"
              @click="download"
            >
              <Download class="h-4 w-4" aria-hidden="true" />
              {{ downloading ? 'Generating PDF…' : 'Download result as PDF' }}
            </button>
            <NuxtLink
              to="/exam"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-white/5"
            >
              <RotateCcw class="h-4 w-4" aria-hidden="true" />
              Take another paper
            </NuxtLink>
            <a
              href="#review"
              class="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-signal-500 transition-colors hover:bg-white/5"
            >
              Review answers
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p v-if="downloadError" class="mt-3 text-xs text-fail-500" role="alert">{{ downloadError }}</p>
          <p class="mt-4 max-w-2xl text-xs leading-5 text-paper-100/35">
            This is a practice estimate, not an official NTC rating. The PDF is generated in your browser;
            nothing is uploaded.
          </p>
        </div>
      </section>

      <div class="container-page py-10 md:py-14">
        <!-- Element breakdown -->
        <section aria-labelledby="breakdown-heading">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Element breakdown</p>
              <h2 id="breakdown-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                Where the score came from.
              </h2>
            </div>
            <p class="text-sm text-ink-500">
              {{ totalCorrect }} of {{ totalItems }} correct
            </p>
          </div>

          <div class="mt-6 grid gap-4" :class="result.elements.length === 1 ? 'max-w-sm' : 'md:grid-cols-3'">
            <article
              v-for="element in result.elements"
              :key="element.element"
              class="rounded-2xl border border-paper-300 bg-white/60 p-5"
            >
              <div class="flex items-center justify-between">
                <span class="font-mono text-[0.6rem] uppercase tracking-[0.16em]" :class="elementById(element.element).textClass">
                  Element {{ element.element }}
                </span>
                <span
                  class="rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em]"
                  :class="element.percent >= EXAM_RULES.passAverage ? 'bg-pass-100 text-pass-500' : element.percent >= EXAM_RULES.elementFloor ? 'bg-signal-100 text-signal-600' : 'bg-fail-100 text-fail-500'"
                >
                  {{ element.percent >= EXAM_RULES.passAverage ? '70+' : element.percent >= EXAM_RULES.elementFloor ? 'Floor' : 'Below 50' }}
                </span>
              </div>
              <p class="mt-2 text-sm font-medium leading-5 text-ink-700">
                {{ elementById(element.element).shortName }}
              </p>
              <div class="mt-4 flex items-end justify-between">
                <p class="text-4xl font-semibold leading-none tracking-tight text-ink-950">
                  {{ element.percent }}<span class="text-lg text-ink-500">%</span>
                </p>
                <p class="font-mono text-xs text-ink-500">{{ element.correct }}/{{ element.total }}</p>
              </div>
              <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-200">
                <div
                  class="h-full rounded-full"
                  :class="element.percent >= EXAM_RULES.passAverage ? 'bg-pass-500' : element.percent >= EXAM_RULES.elementFloor ? 'bg-signal-500' : 'bg-fail-500'"
                  :style="{ width: `${element.percent}%` }"
                />
              </div>
              <p class="mt-3 text-xs text-ink-500">
                {{ element.answered }} answered · {{ formatDuration(element.timeUsedSec) }}
              </p>
            </article>
          </div>
        </section>

        <!-- Class D fallback -->
        <div v-if="result.outcome === 'class-d-eligible'" class="mt-6 rounded-2xl border border-signal-500/40 bg-signal-100 p-5 md:p-6">
          <div class="flex items-start gap-3">
            <CircleAlert class="mt-0.5 h-5 w-5 shrink-0 text-signal-600" aria-hidden="true" />
            <div>
              <h2 class="text-sm font-semibold text-ink-950">Class D eligibility note</h2>
              <p class="mt-1.5 text-sm leading-7 text-ink-700">
                Element 2 is at or above the 50% floor. MC 03-08-2012 provides that a Class C candidate
                who fails Elements 3 and 4 but passes Element 2 is eligible for a Class D license. The NTC
                makes the final determination — confirm with your regional office.
              </p>
            </div>
          </div>
        </div>

        <!-- Weak topics -->
        <section class="mt-10" aria-labelledby="weak-heading">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Next review</p>
              <h2 id="weak-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                Where to spend the next hour.
              </h2>
            </div>
            <NuxtLink to="/reviewer" class="text-sm font-semibold text-ink-900 underline decoration-paper-300 underline-offset-4">
              Open the element guides
            </NuxtLink>
          </div>

          <div v-if="result.weakTopics.length === 0" class="mt-5 rounded-xl border border-pass-500/30 bg-pass-100 p-5 text-sm text-ink-700">
            No missed topics in this attempt. Try a fresh paper — the bank draws a different set each time.
          </div>

          <div v-else class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="topic in result.weakTopics" :key="topic.topic" class="rounded-xl border border-paper-300 bg-white/50 p-4">
              <div class="flex items-start justify-between gap-3">
                <p class="text-sm font-medium leading-6 text-ink-900">{{ topic.topic }}</p>
                <span class="shrink-0 rounded-full bg-fail-100 px-2 py-0.5 font-mono text-[0.55rem] text-fail-500">
                  {{ topic.wrong }}/{{ topic.total }}
                </span>
              </div>
              <div class="mt-3 h-1 overflow-hidden rounded-full bg-paper-200">
                <div class="h-full rounded-full bg-fail-500" :style="{ width: `${(topic.wrong / topic.total) * 100}%` }" />
              </div>
            </div>
          </div>
        </section>

        <!-- Answer review -->
        <section id="review" class="mt-12 scroll-mt-28" aria-labelledby="review-heading">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Answer review</p>
              <h2 id="review-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                Every item, with the reasoning.
              </h2>
            </div>
            <label class="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-600">
              <input v-model="onlyMissed" type="checkbox" class="h-4 w-4 rounded border-paper-300 text-signal-500 focus:ring-signal-500" />
              Show only missed
            </label>
          </div>

          <div class="mt-5 space-y-4">
            <details
              v-for="group in reviewGroups"
              :key="group.element"
              class="group overflow-hidden rounded-2xl border border-paper-300 bg-white/50"
            >
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
                <div class="flex items-center gap-3">
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-semibold" :class="[group.meta.softClass, group.meta.textClass]">
                    {{ group.element }}
                  </span>
                  <div>
                    <p class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Element {{ group.element }}</p>
                    <p class="text-sm font-semibold text-ink-950">{{ group.meta.name }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="font-mono text-sm font-semibold text-ink-900">{{ group.correct }}/{{ group.total }}</span>
                  <span class="text-ink-500 transition-transform group-open:rotate-180" aria-hidden="true">
                    <svg viewBox="0 0 12 12" class="h-3.5 w-3.5" fill="none">
                      <path d="M2 4.5 6 8.5l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </span>
                </div>
              </summary>

              <div class="border-t border-paper-200 px-5 pb-5 md:px-6">
                <p v-if="group.items.length === 0" class="py-5 text-sm text-ink-500">
                  {{ onlyMissed ? 'No missed items in this element. Good work.' : 'No items to show.' }}
                </p>
                <article v-for="item in group.items" :key="item.questionId" class="border-b border-paper-200 py-5 last:border-0">
                  <div class="flex items-start gap-3">
                    <span
                      class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                      :class="item.correct ? 'bg-pass-100 text-pass-500' : 'bg-fail-100 text-fail-500'"
                    >
                      <Check v-if="item.correct" class="h-3.5 w-3.5" aria-hidden="true" />
                      <X v-else class="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div class="min-w-0">
                      <p class="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-500">{{ item.question.topic }}</p>
                      <p class="mt-1 text-sm font-medium leading-6 text-ink-950">{{ item.question.prompt }}</p>

                      <div class="mt-3 grid gap-2 sm:grid-cols-2">
                        <p
                          class="rounded-lg border px-3 py-2 text-xs leading-5"
                          :class="item.correct ? 'border-pass-500/30 bg-pass-100 text-ink-700' : 'border-fail-500/30 bg-fail-100 text-ink-700'"
                        >
                          <span class="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink-500">Your answer</span><br />
                          {{ answerText(item.question, item.chosen) }}
                        </p>
                        <p class="rounded-lg border border-pass-500/30 bg-pass-100 px-3 py-2 text-xs leading-5 text-ink-700">
                          <span class="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink-500">Correct answer</span><br />
                          {{ answerText(item.question, item.question.answer) }}
                        </p>
                      </div>

                      <p class="mt-3 text-xs leading-6 text-ink-600">{{ item.question.explanation }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </details>
          </div>
        </section>

        <p class="mt-10 rounded-xl border border-paper-300 bg-paper-100 p-4 text-xs leading-6 text-ink-500">
          This result is an independent practice estimate, not an official NTC rating. Passing marks are
          based on MC 03-08-2012 (70% average, 50% per-element floor). Verify all requirements with the NTC.
          <NuxtLink to="/sources" class="font-medium text-ink-700 underline decoration-paper-300 underline-offset-4">
            View sources
          </NuxtLink>
        </p>
      </div>
    </template>
  </div>
</template>
