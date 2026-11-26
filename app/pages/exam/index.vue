<script setup lang="ts">
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  FileText,
  Mail,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Timer,
  User,
} from '@lucide/vue'
import type { LicenseTrack } from '~/data/elements'
import { EXAM_RULES, TRACKS } from '~/data/elements'
import {
  buildSession,
  clearSession,
  loadResult,
  loadSession,
  saveSession,
  type ExamResult,
  type ExamSession,
} from '~/utils/exam'

useSeoMeta({
  title: 'Start a Mock Exam · Class D or Class C',
  description:
    'Take a timed NTC amateur radio mock exam for Class D (Element 2) or Class C (Elements 2, 3, 4). No sign-in. Download your result as a PDF.',
})

const route = useRoute()
const initialTrack: LicenseTrack = route.query.track === 'D' ? 'D' : 'C'

const form = reactive({
  name: '',
  email: '',
  track: initialTrack,
  examDate: '',
  location: '',
  consent: false,
})

const error = ref('')
const submitting = ref(false)
const activeSession = ref<ExamSession | null>(null)
const lastResult = ref<ExamResult | null>(null)

onMounted(() => {
  activeSession.value = loadSession()
  lastResult.value = loadResult()
})

const selectedTrack = computed(() => TRACKS.find((track) => track.id === form.track)!)

function resume() {
  navigateTo('/exam/take')
}

function discard() {
  clearSession()
  activeSession.value = null
}

async function start() {
  error.value = ''
  if (form.name.trim().length < 2) {
    error.value = 'Enter the name that should appear on your result.'
    return
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.value = 'That email address does not look right. You can also leave it blank.'
    return
  }
  if (!form.consent) {
    error.value = 'Please confirm that you understand this is a practice exam.'
    return
  }

  submitting.value = true
  const session = buildSession({
    name: form.name.trim(),
    email: form.email.trim(),
    track: form.track,
    examDate: form.examDate,
    location: form.location.trim(),
  })
  saveSession(session)
  await navigateTo('/exam/take')
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-paper-300 bg-ink-950 text-paper-50">
      <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div class="container-page relative py-12 md:py-16">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-500">Mock exam</p>
        <h1 class="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Sit the paper before the paper sits you.
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-paper-100/60">
          Twenty-five items per element, forty minutes each, and a per-element score. No account,
          no email verification, no pressure. Your answers stay in this browser.
        </p>
      </div>
    </section>

    <div class="container-page py-10 md:py-16">
      <div v-if="activeSession" class="mb-8 rounded-2xl border border-signal-500/40 bg-signal-100 p-5 md:p-6">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div class="flex items-start gap-3">
            <CircleAlert class="mt-0.5 h-5 w-5 shrink-0 text-signal-600" aria-hidden="true" />
            <div>
              <p class="text-sm font-semibold text-ink-950">You have an exam in progress</p>
              <p class="mt-1 text-sm leading-6 text-ink-700">
                {{ activeSession.config.name }} · Class {{ activeSession.config.track }} ·
                Element {{ activeSession.elements[activeSession.current]?.element ?? 2 }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-semibold text-paper-50"
              @click="resume"
            >
              Resume exam
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-paper-300 bg-paper-50 px-4 py-2.5 text-sm font-medium text-ink-700"
              @click="discard"
            >
              <RotateCcw class="h-4 w-4" aria-hidden="true" />
              Discard
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
        <form class="rounded-2xl border border-paper-300 bg-white/50 p-5 md:p-8" novalidate @submit.prevent="start">
          <div class="flex items-center gap-3">
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-mono text-xs font-semibold text-paper-50">
              01
            </span>
            <div>
              <h2 class="text-lg font-semibold text-ink-950">Your details</h2>
              <p class="text-xs text-ink-500">Only used on your result sheet.</p>
            </div>
          </div>

          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-medium text-ink-900">Full name <span class="text-signal-600">*</span></label>
              <div class="relative mt-1.5">
                <User class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  placeholder="Juan dela Cruz"
                  class="w-full rounded-lg border border-paper-300 bg-paper-50 py-3 pl-10 pr-3 text-sm text-ink-950 placeholder:text-ink-500/50 focus:border-signal-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-ink-900">
                Email <span class="font-normal text-ink-500">(optional)</span>
              </label>
              <div class="relative mt-1.5">
                <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  class="w-full rounded-lg border border-paper-300 bg-paper-50 py-3 pl-10 pr-3 text-sm text-ink-950 placeholder:text-ink-500/50 focus:border-signal-500 focus:outline-none"
                />
              </div>
              <p class="mt-1.5 text-xs text-ink-500">Not sent anywhere. It is only stored with the result in this browser.</p>
            </div>

            <div>
              <label for="examDate" class="block text-sm font-medium text-ink-900">
                Exam date <span class="font-normal text-ink-500">(optional)</span>
              </label>
              <div class="relative mt-1.5">
                <CalendarDays class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
                <input
                  id="examDate"
                  v-model="form.examDate"
                  type="date"
                  class="w-full rounded-lg border border-paper-300 bg-paper-50 py-3 pl-10 pr-3 text-sm text-ink-950 focus:border-signal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label for="location" class="block text-sm font-medium text-ink-900">
                Testing center <span class="font-normal text-ink-500">(optional)</span>
              </label>
              <div class="relative mt-1.5">
                <MapPin class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  placeholder="NTC Quezon City"
                  class="w-full rounded-lg border border-paper-300 bg-paper-50 py-3 pl-10 pr-3 text-sm text-ink-950 placeholder:text-ink-500/50 focus:border-signal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-paper-200 pt-7">
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-mono text-xs font-semibold text-paper-50">
                02
              </span>
              <div>
                <h2 class="text-lg font-semibold text-ink-950">Choose your track</h2>
                <p class="text-xs text-ink-500">This sets the elements and the number of items.</p>
              </div>
            </div>

            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <label
                v-for="track in TRACKS"
                :key="track.id"
                class="relative flex cursor-pointer flex-col rounded-xl border p-4 transition-colors"
                :class="form.track === track.id ? 'border-signal-500 bg-signal-100' : 'border-paper-300 bg-paper-50 hover:border-ink-500'"
              >
                <input v-model="form.track" type="radio" name="track" :value="track.id" class="sr-only" />
                <span class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-ink-950">Class {{ track.id }} · {{ track.label }}</span>
                  <span
                    class="flex h-5 w-5 items-center justify-center rounded-full border"
                    :class="form.track === track.id ? 'border-signal-500 bg-signal-500 text-white' : 'border-paper-300 bg-white'"
                  >
                    <Check v-if="form.track === track.id" class="h-3 w-3" aria-hidden="true" />
                  </span>
                </span>
                <span class="mt-1.5 text-xs leading-5 text-ink-600">
                  {{ track.elements.map((element) => `Element ${element}`).join(' · ') }} ·
                  {{ track.items }} items · {{ track.minutes }} min
                </span>
              </label>
            </div>
          </div>

          <div class="mt-8 border-t border-paper-200 pt-7">
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="form.consent"
                type="checkbox"
                class="mt-0.5 h-4 w-4 rounded border-paper-300 text-signal-500 focus:ring-signal-500"
              />
              <span class="text-sm leading-6 text-ink-600">
                I understand this is an independent practice exam, not the official NTC examination,
                and my details are stored only in this browser.
              </span>
            </label>
          </div>

          <p v-if="error" class="mt-4 rounded-lg border border-fail-500/30 bg-fail-100 px-3 py-2.5 text-sm text-fail-500" role="alert">
            {{ error }}
          </p>

          <div class="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600 disabled:opacity-60 sm:w-auto"
            >
              {{ submitting ? 'Preparing your paper…' : `Start ${selectedTrack.name} exam` }}
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </button>
            <p class="text-xs leading-5 text-ink-500">
              {{ selectedTrack.items }} items · {{ selectedTrack.minutes }} minutes total
            </p>
          </div>

          <p v-if="lastResult" class="mt-5 text-xs text-ink-500">
            You already have a result from {{ new Date(lastResult.completedAt).toLocaleDateString() }}.
            <NuxtLink to="/exam/result" class="font-medium text-ink-900 underline decoration-paper-300 underline-offset-4">
              View it
            </NuxtLink>
            or start fresh above.
          </p>
        </form>

        <aside class="space-y-5">
          <div class="rounded-2xl border border-paper-300 bg-white/60 p-5">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">Exam format</p>
            <dl class="mt-4 space-y-4">
              <div class="flex items-start gap-3">
                <Timer class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                <div>
                  <dt class="text-sm font-semibold text-ink-900">{{ EXAM_RULES.minutesPerElement }} minutes per element</dt>
                  <dd class="mt-0.5 text-xs leading-5 text-ink-600">The clock pauses between elements. Auto-submits at zero.</dd>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <FileText class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                <div>
                  <dt class="text-sm font-semibold text-ink-900">{{ EXAM_RULES.itemsPerElement }} multiple-choice items</dt>
                  <dd class="mt-0.5 text-xs leading-5 text-ink-600">Four choices each. Flag and revisit any item inside the element.</dd>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                <div>
                  <dt class="text-sm font-semibold text-ink-900">{{ EXAM_RULES.passAverage }}% average, {{ EXAM_RULES.elementFloor }}% floor</dt>
                  <dd class="mt-0.5 text-xs leading-5 text-ink-600">No element below {{ EXAM_RULES.elementFloor }}%. Class C may still qualify for Class D.</dd>
                </div>
              </div>
            </dl>
          </div>

          <div class="rounded-2xl bg-ink-950 p-5 text-paper-50">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-500">No sign-in</p>
            <p class="mt-2 text-sm leading-6 text-paper-100/60">
              There is no account and no server. The form only personalizes the result PDF. You can
              close the tab and resume; the session is saved in this browser.
            </p>
          </div>

          <div class="rounded-2xl border border-paper-300 bg-paper-100 p-5">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">Before you start</p>
            <ul class="mt-3 space-y-2 text-xs leading-5 text-ink-600">
              <li class="flex gap-2"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />Use a quiet, stable connection.</li>
              <li class="flex gap-2"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />Keep this browser tab open.</li>
              <li class="flex gap-2"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />Have scratch paper for Element 3.</li>
              <li class="flex gap-2"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />Submit each element when you are done.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
