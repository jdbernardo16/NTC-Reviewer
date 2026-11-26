<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ClipboardList,
  Clock,
  Download,
  FileText,
  ShieldCheck,
  Timer,
} from '@lucide/vue'
import { ELEMENTS, EXAM_RULES, TRACKS } from '~/data/elements'
import { bankTotal } from '~/data/questions'

useSeoMeta({
  title: 'Free NTC Amateur Radio Reviewer & Mock Exam',
  description:
    'Study Elements 2, 3, and 4 for the Philippine NTC amateur radio exam. Take a timed mock exam for Class D or Class C and download your result as a PDF. Free, no sign-in.',
})

const dTrack = TRACKS.find((track) => track.id === 'D')!
const cTrack = TRACKS.find((track) => track.id === 'C')!

const faqs = [
  {
    q: 'Which elements do I need for Class D and Class C?',
    a: 'Class D requires Element 2 only. Class C requires Elements 2, 3, and 4. This is the coverage listed on the current NTC Form 1-01. Older reviewers sometimes repeat the 1987 coverage, which listed all three elements for Class D.',
  },
  {
    q: 'Is this the official NTC exam?',
    a: 'No. This is an independent practice tool. The questions are original study items based on the regulations and standard radio theory, not leaked or official NTC questions. Your result is a practice estimate, not an official rating.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. You only fill in a short form before the exam so your result sheet has a name. Everything is stored in your browser. There is no server, no login, and no email verification.',
  },
  {
    q: 'How is the passing score computed?',
    a: 'A mock exam passes with a 70% average across the elements and no element below 50%. For a Class C attempt, if the overall result fails but Element 2 is at least 50%, the result shows Class D eligibility, following the fallback in MC 03-08-2012.',
  },
  {
    q: 'Can I download my result?',
    a: 'Yes. The result page generates a one-page PDF with your name, track, per-element scores, overall result, and weak topics. It is generated in your browser, so nothing is uploaded.',
  },
  {
    q: 'How many questions are in the bank?',
    a: `The current bank has ${bankTotal} original questions across the three elements. Each mock exam draws 25 questions per element, so retakes give you a different paper.`,
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative isolate overflow-hidden bg-ink-950 text-paper-50">
      <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div
        class="absolute -right-40 top-1/2 hidden h-[42rem] w-[42rem] -translate-y-1/2 rounded-full border border-signal-500/20 lg:block"
        aria-hidden="true"
      />
      <div
        class="absolute -right-24 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-signal-500/15 lg:block"
        aria-hidden="true"
      />
      <div
        class="absolute -right-8 top-1/2 hidden h-[18rem] w-[18rem] -translate-y-1/2 rounded-full border border-signal-500/10 lg:block"
        aria-hidden="true"
      />

      <div class="container-page relative py-16 md:py-24 lg:py-28">
        <div class="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div class="rise">
            <p class="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal-500">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="signal-pulse absolute inline-flex h-full w-full rounded-full bg-signal-500" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
              </span>
              Philippine amateur radio · NTC
            </p>

            <h1 class="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your call sign starts with
              <span class="text-signal-500">Element 2.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-7 text-paper-100/65 md:text-lg md:leading-8">
              A free, mobile-friendly reviewer for the Philippine NTC amateur radio exam.
              Study the three elements, sit a timed mock exam for Class D or Class C, and
              download your result as a PDF.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/exam"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
              >
                Start a mock exam
                <ArrowRight class="h-4 w-4" aria-hidden="true" />
              </NuxtLink>
              <NuxtLink
                to="/reviewer"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <BookOpen class="h-4 w-4" aria-hidden="true" />
                Study the elements
              </NuxtLink>
            </div>

            <dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/40">Class D</dt>
                <dd class="mt-1.5 text-sm font-medium text-paper-100">Element 2</dd>
              </div>
              <div>
                <dt class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/40">Class C</dt>
                <dd class="mt-1.5 text-sm font-medium text-paper-100">Elements 2–4</dd>
              </div>
              <div>
                <dt class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/40">Sign-in</dt>
                <dd class="mt-1.5 text-sm font-medium text-paper-100">Not required</dd>
              </div>
            </dl>
          </div>

          <!-- Result card preview -->
          <div class="rise rise-2 relative mx-auto w-full max-w-md lg:rotate-1">
            <div class="rounded-2xl border border-paper-200 bg-paper-50 p-5 text-ink-950 shadow-2xl shadow-black/40 md:p-6">
              <div class="flex items-center justify-between border-b border-paper-200 pb-4">
                <div class="flex items-center gap-2.5">
                  <BrandMark size-class="h-8 w-8" />
                  <div>
                    <p class="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-500">NTC Reviewer</p>
                    <p class="text-sm font-semibold leading-tight">Mock examination result</p>
                  </div>
                </div>
                <span class="rounded-full bg-paper-200 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-600">
                  PDF
                </span>
              </div>

              <div class="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p class="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink-500">Candidate</p>
                  <p class="mt-1 text-lg font-semibold">Juan dela Cruz</p>
                  <p class="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-500">
                    Class C · 75 items
                  </p>
                </div>
                <div class="relative">
                  <div class="rounded-lg border-2 border-pass-500 px-3 py-1.5 text-center text-pass-500 -rotate-6">
                    <p class="font-mono text-[0.55rem] uppercase tracking-[0.18em]">Result</p>
                    <p class="text-lg font-bold leading-none">PASS</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex items-end justify-between rounded-xl bg-ink-950 px-4 py-4 text-paper-50">
                <div>
                  <p class="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-paper-100/50">Overall average</p>
                  <p class="mt-1 text-3xl font-semibold leading-none">
                    78<span class="text-lg text-signal-500">%</span>
                  </p>
                </div>
                <p class="font-mono text-[0.6rem] text-paper-100/50">70% to pass · 50% floor</p>
              </div>

              <div class="mt-5 space-y-3">
                <div v-for="row in [{ label: 'Element 2 · Rules', score: 84 }, { label: 'Element 3 · Fundamentals', score: 76 }, { label: 'Element 4 · Practice', score: 74 }]" :key="row.label">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-ink-600">{{ row.label }}</span>
                    <span class="font-mono font-medium text-ink-900">{{ row.score }}%</span>
                  </div>
                  <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-200">
                    <div class="h-full rounded-full bg-signal-500" :style="{ width: `${row.score}%` }" />
                  </div>
                </div>
              </div>

              <div class="mt-5 flex items-center justify-between border-t border-paper-200 pt-3">
                <p class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">
                  Generated in-browser
                </p>
                <p class="font-mono text-[0.55rem] text-ink-500">26 Nov 2026</p>
              </div>
            </div>
            <p class="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/35">
              Sample result · not an official NTC rating
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rules strip -->
    <section class="border-b border-paper-300 bg-paper-100">
      <div class="container-page grid grid-cols-2 divide-x divide-paper-300 py-5 md:grid-cols-4">
        <div class="px-4 py-2 text-center first:pl-0 last:pr-0 md:px-6">
          <p class="font-mono text-lg font-semibold text-ink-950">{{ EXAM_RULES.passAverage }}%</p>
          <p class="mt-0.5 text-xs text-ink-500">Average to pass</p>
        </div>
        <div class="px-4 py-2 text-center md:px-6">
          <p class="font-mono text-lg font-semibold text-ink-950">{{ EXAM_RULES.elementFloor }}%</p>
          <p class="mt-0.5 text-xs text-ink-500">Minimum per element</p>
        </div>
        <div class="px-4 py-2 text-center md:px-6">
          <p class="font-mono text-lg font-semibold text-ink-950">{{ EXAM_RULES.itemsPerElement }}</p>
          <p class="mt-0.5 text-xs text-ink-500">Items per element</p>
        </div>
        <div class="px-4 py-2 text-center md:px-6">
          <p class="font-mono text-lg font-semibold text-ink-950">{{ EXAM_RULES.minutesPerElement }} min</p>
          <p class="mt-0.5 text-xs text-ink-500">Per element</p>
        </div>
      </div>
    </section>

    <!-- Tracks -->
    <section class="container-page py-20 md:py-28" aria-labelledby="tracks-heading">
      <div class="max-w-2xl">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Choose your track</p>
        <h2 id="tracks-heading" class="mt-3 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
          Two licenses. Two different exams.
        </h2>
        <p class="mt-4 text-base leading-7 text-ink-600">
          The mock exam follows the element coverage on the current NTC application form. Pick the
          license you are actually going for — the Class D paper is much shorter.
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article class="group relative overflow-hidden rounded-2xl border border-paper-300 bg-white/60 p-6 transition-colors hover:border-ink-500 md:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-500">{{ dTrack.label }}</p>
              <h3 class="mt-2 text-2xl font-semibold tracking-tight text-ink-950">{{ dTrack.name }}</h3>
            </div>
            <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-signal-100 font-mono text-2xl font-bold text-signal-600">
              D
            </span>
          </div>
          <p class="mt-4 text-sm leading-7 text-ink-600">{{ dTrack.description }}</p>
          <dl class="mt-6 grid grid-cols-3 gap-3 border-t border-paper-200 pt-5">
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Elements</dt>
              <dd class="mt-1 text-sm font-semibold">2</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Items</dt>
              <dd class="mt-1 text-sm font-semibold">{{ dTrack.items }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-500">Time</dt>
              <dd class="mt-1 text-sm font-semibold">{{ dTrack.minutes }} min</dd>
            </div>
          </dl>
          <NuxtLink
            to="/exam?track=D"
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal-600"
          >
            Take the Class D paper
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </NuxtLink>
        </article>

        <article class="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 p-6 text-paper-50 transition-colors hover:border-ink-600 md:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <p class="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-100/50">{{ cTrack.label }}</p>
                <span class="rounded-full bg-signal-500/15 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-signal-500">
                  Most common
                </span>
              </div>
              <h3 class="mt-2 text-2xl font-semibold tracking-tight text-white">{{ cTrack.name }}</h3>
            </div>
            <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 font-mono text-2xl font-bold text-signal-500">
              C
            </span>
          </div>
          <p class="mt-4 text-sm leading-7 text-paper-100/60">{{ cTrack.description }}</p>
          <dl class="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Elements</dt>
              <dd class="mt-1 text-sm font-semibold">2, 3, 4</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Items</dt>
              <dd class="mt-1 text-sm font-semibold">{{ cTrack.items }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper-100/40">Time</dt>
              <dd class="mt-1 text-sm font-semibold">{{ cTrack.minutes }} min</dd>
            </div>
          </dl>
          <NuxtLink
            to="/exam?track=C"
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal-500"
          >
            Take the Class C paper
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- Elements -->
    <section class="border-y border-paper-300 bg-paper-100" aria-labelledby="elements-heading">
      <div class="container-page py-20 md:py-28">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">The reviewer</p>
            <h2 id="elements-heading" class="mt-3 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
              Three elements, one system.
            </h2>
            <p class="mt-4 text-base leading-7 text-ink-600">
              Every element page is a structured study guide: key definitions, comparison tables,
              formulas, exam traps, and a quick self-check. No sign-in, no paywall.
            </p>
          </div>
          <NuxtLink to="/reviewer" class="inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
            Open the reviewer hub
            <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <NuxtLink
            v-for="element in ELEMENTS"
            :key="element.id"
            :to="`/reviewer/${element.slug}`"
            class="group flex flex-col rounded-2xl border border-paper-300 bg-paper-50 p-6 transition-all hover:-translate-y-0.5 hover:border-ink-500 hover:shadow-lg hover:shadow-ink-950/5"
          >
            <div class="flex items-center justify-between">
              <span class="font-mono text-[0.6rem] uppercase tracking-[0.18em]" :class="element.textClass">
                {{ element.code }} · {{ element.kicker }}
              </span>
              <span class="h-2.5 w-2.5 rounded-full" :class="element.dotClass" aria-hidden="true" />
            </div>
            <h3 class="mt-3 text-xl font-semibold leading-tight tracking-tight text-ink-950">
              {{ element.name }}
            </h3>
            <p class="mt-3 text-sm leading-6 text-ink-600">{{ element.description }}</p>
            <ul class="mt-5 space-y-2">
              <li v-for="topic in element.topics.slice(0, 4)" :key="topic" class="flex items-start gap-2 text-xs leading-5 text-ink-600">
                <Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" aria-hidden="true" />
                {{ topic }}
              </li>
            </ul>
            <span class="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900">
              Study {{ element.code }}
              <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="container-page py-20 md:py-28" aria-labelledby="how-heading">
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">How it works</p>
          <h2 id="how-heading" class="mt-3 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
            A real exam rhythm, without the pressure.
          </h2>
          <p class="mt-4 text-base leading-7 text-ink-600">
            The mock is built like the actual paper: one element at a time, a countdown, and a
            per-element score. You can flag questions and move around inside an element.
          </p>
          <div class="mt-6 rounded-xl border border-signal-500/30 bg-signal-100 p-4">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-600">No account</p>
            <p class="mt-1.5 text-sm leading-6 text-ink-700">
              Your name and answers stay in this browser. Close the tab and the session resumes where you left it.
            </p>
          </div>
        </div>

        <ol class="space-y-1">
          <li
            v-for="(step, index) in [
              { title: 'Fill in the short form', text: 'Name, track, and optional exam details. No email verification, no password.', icon: ClipboardList },
              { title: 'Answer one element at a time', text: '25 items and 40 minutes per element. The timer is per element, not for the whole paper.', icon: Timer },
              { title: 'Get the per-element breakdown', text: 'Overall average, element scores, the 50% floor, and the Class D fallback where it applies.', icon: ShieldCheck },
              { title: 'Download the PDF result', text: 'A one-page result sheet generated in your browser, ready to save or print.', icon: Download },
            ]"
            :key="step.title"
            class="flex gap-5 rounded-2xl px-4 py-5 transition-colors hover:bg-paper-100 md:px-5"
          >
            <div class="flex flex-col items-center">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-paper-50">
                <component :is="step.icon" class="h-4 w-4" aria-hidden="true" />
              </span>
              <span v-if="index < 3" class="mt-2 h-full w-px bg-paper-300" aria-hidden="true" />
            </div>
            <div class="pb-1">
              <div class="flex items-baseline gap-3">
                <span class="font-mono text-[0.6rem] text-ink-500">0{{ index + 1 }}</span>
                <h3 class="text-base font-semibold text-ink-950">{{ step.title }}</h3>
              </div>
              <p class="mt-1.5 text-sm leading-7 text-ink-600">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Feature band -->
    <section class="bg-ink-950 text-paper-50">
      <div class="container-page py-16 md:py-20">
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Clock class="h-5 w-5 text-signal-500" aria-hidden="true" />
            <h3 class="mt-4 text-lg font-semibold text-white">Timed like the real thing</h3>
            <p class="mt-2 text-sm leading-6 text-paper-100/55">
              40 minutes per element. The countdown survives a refresh, and auto-submits when time runs out.
            </p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <FileText class="h-5 w-5 text-signal-500" aria-hidden="true" />
            <h3 class="mt-4 text-lg font-semibold text-white">A result you can keep</h3>
            <p class="mt-2 text-sm leading-6 text-paper-100/55">
              Download a clean A4 PDF with your scores, weak topics, and a clear pass or fail mark.
            </p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ShieldCheck class="h-5 w-5 text-signal-500" aria-hidden="true" />
            <h3 class="mt-4 text-lg font-semibold text-white">Grounded in the rules</h3>
            <p class="mt-2 text-sm leading-6 text-paper-100/55">
              Built around MC 03-08-2012, NTC Form 1-01, and the current amateur band plan. Sources are linked.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="container-page py-20 md:py-28" aria-labelledby="faq-heading">
      <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Questions</p>
          <h2 id="faq-heading" class="mt-3 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
            Before you sit the paper.
          </h2>
          <p class="mt-4 text-sm leading-7 text-ink-600">
            The short answers. Full sources and disclaimers are on the
            <NuxtLink to="/sources" class="font-medium text-ink-900 underline decoration-paper-300 underline-offset-4">
              sources page
            </NuxtLink>.
          </p>
        </div>

        <div class="divide-y divide-paper-300 border-y border-paper-300">
          <details v-for="faq in faqs" :key="faq.q" class="group py-5">
            <summary class="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
              <span class="text-base font-medium text-ink-900">{{ faq.q }}</span>
              <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-paper-300 text-ink-500 transition-transform group-open:rotate-45">
                <svg viewBox="0 0 12 12" class="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </span>
            </summary>
            <p class="mt-3 pr-10 text-sm leading-7 text-ink-600">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="border-t border-paper-300 bg-paper-100">
      <div class="container-page py-16 md:py-20">
        <div class="flex flex-col items-start justify-between gap-8 rounded-3xl bg-ink-950 p-8 text-paper-50 md:flex-row md:items-center md:p-12">
          <div>
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal-500">Ready when you are</p>
            <h2 class="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Find out what you actually know — before the NTC does.
            </h2>
            <p class="mt-3 max-w-lg text-sm leading-6 text-paper-100/55">
              Twenty-five minutes of honesty is worth more than another hour of highlighting.
            </p>
          </div>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <NuxtLink
              to="/exam"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
            >
              Start the mock exam
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              to="/reviewer"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-white/5"
            >
              Review first
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
