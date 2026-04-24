# Intended AI pipeline

This document describes how we expect **ideas** to turn into **small shipped changes** in this repo using humans and tools (including Cursor Cloud).

## 1. Idea generation

- A short concept: core loop, controls, win/lose, and scope limits.
- Output should be small enough for one focused PR (one game or one factory improvement).

## 2. Cursor Cloud implementation

- Work happens on a **feature branch**, not `main`.
- The agent implements the scoped change (often under `games/<slug>/` or a small update to `src/` / docs).
- Commits stay logical; avoid unrelated refactors.

## 3. PR review

- Open a pull request with a clear summary, test steps, risks, and recommended follow-up.
- Reviewer checks scope, safety (no secrets, no accidental deploy config), and that the game or shell behaves as described.

## 4. Manual approval

- A human approves and merges when satisfied.
- Automated agents should **not** merge to `main` unless a task explicitly says so.

## Notes

- This pipeline is lightweight by design: many small experiments beat one large platform rewrite.
- Deployment and hosting are out of scope for this document until a future task adds them.
