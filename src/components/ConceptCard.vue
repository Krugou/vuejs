<script setup>
defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
  eyebrow: { type: String, required: true },
  description: { type: String, required: true },
  wide: { type: Boolean, default: false },
})
</script>

<template>
  <article
    class="glass group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-mint/35 sm:p-7"
    :class="{ 'lg:col-span-2': wide }"
  >
    <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-mint/8 blur-3xl transition group-hover:bg-mint/15" />
    <header class="relative mb-6 flex items-start gap-4">
      <span class="font-display text-xs font-bold tracking-[0.2em] text-lime">{{ number }}</span>
      <div>
        <p class="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-mint">{{ eyebrow }}</p>
        <h2 class="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{{ title }}</h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-white/55">{{ description }}</p>
      </div>
    </header>
    <div class="relative">
      <slot />
    </div>
  </article>
</template>
