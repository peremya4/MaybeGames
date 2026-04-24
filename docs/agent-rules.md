# MaybeGames AI Game Factory Rules

These rules define how automated coding agents should work in this repository.

## Roles

- ChatGPT acts as technical lead, reviewer, planner, and task generator.
- Cursor Composer acts as implementation agent.
- The repository owner should only need to inspect final results and direction.

## Prime directive

Build small browser-playable games and reusable game-factory infrastructure. Optimize for many shippable prototypes, not one over-engineered platform.

## Repository safety

- Never merge directly to `main`.
- Always use a separate branch for implementation work.
- Avoid unrelated rewrites.
- Avoid touching deployment, account, authentication, billing, or private configuration areas unless the task explicitly asks for it.
- Do not delete existing work unless the task explicitly asks for it and the PR explains why.

## Branch and PR discipline

- Create a focused branch for each task.
- Commit logically.
- Push the branch.
- Open a PR whenever possible.
- The PR body must include:
  - Summary
  - Changed files / areas
  - How to test locally
  - Visual notes if UI changed
  - Known limitations
  - Risks
  - Recommended next task

## Scope control

- Follow the GitHub issue first.
- Do not invent a different product.
- Large tasks should be delivered as coherent milestones.
- Avoid broad refactors unless explicitly requested.
- Prefer plain HTML/CSS/JS for early prototypes unless the repo already uses a framework.
- Avoid heavy dependencies without a strong reason.

## Quality gates

Before finishing, run all reasonable checks available in the repository:

- `npm install` if needed
- `npm run lint` if available
- `npm test` if available
- `npm run build` if available
- manual static checks for browser games

Never claim a check passed unless it was actually run. If a check is missing, say so and suggest adding it. If a check fails, try to fix it; if it cannot be fixed, document the exact failure in the PR.

## Game design baseline

For each playable game prototype, ensure:

- clear objective within 5 seconds
- quick restart/reset
- visible score or progress
- fail/win condition where appropriate
- keyboard and/or touch-friendly controls where feasible
- no backend dependency unless explicitly required
- simple but coherent visual style

## Maintainability baseline

- Keep game-specific code inside `games/<game-slug>/`.
- Keep shared utilities in clearly named shared folders.
- Each game should have a `README.md` with concept, controls, run instructions, implementation notes, and next improvements.

## Reporting style

Be explicit and honest. When blocked, deliver the smallest useful partial result and explain the blocker.
