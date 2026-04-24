# Pipeline

## Local development

1. Install Node.js 18+ (LTS recommended).
2. From the repository root: `npm run start` — serves the repo root on port 3000 (via `serve`).
3. Open `http://localhost:3000/src/index.html` for the home page, or `http://localhost:3000/games/reflex-dodge/index.html` for the game.

Alternatively open `src/index.html` or `games/reflex-dodge/index.html` directly from the file system; paths use relative URLs so both work.

## Mechanical validation

- `npm run check` — Node script that verifies required files exist, `package.json` scripts, and basic HTML invariants. No network or paid services.

## Continuous integration

- `.github/workflows/run-cursor-cloud-agent.yml` — scheduled / manual workflow for Cursor Cloud Agent queue. It is not a game build pipeline and does not run `npm run check` today.

## Future

- Optional: add a CI job on pull requests that runs `npm run check` after `npm install` (minimal `package.json` has no production dependencies).
