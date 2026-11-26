<script setup lang="ts">
import { RotateCcw, Check, X } from '@lucide/vue'
import type { ElementId, Question } from '~/data/elements'
import { questionsByElement } from '~/data/questions'
import { shuffle } from '~/utils/exam'

const props = withDefaults(
  defineProps<{
    element: ElementId
    count?: number
  }>(),
  { count: 3 },
)

const items = ref<Question[]>([])
const picked = reactive<Record<string, number>>({})
const revealed = reactive<Record<string, boolean>>({})

const answeredCount = computed(() => items.value.filter((item) => revealed[item.id]).length)
const score = computed(
  () => items.value.filter((item) => revealed[item.id] && picked[item.id] === item.answer).length,
)

function reset() {
  items.value = shuffle(questionsByElement(props.element)).slice(0, props.count)
  for (const key of Object.keys(picked)) delete picked[key]
  for (const key of Object.keys(revealed)) delete revealed[key]
}

function choose(question: Question, index: number) {
  if (revealed[question.id]) return
  picked[question.id] = index
  revealed[question.id] = true
}

onMounted(reset)
</script>

<template>
  <section class="rounded-2xl border border-paper-300 bg-white/50 p-5 md:p-7">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal-600">Quick check</p>
        <h2 class="mt-2 text-xl font-semibold tracking-tight text-ink-950 md:text-2xl">
          Three questions, no timer
        </h2>
      </div>
      <div class="flex items-center gap-3">
        <p class="font-mono text-xs text-ink-500">
          {{ answeredCount }} / {{ items.length }} answered
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-paper-300 px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-ink-500"
          @click="reset"
        >
          <RotateCcw class="h-3.5 w-3.5" aria-hidden="true" />
          Shuffle
        </button>
      </div>
    </div>

    <div v-if="items.length === 0" class="mt-6 space-y-3">
      <div class="h-20 animate-pulse rounded-xl bg-paper-200/60" />
      <div class="h-20 animate-pulse rounded-xl bg-paper-200/60" />
    </div>

    <div v-else class="mt-6 space-y-4">
      <article
        v-for="(question, index) in items"
        :key="question.id"
        class="rounded-xl border border-paper-300 bg-paper-50 p-4 md:p-5"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 font-mono text-xs text-ink-500">{{ String(index + 1).padStart(2, '0') }}</span>
          <p class="text-sm font-medium leading-6 text-ink-900">{{ question.prompt }}</p>
        </div>

        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            v-for="(choice, choiceIndex) in question.choices"
            :key="choice"
            type="button"
            :disabled="revealed[question.id]"
            class="flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm leading-5 transition-colors disabled:cursor-default"
            :class="[
              revealed[question.id] && choiceIndex === question.answer
                ? 'border-pass-500 bg-pass-100 text-ink-900'
                : revealed[question.id] && picked[question.id] === choiceIndex
                  ? 'border-fail-500 bg-fail-100 text-ink-900'
                  : revealed[question.id]
                    ? 'border-paper-200 bg-white/40 text-ink-500'
                    : 'border-paper-300 bg-white/60 text-ink-700 hover:border-ink-500 hover:bg-white',
            ]"
            @click="choose(question, choiceIndex)"
          >
            <span class="font-mono text-[0.65rem] font-semibold text-ink-500">
              {{ String.fromCharCode(65 + choiceIndex) }}
            </span>
            <span class="flex-1">{{ choice }}</span>
            <Check
              v-if="revealed[question.id] && choiceIndex === question.answer"
              class="mt-0.5 h-3.5 w-3.5 shrink-0 text-pass-500"
              aria-hidden="true"
            />
            <X
              v-else-if="revealed[question.id] && picked[question.id] === choiceIndex"
              class="mt-0.5 h-3.5 w-3.5 shrink-0 text-fail-500"
              aria-hidden="true"
            />
          </button>
        </div>

        <p
          v-if="revealed[question.id]"
          class="mt-3 rounded-lg border border-paper-200 bg-paper-100 px-3 py-2.5 text-xs leading-6 text-ink-600"
        >
          {{ question.explanation }}
        </p>
      </article>
    </div>

    <p v-if="answeredCount === items.length && items.length > 0" class="mt-5 text-sm font-medium text-ink-700">
      {{ score }} of {{ items.length }} correct.
      <NuxtLink to="/exam" class="text-signal-600 underline decoration-signal-300 underline-offset-4">
        Take the full timed mock exam
      </NuxtLink>
    </p>
  </section>
</template>
