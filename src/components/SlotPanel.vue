<script setup>
defineProps({
  tone: { type: String, default: 'mint' },
})
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-white/10 bg-black/15">
    <header class="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full" :class="tone === 'lime' ? 'bg-lime' : 'bg-mint'" />
        <div class="text-sm font-semibold text-white"><slot name="title">Untitled panel</slot></div>
      </div>
      <span class="font-mono text-[0.65rem] text-white/35">#named-slot</span>
    </header>
    <div class="p-4 text-sm text-white/65">
      <slot />
    </div>
    <footer class="border-t border-white/10 px-4 py-2 text-xs text-white/35">
      <slot name="footer">Default fallback content</slot>
    </footer>
  </section>
</template>
