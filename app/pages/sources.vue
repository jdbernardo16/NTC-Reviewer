<script setup lang="ts">
import { ArrowUpRight, Database, FileText, Info, ShieldCheck } from '@lucide/vue'

useSeoMeta({
  title: 'Sources, Disclaimers & Privacy',
  description:
    'The official sources behind the NTC Reviewer, what the mock exam does and does not claim, and how your data stays in your browser.',
})

const official = [
  {
    title: 'NTC Form No. 1-01',
    detail: 'Application for Radio Operator Examination, revision 03 (31 March 2023). The source for per-class element coverage: Class D = Element 2; Class C = Elements 2, 3, 4.',
    href: 'https://region7.ntc.gov.ph/wp-content/uploads/2024/01/Form_No._NTC_1-01_APPLICATION_FOR_RADIO_OPERATOR_EXAMINATION.pdf',
  },
  {
    title: 'NTC MC 03-08-2012',
    detail: 'Revised Amateur Radio Regulations. The source for licensing, privileges, examination ratings, operating rules, emergency procedure, districts, clubs, and penalties.',
    href: 'http://para.org.ph/legacy/NTC%20Memos/MC%2003-08-2012%20Revised%20Amateur%20Regulations.pdf',
  },
  {
    title: 'NTC MC 02-06-2019',
    detail: 'Frequency band allocation and types of emissions for the amateur radio service. The annexes set class-by-class band access.',
    href: 'https://region7.ntc.gov.ph/wp-content/uploads/2024/01/MC-02-06-2019.pdf',
  },
  {
    title: 'NTC MC 02-03-87',
    detail: 'The older 1987 circular. Useful only for historical context: it listed Elements II, III, and IV for Class D, which is where the outdated coverage claim comes from.',
    href: 'https://region7.ntc.gov.ph/wp-content/uploads/2024/01/MC_02-03-87.pdf',
  },
  {
    title: 'Philippine Amateur Radio Association',
    detail: 'PARA pages on licensing, call-sign prefixes, privileges, and the application process. Used as a secondary cross-check, not as the primary rule.',
    href: 'https://para.org.ph/getting-a-callsign.html',
  },
  {
    title: 'DX3H NTC exam resources',
    detail: 'Seminar decks and practice material used to cross-check the Element 2, 3, and 4 topic outlines. Not an official question pool.',
    href: 'https://www.dx3h.org/ntcexamresources-1',
  },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-paper-300 bg-ink-950 text-paper-50">
      <div class="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div class="container-page relative py-14 md:py-20">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-500">Sources & disclaimers</p>
        <h1 class="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Built on the rules, not on rumor.
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-paper-100/60">
          The reviewer is a study aid, not a substitute for the official text. Every fact-heavy
          section is anchored to an NTC circular, the application form, or a standard radio reference.
          Where something is a practice convention rather than a rule, it is labeled.
        </p>
        <p class="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-100/35">
          Last reviewed · November 2026
        </p>
      </div>
    </section>

    <div class="container-page py-12 md:py-16">
      <div class="grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-14">
        <div class="space-y-12">
          <!-- Official sources -->
          <section aria-labelledby="official-heading">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Primary references</p>
            <h2 id="official-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
              Official sources.
            </h2>
            <div class="mt-5 space-y-3">
              <a
                v-for="source in official"
                :key="source.href"
                :href="source.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-start justify-between gap-4 rounded-xl border border-paper-300 bg-white/50 p-4 transition-colors hover:border-ink-500 md:p-5"
              >
                <div class="flex items-start gap-3">
                  <FileText class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                  <div>
                    <p class="text-sm font-semibold text-ink-950">{{ source.title }}</p>
                    <p class="mt-1.5 text-xs leading-6 text-ink-600">{{ source.detail }}</p>
                  </div>
                </div>
                <ArrowUpRight class="mt-0.5 h-4 w-4 shrink-0 text-ink-500 transition-colors group-hover:text-ink-900" aria-hidden="true" />
              </a>
            </div>
          </section>

          <!-- What is official -->
          <section aria-labelledby="claims-heading">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Scope</p>
            <h2 id="claims-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
              What is official, and what is practice.
            </h2>

            <div class="mt-5 space-y-4">
              <div class="rounded-xl border border-paper-300 bg-white/50 p-5">
                <h3 class="text-sm font-semibold text-ink-950">Official rules used here</h3>
                <ul class="mt-3 space-y-2 text-sm leading-6 text-ink-600">
                  <li>Class D coverage is Element 2 only; Class C coverage is Elements 2, 3, and 4.</li>
                  <li>The passing standard is a 70% average with no element below 50%.</li>
                  <li>A Class C candidate who fails Elements 3 and 4 but passes Element 2 may be eligible for Class D.</li>
                  <li>Class D is limited to VHF 144–146 MHz: 50 W fixed, 10 W mobile or portable.</li>
                  <li>The Philippines has nine amateur radio districts.</li>
                </ul>
              </div>

              <div class="rounded-xl border border-signal-500/30 bg-signal-100 p-5">
                <h3 class="flex items-center gap-2 text-sm font-semibold text-ink-950">
                  <Info class="h-4 w-4 text-signal-600" aria-hidden="true" />
                  Practice conventions, not NTC rules
                </h3>
                <ul class="mt-3 space-y-2 text-sm leading-6 text-ink-700">
                  <li>The mock uses 25 items per element and 40 minutes per element. These are common practice-exam conventions, not figures stated in MC 03-08-2012.</li>
                  <li>The questions are original study items written for this site. They are not official NTC questions and do not come from a leaked question pool.</li>
                  <li>Scores are rounded to the nearest whole percent. The NTC’s own computation may differ at the margin.</li>
                  <li>The Class D fallback is shown when Element 2 is at or above 50%. The regulation does not spell out every edge case; the NTC makes the final determination.</li>
                </ul>
              </div>

              <div class="rounded-xl border border-paper-300 bg-paper-100 p-5">
                <h3 class="flex items-center gap-2 text-sm font-semibold text-ink-950">
                  <ShieldCheck class="h-4 w-4 text-ink-600" aria-hidden="true" />
                  Not affiliated with the NTC or PARA
                </h3>
                <p class="mt-2 text-sm leading-6 text-ink-600">
                  This is an independent project. It is not endorsed by, affiliated with, or operated by
                  the National Telecommunications Commission, the Philippine Amateur Radio Association,
                  or any amateur club. Always verify requirements, fees, schedules, and band privileges
                  with the NTC or your regional office.
                </p>
              </div>
            </div>
          </section>

          <!-- Privacy -->
          <section aria-labelledby="privacy-heading">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Privacy</p>
            <h2 id="privacy-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
              Your data stays in your browser.
            </h2>
            <div class="mt-5 rounded-xl border border-paper-300 bg-white/50 p-5">
              <div class="flex items-start gap-3">
                <Database class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                <div class="space-y-3 text-sm leading-6 text-ink-600">
                  <p>
                    The site has no backend, no account system, and no analytics that identify you. The
                    name, optional email, optional exam details, answers, and result are stored in your
                    browser’s local storage so the exam can survive a refresh.
                  </p>
                  <p>
                    The PDF is generated in your browser. Nothing is uploaded to a server. Clearing your
                    browser storage removes the saved session and result.
                  </p>
                  <p>
                    If you use a shared or public computer, clear the site data after downloading your
                    result. The result PDF may contain the name and optional details you entered.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Corrections -->
          <section aria-labelledby="corrections-heading">
            <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Accuracy</p>
            <h2 id="corrections-heading" class="mt-2 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
              Found something wrong?
            </h2>
            <p class="mt-4 text-sm leading-7 text-ink-600">
              Regulations change, and study notes can drift. If a question, formula, or rule looks
              wrong, check the official source first. If the site still disagrees, treat the official
              text as authoritative and use the source links above to verify the current rule.
            </p>
            <p class="mt-3 text-sm leading-7 text-ink-600">
              A good habit: before relying on any reviewer — including this one — open the current NTC
              Form 1-01 and MC 03-08-2012 and confirm the element coverage and passing standard for
              yourself.
            </p>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div class="rounded-2xl bg-ink-950 p-5 text-paper-50">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-500">The short version</p>
            <ul class="mt-3 space-y-2.5 text-xs leading-6 text-paper-100/60">
              <li>Class D: Element 2 only.</li>
              <li>Class C: Elements 2, 3, 4.</li>
              <li>Pass: 70% average, 50% per-element floor.</li>
              <li>Mock: 25 items per element, 40 minutes each.</li>
              <li>No account. No server. No upload.</li>
            </ul>
          </div>

          <div class="rounded-2xl border border-paper-300 bg-white/60 p-5">
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">Official links</p>
            <ul class="mt-3 space-y-2.5">
              <li>
                <a href="https://ntc.gov.ph" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-950">
                  NTC website
                  <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://para.org.ph" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-950">
                  PARA
                  <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://www.dx3h.org/ntcexamresources-1" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-950">
                  DX3H resources
                  <ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <NuxtLink
            to="/exam"
            class="block rounded-2xl border border-signal-500/30 bg-signal-100 p-5 transition-colors hover:border-signal-500"
          >
            <p class="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal-600">Apply it</p>
            <p class="mt-1.5 text-sm font-semibold text-ink-950">Take a timed mock exam</p>
            <p class="mt-1 text-xs leading-5 text-ink-600">25 items per element, a real countdown, and a PDF result.</p>
          </NuxtLink>
        </aside>
      </div>
    </div>
  </div>
</template>
