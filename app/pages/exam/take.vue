<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  Flag,
  ListChecks,
  Send,
  X,
} from '@lucide/vue'
import { elementById, EXAM_RULES, type ElementId } from '~/data/elements'
import { questionById } from '~/data/questions'
import {
  clearSession,
  formatClock,
  loadSession,
  saveResult,
  saveSession,
  scoreSession,
  startElement,
  trackLabel,
  type ExamSession,
} from '~/utils/exam'

useSeoMeta({
  title: 'Mock Exam in Progress',
  robots: 'noindex',
})

const session = ref<ExamSession | null>(null)
const ready = ref(false)
const now = ref(Date.now())
const showConfirm = ref(false)
const showInterstitial = ref(false)
const interstitialElement = ref<ElementId | null>(null)
const submitting = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const attempt = computed(() => {
  if (!session.value) return undefined
  return session.value.elements[session.value.current]
})

const meta = computed(() => (attempt.value ? elementById(attempt.value.element) : undefined))
const accentText = computed(() => {
  if (!meta.value) return 'text-signal-500'
  return {
    signal: 'text-signal-500',
    teal: 'text-teal-500',
    gold: 'text-gold-500',
  }[meta.value.accent]
})
const question = computed(() => {
  if (!attempt.value) return undefined
  const id = attempt.value.questionIds[attempt.value.cursor]
  return id ? questionById(id) : undefined
})
const total = computed(() => attempt.value?.questionIds.length ?? 0)
const answered = computed(() => {
  if (!attempt.value) return 0
  return Object.values(attempt.value.answers).filter((value) => value !== null).length
})
const unanswered = computed(() => Math.max(0, total.value - answered.value))
const remaining = computed(() => {
  if (!attempt.value?.endsAt) return EXAM_RULES.minutesPerElement * 60
  return Math.max(0, Math.floor((attempt.value.endsAt - now.value) / 1000))
})
const isLastElement = computed(() => {
  if (!session.value) return true
  return session.value.current >= session.value.elements.length - 1
})
const currentChoice = computed(() => {
  if (!attempt.value || !question.value) return null
  return attempt.value.answers[question.value.id] ?? null
})
const flagged = computed(() => {
  if (!attempt.value || !question.value) return false
  return attempt.value.flagged.includes(question.value.id)
})
const timeTone = computed(() => {
  if (remaining.value <= 300) return 'text-fail-500'
  if (remaining.value <= 600) return 'text-signal-500'
  return 'text-paper-100'
})

function persist() {
  if (session.value) saveSession(session.value)
}

function tick() {
  now.value = Date.now()
  const active = attempt.value
  if (!active || active.submittedAt || showInterstitial.value || !ready.value) return
  if (active.startedAt && active.endsAt && now.value >= active.endsAt) {
    void submitElement(true)
  }
}

function choose(index: number) {
  if (!attempt.value || !question.value || submitting.value) return
  attempt.value.answers[question.value.id] = index
  persist()
}

function toggleFlag() {
  if (!attempt.value || !question.value) return
  const list = attempt.value.flagged
  const id = question.value.id
  attempt.value.flagged = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
  persist()
}

function move(delta: number) {
  if (!attempt.value) return
  const next = attempt.value.cursor + delta
  if (next < 0 || next >= total.value) return
  attempt.value.cursor = next
  persist()
}

function goTo(index: number) {
  if (!attempt.value) return
  if (index < 0 || index >= total.value) return
  attempt.value.cursor = index
  persist()
}

async function submitElement(force = false) {
  if (!session.value || !attempt.value || submitting.value) return
  if (!force && unanswered.value > 0) {
    showConfirm.value = true
    return
  }

  submitting.value = true
  showConfirm.value = false
  attempt.value.submittedAt = Date.now()

  if (isLastElement.value) {
    const result = scoreSession(session.value)
    saveResult(result)
    clearSession()
    session.value = null
    submitting.value = false
    await navigateTo('/exam/result')
    return
  }

  interstitialElement.value = attempt.value.element
  session.value.current += 1
  persist()
  showInterstitial.value = true
  submitting.value = false
}

function continueNext() {
  if (!session.value) return
  startElement(session.value, session.value.current)
  persist()
  showInterstitial.value = false
  interstitialElement.value = null
  now.value = Date.now()
}

function warnBeforeUnload(event: BeforeUnloadEvent) {
  if (session.value && !showInterstitial.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}

function onKeydown(event: KeyboardEvent) {
  if (showConfirm.value || showInterstitial.value) return
  const key = event.key.toLowerCase()
  if (['1', '2', '3', '4'].includes(key)) {
    event.preventDefault()
    choose(Number(key) - 1)
    return
  }
  if (['a', 'b', 'c', 'd'].includes(key)) {
    event.preventDefault()
    choose('abcd'.indexOf(key))
    return
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    move(1)
    return
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    move(-1)
    return
  }
  if (key === 'f') {
    event.preventDefault()
    toggleFlag()
  }
}

onMounted(() => {
  session.value = loadSession()
  ready.value = true

  if (!session.value) return

  if (session.value.elements.every((item) => item.submittedAt)) {
    const result = scoreSession(session.value)
    saveResult(result)
    clearSession()
    navigateTo('/exam/result')
    return
  }

  const active = session.value.elements[session.value.current]
  if (active && !active.startedAt) {
    showInterstitial.value = true
    interstitialElement.value = session.value.elements[session.value.current - 1]?.element ?? null
  }

  now.value = Date.now()
  timer = setInterval(tick, 1000)
  document.addEventListener('visibilitychange', tick)
  window.addEventListener('beforeunload', warnBeforeUnload)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  document.removeEventListener('visibilitychange', tick)
  window.removeEventListener('beforeunload', warnBeforeUnload)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="container-page py-8 md:py-10">
    <div v-if="!ready" class="mx-auto max-w-xl rounded-2xl border border-paper-300 bg-white/50 p-8 text-center">
      <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-paper-300 border-t-signal-500" />
      <p class="mt-4 text-sm text-ink-600">Loading your paper…</p>
    </div>

    <div v-else-if="!session" class="mx-auto max-w-xl rounded-2xl border border-paper-300 bg-white/50 p-8 text-center">
      <CircleAlert class="mx-auto h-8 w-8 text-ink-500" aria-hidden="true" />
      <h1 class="mt-4 text-xl font-semibold text-ink-950">No active exam</h1>
      <p class="mt-2 text-sm leading-6 text-ink-600">
        Your session may have been completed or cleared. Start a new mock exam to continue.
      </p>
      <NuxtLink
        to="/exam"
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white"
      >
        Start a mock exam
        <ArrowRight class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>

    <template v-else-if="showInterstitial">
      <div class="mx-auto max-w-2xl">
        <div class="rounded-2xl border border-paper-300 bg-white/60 p-6 md:p-9">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-pass-100">
            <Check class="h-6 w-6 text-pass-500" aria-hidden="true" />
          </div>
          <p class="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-pass-500">Element submitted</p>
          <h1 class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
            Element {{ interstitialElement }} is locked in.
          </h1>
          <p class="mt-3 text-sm leading-7 text-ink-600">
            Your answers for this element are saved. The next element has its own
            {{ EXAM_RULES.minutesPerElement }}-minute timer, which starts when you continue. Take a breath,
            then begin.
          </p>

          <div class="mt-6">
            <span class="inline-flex items-center gap-2 rounded-xl border border-paper-300 px-4 py-2.5 text-sm font-medium text-ink-500">
              <Clock class="h-4 w-4" aria-hidden="true" />
              Timer paused
            </span>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
              @click="continueNext"
            >
              Continue to Element {{ session.elements[session.current]?.element }}
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </button>
            <NuxtLink
              to="/reviewer"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-paper-300 px-5 py-3.5 text-sm font-semibold text-ink-700"
            >
              Review in the meantime
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="attempt && question && meta">
      <!-- Exam header -->
      <div class="mb-6 rounded-2xl bg-ink-950 px-5 py-4 text-paper-50 md:px-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="rounded-lg px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]" :class="[meta.softClass, accentText]">
              {{ meta.code }}
            </span>
            <div>
              <p class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">
                {{ trackLabel(session.config.track) }} mock · {{ session.config.name }}
              </p>
              <p class="text-sm font-medium text-paper-50">{{ meta.name }}</p>
            </div>
          </div>

          <div class="flex items-center gap-5">
            <div class="text-right">
              <p class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Time left</p>
              <p class="font-mono text-xl font-semibold leading-none" :class="timeTone">
                {{ formatClock(remaining) }}
              </p>
            </div>
            <div class="h-9 w-px bg-white/10" aria-hidden="true" />
            <div class="text-right">
              <p class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Answered</p>
              <p class="font-mono text-xl font-semibold leading-none text-paper-50">
                {{ answered }}<span class="text-sm text-paper-100/40">/{{ total }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-signal-500 transition-all"
            :style="{ width: `${((attempt.cursor + 1) / total) * 100}%` }"
          />
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <!-- Question -->
        <div class="min-w-0">
          <div class="rounded-2xl border border-paper-300 bg-white/60 p-5 md:p-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">
                  Question {{ attempt.cursor + 1 }} of {{ total }}
                </p>
                <p class="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]" :class="meta.textClass">
                  {{ question.topic }}
                </p>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
                :class="flagged ? 'border-signal-500 bg-signal-100 text-signal-600' : 'border-paper-300 text-ink-500 hover:border-ink-500'"
                :aria-pressed="flagged"
                @click="toggleFlag"
              >
                <Flag class="h-3.5 w-3.5" :fill="flagged ? 'currentColor' : 'none'" aria-hidden="true" />
                {{ flagged ? 'Flagged' : 'Flag' }}
              </button>
            </div>

            <h1 class="mt-5 text-xl font-semibold leading-snug text-ink-950 md:text-2xl">
              {{ question.prompt }}
            </h1>

            <div class="mt-6 space-y-2.5" role="radiogroup" :aria-label="`Question ${attempt.cursor + 1}`">
              <button
                v-for="(choice, index) in question.choices"
                :key="choice"
                type="button"
                role="radio"
                :aria-checked="currentChoice === index"
                class="flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors"
                :class="currentChoice === index ? 'border-signal-500 bg-signal-100' : 'border-paper-300 bg-paper-50 hover:border-ink-500 hover:bg-white'"
                @click="choose(index)"
              >
                <span
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-[0.65rem] font-semibold"
                  :class="currentChoice === index ? 'border-signal-500 bg-signal-500 text-white' : 'border-paper-300 bg-white text-ink-500'"
                >
                  {{ String.fromCharCode(65 + index) }}
                </span>
                <span class="pt-0.5 text-sm leading-6 text-ink-800">{{ choice }}</span>
              </button>
            </div>

            <div class="mt-7 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-paper-200 pt-5 sm:flex-row sm:items-center">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-paper-300 px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-500 disabled:opacity-40"
                :disabled="attempt.cursor === 0"
                @click="move(-1)"
              >
                <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                Previous
              </button>

              <div class="flex items-center gap-2">
                <button
                  v-if="attempt.cursor < total - 1"
                  type="button"
                  class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-ink-950 px-5 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800 sm:flex-none"
                  @click="move(1)"
                >
                  Next question
                  <ChevronRight class="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  v-else
                  type="button"
                  class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600 sm:flex-none"
                  @click="submitElement()"
                >
                  Review & submit
                  <Send class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <p class="mt-4 hidden text-[0.65rem] text-ink-500 md:block">
              Keyboard: 1–4 or A–D to answer · ← → to move · F to flag
            </p>
          </div>

          <p class="mt-3 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-500">
            <span class="h-1.5 w-1.5 rounded-full bg-pass-500" aria-hidden="true" />
            Answers autosave in this browser
          </p>
        </div>

        <!-- Palette -->
        <aside class="space-y-4">
          <div class="rounded-2xl border border-paper-300 bg-white/60 p-4">
            <div class="flex items-center justify-between">
              <p class="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-500">Question map</p>
              <p class="font-mono text-[0.6rem] text-ink-500">{{ unanswered }} left</p>
            </div>
            <div class="mt-3 grid grid-cols-5 gap-2">
              <button
                v-for="(id, index) in attempt.questionIds"
                :key="id"
                type="button"
                class="relative flex h-9 items-center justify-center rounded-lg border font-mono text-xs font-medium transition-colors"
                :class="[
                  index === attempt.cursor
                    ? 'border-signal-500 bg-signal-100 text-signal-600'
                    : attempt.answers[id] !== null
                      ? 'border-ink-800 bg-ink-950 text-paper-50'
                      : 'border-paper-300 bg-paper-50 text-ink-500 hover:border-ink-500',
                ]"
                :aria-label="`Question ${index + 1}${attempt.answers[id] !== null ? ', answered' : ', unanswered'}${attempt.flagged.includes(id) ? ', flagged' : ''}`"
                @click="goTo(index)"
              >
                {{ index + 1 }}
                <span
                  v-if="attempt.flagged.includes(id)"
                  class="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-signal-500"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div class="mt-4 space-y-2 border-t border-paper-200 pt-3 text-[0.65rem] text-ink-500">
              <p class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded bg-ink-950" /> Answered</p>
              <p class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded border border-signal-500 bg-signal-100" /> Current</p>
              <p class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded border border-paper-300 bg-paper-50" /> Unanswered</p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
            @click="submitElement()"
          >
            {{ isLastElement ? 'Submit exam' : `Submit Element ${attempt.element}` }}
            <Send class="h-4 w-4" aria-hidden="true" />
          </button>

          <div class="rounded-xl border border-paper-300 bg-paper-100 p-4">
            <p class="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-500">
              <ListChecks class="h-3.5 w-3.5" aria-hidden="true" />
              Element {{ attempt.element }}
            </p>
            <p class="mt-1.5 text-xs leading-5 text-ink-600">
              {{ answered }} answered · {{ unanswered }} unanswered · {{ attempt.flagged.length }} flagged
            </p>
          </div>
        </aside>
      </div>
    </template>

    <!-- Confirm submit -->
    <div v-if="showConfirm" class="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/60 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div class="w-full max-w-md rounded-2xl bg-paper-50 p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-600">Unanswered items</p>
            <h2 id="confirm-title" class="mt-2 text-xl font-semibold text-ink-950">
              You still have {{ unanswered }} blank{{ unanswered === 1 ? '' : 's' }}.
            </h2>
          </div>
          <button type="button" class="text-ink-500 hover:text-ink-900" aria-label="Close" @click="showConfirm = false">
            <X class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p class="mt-3 text-sm leading-7 text-ink-600">
          Blank answers are marked wrong. You can go back and answer them, or submit this element now.
        </p>
        <div class="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-paper-300 px-4 py-3 text-sm font-semibold text-ink-700"
            @click="showConfirm = false"
          >
            <ArrowLeft class="h-4 w-4" aria-hidden="true" />
            Keep answering
          </button>
          <button
            type="button"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-signal-500 px-4 py-3 text-sm font-semibold text-white"
            @click="submitElement(true)"
          >
            Submit anyway
            <Send class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
