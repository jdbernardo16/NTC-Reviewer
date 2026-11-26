<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-[0.7rem] bg-paper-50 text-ink-950"
    :class="sizeClass"
    aria-hidden="true"
  >
    <svg viewBox="0 0 40 40" fill="none" class="h-full w-full">
      <rect width="40" height="40" rx="11" fill="currentColor" />
      <path
        d="M10 22.5a14.2 14.2 0 0 1 20 0"
        stroke="var(--color-signal-500)"
        stroke-width="2.4"
        stroke-linecap="round"
        opacity="0.45"
      />
      <path
        d="M14 26a8.6 8.6 0 0 1 12 0"
        stroke="var(--color-signal-500)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <circle cx="20" cy="31" r="2.6" fill="var(--color-signal-500)" />
      <path d="M20 10v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25" />
    </svg>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    sizeClass?: string
  }>(),
  {
    sizeClass: 'h-10 w-10',
  },
)
</script>
