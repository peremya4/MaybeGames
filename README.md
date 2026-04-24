# MaybeGames

Small browser-playable game prototypes and light factory tooling.

## Quick start

```bash
npm run start
```

Then open [http://localhost:3000/src/index.html](http://localhost:3000/src/index.html) or go straight to [Reflex Dodge](games/reflex-dodge/index.html).

You can also open `src/index.html` from disk in a browser; links use relative paths.

## Validation

```bash
npm run check
```

Verifies required files and basic HTML invariants (no paid APIs).

## Layout

| Path | Purpose |
|------|---------|
| `src/` | Home / hub page |
| `games/<slug>/` | Individual games |
| `docs/` | Agent worklog, pipeline notes |
| `scripts/` | Local check scripts |

## Games

- [Reflex Dodge](games/reflex-dodge/) — dodge falling blocks, collect orbs.

See [games/README.md](games/README.md) for the catalog.

## Rules for agents

See [docs/agent-rules.md](docs/agent-rules.md).
