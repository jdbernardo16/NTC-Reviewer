<script setup lang="ts">
import { CircleAlert, Info, X } from '@lucide/vue'

withDefaults(
  defineProps<{
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    tone?: 'danger' | 'primary'
  }>(),
  {
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    tone: 'primary',
  },
)

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[90] flex items-end justify-center bg-ink-950/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.self="$emit('cancel')"
    >
      <div class="w-full max-w-md rounded-2xl bg-paper-50 p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3">
            <span
              class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              :class="tone === 'danger' ? 'bg-fail-100 text-fail-500' : 'bg-signal-100 text-signal-600'"
            >
              <CircleAlert v-if="tone === 'danger'" class="h-4 w-4" aria-hidden="true" />
              <Info v-else class="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 class="text-lg font-semibold leading-snug text-ink-950">{{ title }}</h2>
              <p class="mt-2 text-sm leading-6 text-ink-600">{{ description }}</p>
            </div>
          </div>
          <button
            type="button"
            class="shrink-0 text-ink-500 transition-colors hover:text-ink-900"
            aria-label="Close"
            @click="$emit('cancel')"
          >
            <X class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-paper-300 px-4 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-500 sm:py-2.5"
            @click="$emit('cancel')"
          >
            {{ cancelLabel }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors sm:py-2.5"
            :class="tone === 'danger' ? 'bg-fail-500 hover:bg-fail-500/90' : 'bg-signal-500 hover:bg-signal-600'"
            @click="$emit('confirm')"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
