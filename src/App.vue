<script setup>
import { computed, reactive, ref, watch } from 'vue'
import ConceptCard from './components/ConceptCard.vue'
import SignalButton from './components/SignalButton.vue'
import SlotPanel from './components/SlotPanel.vue'

const count = ref(3)
const step = ref(1)
const displayName = ref('Ada')
const focusMode = ref(false)
const signals = ref(0)
const lastSignal = ref('Waiting for a child event…')
const watchLog = ref([])

const profile = reactive({
  role: 'Vue explorer',
  online: true,
})

const doubled = computed(() => count.value * 2)
const statusLine = computed(() => `${displayName.value || 'Anonymous'} · ${profile.role}`)
const countMood = computed(() => {
  if (count.value >= 12) return 'Unreasonably productive'
  if (count.value >= 6) return 'Building momentum'
  return 'Just warming up'
})

watch(count, (next, previous) => {
  watchLog.value.unshift(`${previous} → ${next} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`)
  watchLog.value = watchLog.value.slice(0, 3)
})

function changeCount(direction) {
  count.value = Math.max(0, count.value + direction * step.value)
}

function receiveSignal(payload) {
  signals.value += 1
  lastSignal.value = `“${payload.label}” received at ${payload.sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
}
</script>

<template>
  <div class="grid-noise min-h-screen overflow-hidden bg-ink text-white">
    <div class="pointer-events-none fixed left-1/2 top-[-18rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-mint/12 blur-[130px]" />

    <nav class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
      <a href="#top" class="font-display text-sm font-bold tracking-tight text-white">
        <span class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-mint text-xs text-ink">V</span>
        Feature Lab
      </a>
      <div class="flex items-center gap-4 text-xs font-semibold text-white/50">
        <a href="#lab" class="hidden transition hover:text-white sm:block">The lab</a>
        <a href="https://vuejs.org" target="_blank" rel="noreferrer" class="rounded-full border border-white/15 px-4 py-2 transition hover:border-mint/60 hover:text-mint">Vue docs ↗</a>
      </div>
    </nav>

    <main id="top" class="relative z-[1] mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
      <section class="mb-20 grid items-end gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-3 py-1.5 text-xs font-bold text-mint">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
            Vue 3.5.41 · Vite 8 · Tailwind CSS 4
          </div>
          <h1 class="font-display max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[5.8rem]">
            Learn Vue by <span class="text-mint">touching</span> the machinery.
          </h1>
          <p class="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Seven small experiments. Change the inputs, fire the events, and watch Vue keep the interface in sync—without ceremonial boilerplate.
          </p>
          <a href="#lab" class="mt-9 inline-flex items-center gap-3 rounded-full bg-lime px-6 py-3 text-sm font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-white">
            Enter the lab <span aria-hidden="true">↓</span>
          </a>
        </div>

        <aside class="glass rounded-[2rem] border border-white/10 p-6">
          <div class="mb-8 flex items-center justify-between">
            <span class="font-mono text-xs text-mint">reactivity.status</span>
            <span class="rounded-full px-2.5 py-1 text-[0.65rem] font-bold" :class="profile.online ? 'bg-mint/15 text-mint' : 'bg-white/10 text-white/45'">
              {{ profile.online ? 'CONNECTED' : 'PAUSED' }}
            </span>
          </div>
          <div class="font-display text-5xl font-semibold tracking-tight text-white">{{ count }}</div>
          <div class="mt-2 text-sm text-white/45">state mutations observed</div>
          <div class="mt-8 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div class="h-full rounded-full bg-gradient-to-r from-mint to-lime transition-all duration-500" :style="{ width: `${Math.min(100, count * 7 + 8)}%` }" />
          </div>
        </aside>
      </section>

      <section id="lab" class="scroll-mt-8">
        <div class="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-mint">Interactive specimens</p>
            <h2 class="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Core concepts, minus the fog.</h2>
          </div>
          <p class="max-w-sm text-sm leading-6 text-white/40">Every card is live. Shared state means changes can ripple across multiple examples.</p>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <ConceptCard number="01" eyebrow="ref() + reactive()" title="Reactive state" description="Refs hold primitive values; reactive wraps an object. Vue tracks both and patches only what changed.">
            <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input v-model="displayName" aria-label="Display name" class="min-w-0 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-mint/60" placeholder="Your name">
              <button type="button" class="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/5" @click="profile.online = !profile.online">
                {{ profile.online ? 'Go offline' : 'Reconnect' }}
              </button>
            </div>
            <div class="mt-3 rounded-xl bg-black/20 px-4 py-3 font-mono text-xs text-white/60">
              <span class="code-token">state</span> = { name: '{{ displayName || 'Anonymous' }}', online: {{ profile.online }} }
            </div>
          </ConceptCard>

          <ConceptCard number="02" eyebrow="computed()" title="Derived values" description="Computed properties cache values and refresh automatically when their reactive dependencies change.">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl bg-black/20 p-4"><div class="text-xs text-white/40">count × 2</div><div class="font-display mt-2 text-3xl font-bold text-lime">{{ doubled }}</div></div>
              <div class="rounded-2xl bg-black/20 p-4"><div class="text-xs text-white/40">status</div><div class="mt-2 text-sm font-bold text-white">{{ countMood }}</div></div>
            </div>
            <p class="mt-3 truncate rounded-xl border border-white/8 px-4 py-2.5 text-xs text-white/55">{{ statusLine }}</p>
          </ConceptCard>

          <ConceptCard number="03" eyebrow="@click + v-model" title="Event handling" description="Declarative listeners call normal JavaScript functions. v-model keeps the step input synchronized.">
            <div class="flex items-center gap-3">
              <button type="button" aria-label="Decrease count" class="h-12 w-12 rounded-xl border border-white/15 text-xl transition hover:bg-white/8" @click="changeCount(-1)">−</button>
              <div class="min-w-20 flex-1 text-center font-display text-4xl font-bold text-white">{{ count }}</div>
              <button type="button" aria-label="Increase count" class="h-12 w-12 rounded-xl bg-mint text-xl font-bold text-ink transition hover:bg-lime" @click="changeCount(1)">+</button>
            </div>
            <label class="mt-4 flex items-center gap-3 text-xs text-white/45">
              Step
              <input v-model.number="step" type="range" min="1" max="5" class="accent-mint flex-1">
              <output class="w-5 text-right font-mono text-mint">{{ step }}</output>
            </label>
          </ConceptCard>

          <ConceptCard number="04" eyebrow="watch()" title="Side-effect observer" description="A watcher reacts to state changes when you need a side effect—not another display value.">
            <div class="space-y-2">
              <div v-if="watchLog.length === 0" class="rounded-xl border border-dashed border-white/15 px-4 py-5 text-center text-sm text-white/35">Change the counter to create a log.</div>
              <div v-for="(entry, index) in watchLog" :key="entry" class="flex items-center gap-3 rounded-xl bg-black/20 px-4 py-3 text-xs" :class="index ? 'text-white/40' : 'text-white/75'">
                <span class="h-1.5 w-1.5 rounded-full" :class="index ? 'bg-white/20' : 'bg-mint'" />{{ entry }}
              </div>
            </div>
          </ConceptCard>

          <ConceptCard number="05" eyebrow="props + emits" title="Component contract" description="The parent passes typed props down. The child sends an event payload up—predictable one-way data flow.">
            <SignalButton label="Dispatch signal" :count="signals" @signal="receiveSignal" />
            <p class="mt-3 min-h-8 rounded-xl bg-black/20 px-4 py-3 text-xs leading-5 text-white/50">{{ lastSignal }}</p>
          </ConceptCard>

          <ConceptCard number="06" eyebrow="named + default slots" title="Composable slots" description="Slots let a parent inject content into stable child-component layout regions.">
            <SlotPanel :tone="focusMode ? 'lime' : 'mint'">
              <template #title>{{ focusMode ? 'Focus mode' : 'Open workspace' }}</template>
              <p>The wrapper owns the frame; this sentence is supplied by the parent.</p>
              <template #footer>
                <button type="button" class="font-bold text-mint transition hover:text-lime" @click="focusMode = !focusMode">Toggle slotted state →</button>
              </template>
            </SlotPanel>
          </ConceptCard>

          <ConceptCard number="07" eyebrow="the system" title="One state graph, many views" description="A single counter powers the hero telemetry, computed output, watcher history, and controls below." wide>
            <div class="grid gap-3 sm:grid-cols-3">
              <div v-for="metric in [{ label: 'Source state', value: count }, { label: 'Computed ×2', value: doubled }, { label: 'Watch entries', value: watchLog.length }]" :key="metric.label" class="rounded-2xl border border-white/8 bg-black/20 p-4">
                <div class="text-xs text-white/35">{{ metric.label }}</div>
                <div class="font-display mt-2 text-2xl font-bold text-white">{{ metric.value }}</div>
              </div>
            </div>
          </ConceptCard>
        </div>
      </section>
    </main>

    <footer class="relative z-[1] border-t border-white/8 px-5 py-8 text-center text-xs text-white/35">
      Built with Vue's Composition API · Inspect, change, repeat.
    </footer>
  </div>
</template>
