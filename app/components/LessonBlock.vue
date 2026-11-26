<script setup lang="ts">
import { Signal, TriangleAlert, Info } from '@lucide/vue'
import type { LessonBlock } from '~/data/lesson-types'

defineProps<{
  block: LessonBlock
}>()

const calloutStyles = {
  key: {
    wrapper: 'border-signal-500 bg-signal-100',
    label: 'text-signal-600',
    icon: Signal,
  },
  trap: {
    wrapper: 'border-fail-500 bg-fail-100',
    label: 'text-fail-500',
    icon: TriangleAlert,
  },
  note: {
    wrapper: 'border-paper-300 bg-paper-100',
    label: 'text-ink-600',
    icon: Info,
  },
} as const
</script>

<template>
  <p v-if="block.type === 'p'" class="text-base leading-8 text-ink-700">
    {{ block.text }}
  </p>

  <ul v-else-if="block.type === 'list'" class="space-y-3">
    <li v-for="item in block.items" :key="item" class="flex gap-3 text-base leading-7 text-ink-700">
      <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" aria-hidden="true" />
      <span>{{ item }}</span>
    </li>
  </ul>

  <ol v-else-if="block.type === 'steps'" class="space-y-4">
    <li v-for="(item, index) in block.items" :key="item" class="flex gap-4 text-base leading-7 text-ink-700">
      <span
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-xs font-semibold text-paper-50"
      >
        {{ index + 1 }}
      </span>
      <span class="pt-0.5">{{ item }}</span>
    </li>
  </ol>

  <div v-else-if="block.type === 'table'" class="overflow-hidden rounded-xl border border-paper-300">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left text-sm">
        <thead>
          <tr class="bg-paper-100">
            <th
              v-for="head in block.head"
              :key="head"
              class="whitespace-nowrap border-b border-paper-300 px-4 py-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink-600"
            >
              {{ head }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in block.rows"
            :key="rowIndex"
            class="border-b border-paper-200 last:border-0 even:bg-paper-50"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-4 py-3 align-top leading-6 text-ink-700"
              :class="cellIndex === 0 ? 'font-medium text-ink-900' : ''"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="block.caption" class="border-t border-paper-200 bg-paper-100 px-4 py-2.5 text-xs text-ink-500">
      {{ block.caption }}
    </p>
  </div>

  <div
    v-else-if="block.type === 'formula'"
    class="rounded-xl border border-ink-800 bg-ink-950 px-5 py-5 text-paper-50"
  >
    <p class="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-signal-500">
      {{ block.label }}
    </p>
    <p class="mt-3 overflow-x-auto font-mono text-xl leading-8 text-white md:text-2xl">
      {{ block.expression }}
    </p>
    <p v-if="block.note" class="mt-3 text-sm leading-6 text-paper-100/60">
      {{ block.note }}
    </p>
  </div>

  <div
    v-else-if="block.type === 'callout'"
    class="rounded-xl border-l-4 px-5 py-5"
    :class="calloutStyles[block.tone].wrapper"
  >
    <div class="flex items-center gap-2">
      <component
        :is="calloutStyles[block.tone].icon"
        class="h-4 w-4"
        :class="calloutStyles[block.tone].label"
        aria-hidden="true"
      />
      <p class="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em]" :class="calloutStyles[block.tone].label">
        {{ block.title }}
      </p>
    </div>
    <p class="mt-2 text-sm leading-7 text-ink-800">{{ block.text }}</p>
  </div>

  <dl v-else-if="block.type === 'terms'" class="grid gap-4 sm:grid-cols-2">
    <div v-for="term in block.items" :key="term.term" class="rounded-xl border border-paper-300 bg-white/40 p-4">
      <dt class="text-sm font-semibold text-ink-900">{{ term.term }}</dt>
      <dd class="mt-1.5 text-sm leading-6 text-ink-600">{{ term.def }}</dd>
    </div>
  </dl>
</template>
