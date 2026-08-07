# Vue Feature Lab

An interactive, responsive showcase of Vue 3's core features. The examples share live state so you can see refs, reactive objects, computed values, watchers, event handlers, component props/emits, and slots working together.

## Stack

- Vue 3.5.41 (latest stable when created)
- Vite 8.2.1
- Tailwind CSS 4.3.3 via the first-party Vite plugin
- Vitest, Vue Test Utils, and ESLint

## Run locally

Node.js 22 is recommended.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Other useful commands:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## Project structure

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages CI/CD
├── src/
│   ├── components/
│   │   ├── ConceptCard.vue       # Reusable demo-card shell using a default slot
│   │   ├── SignalButton.vue      # Props and custom event example
│   │   └── SlotPanel.vue         # Named, default, and fallback slots
│   ├── App.vue                   # All interactive concept demonstrations
│   ├── App.test.js               # Reactivity integration test
│   ├── main.js                   # Vue application entry point
│   └── style.css                 # Tailwind import, theme tokens, shared styles
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Deploy to GitHub Pages

The included workflow builds and publishes `dist` whenever `main` is pushed. Vite uses relative asset paths, so the output works at `https://krugou.github.io/vuejs/` without hard-coding a repository name.

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. Then commit and push:

```bash
git add .
git commit -m "feat: add interactive Vue feature showcase"
git push origin main
```

Follow the deployment under the repository's **Actions** tab. The workflow also supports a manual run through **Actions → Deploy to GitHub Pages → Run workflow**.
