# Reflex Dodge

## Concept

Arcade reflex game: you control a blue circle at the bottom of the playfield. Red blocks fall from above; green orbs drift down more slowly. Your score ticks up while you survive and jumps when you collect orbs. One hit from a red block ends the round.

## Controls

| Input | Action |
|-------|--------|
| `←` `→` or `A` `D` | Move left / right |
| `R` | Restart (any time) |
| **Restart** button | Restart after game over |

## How to run

From the repository root:

```bash
npm run start
```

Open `http://localhost:3000/games/reflex-dodge/index.html`, or open `games/reflex-dodge/index.html` directly in a browser (file://) — assets are relative.

From the hub: `src/index.html` links here.

## Implementation notes

- Plain **HTML/CSS/JS**, `<canvas>` for rendering, `requestAnimationFrame` loop.
- Difficulty ramps slightly with score (spawn rate and fall speed capped for readability).
- Best score is stored in `localStorage` under `reflex-dodge-best` when the environment allows it.

## Next improvements

- Touch drag / on-screen arrows for mobile.
- Brief invulnerability or shield pickup.
- Particle feedback on collect and hit.
- Pause (`P`) and mute toggle.
