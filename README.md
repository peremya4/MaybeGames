# MaybeGames

Small **browser game factory**: this repository holds a static shell and isolated folders for many experimental games over time.

## View locally

**Option A — open the file**

Open `src/index.html` in your browser (double-click or drag into a window). This is enough for the home page.

**Option B — local server (recommended for future games)**

Some games may load assets with `fetch`; a local server avoids browser restrictions on `file://` URLs.

```bash
npm install
npm start
```

Then open the URL printed in the terminal (defaults to port `5173`).

## Layout

| Path | Purpose |
|------|---------|
| `src/` | Factory shell: home page and shared static assets |
| `games/` | One folder per game; see `games/README.md` |
| `docs/` | Process and agent notes |

## Contributing a game

Add `games/<game-slug>/` with a `README.md` and static entry (see `games/README.md`). Keep game code inside that folder unless you are intentionally sharing utilities.
