# Games folder

Each new prototype or small game lives in its **own directory** so work stays isolated and easy to review.

## Convention

1. **Path:** `games/<game-slug>/`
   - Use lowercase letters, digits, and hyphens only (example: `games/neon-snake/`).
2. **README:** Every game **must** include `games/<game-slug>/README.md` with:
   - One-line concept
   - Controls
   - How to run locally (e.g. open `index.html` or path under `serve`)
   - Implementation notes and ideas for next iteration
3. **Playable without backend:** Prefer static HTML/CSS/JS (or WASM) so `npm start` from the repo root and opening the game URL works without a custom server or API keys.

## Optional structure

There is no enforced internal layout inside a slug folder. A typical minimal game might look like:

```text
games/<game-slug>/
  README.md
  index.html
  main.js
  styles.css
```

Heavier tooling is allowed only when a task explicitly needs it; default to plain files.
