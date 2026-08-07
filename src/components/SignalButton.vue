<script setup>
const props = defineProps({
  label: { type: String, required: true },
  count: { type: Number, default: 0 },
})

const emit = defineEmits(['signal'])

function sendSignal() {
  emit('signal', { label: props.label, sentAt: new Date() })
}
</script>

<template>
  <button
    type="button"
    class="group flex w-full items-center justify-between rounded-2xl border border-mint/20 bg-mint/8 px-4 py-3 text-left transition hover:border-mint/55 hover:bg-mint/14 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
    @click="sendSignal"
  >
    <span>
      <span class="block text-sm font-bold text-white">{{ label }}</span>
      <span class="mt-0.5 block text-xs text-white/45">Child emits a structured payload</span>
    </span>
    <span class="rounded-full bg-mint px-3 py-1 font-display text-sm font-bold text-ink transition group-hover:scale-105">{{ count }}</span>
  </button>
</template>
