const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayDetail = document.getElementById("overlay-detail");
const restartBtn = document.getElementById("restart");

const W = canvas.width;
const H = canvas.height;

const STORAGE_KEY = "reflex-dodge-best";

/** @type {{ left: boolean, right: boolean }} */
const keys = { left: false, right: false };

let best = 0;
try {
  best = Math.max(0, Number(localStorage.getItem(STORAGE_KEY)) || 0);
} catch {
  best = 0;
}
bestEl.textContent = `Best: ${Math.floor(best)}`;

let running = false;
let lastTs = 0;
let spawnAcc = 0;
let orbAcc = 0;
let survivalAcc = 0;

/** Player circle */
const player = {
  r: 14,
  x: W / 2,
  y: H - 48,
  speed: 260,
};

/** @type {{ x: number, y: number, w: number, h: number, vy: number }[]} */
let hazards = [];
/** @type {{ x: number, y: number, r: number, vy: number }[]} */
let orbs = [];

let score = 0;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function resetGame() {
  hazards = [];
  orbs = [];
  score = 0;
  spawnAcc = 0;
  orbAcc = 0;
  survivalAcc = 0;
  player.x = W / 2;
  player.y = H - 48;
  overlay.classList.add("hidden");
  running = true;
  lastTs = 0;
  scoreEl.textContent = "Score: 0";
}

function gameOver(reason) {
  running = false;
  overlayTitle.textContent = "Game over";
  overlayDetail.textContent = reason;
  overlay.classList.remove("hidden");
  if (score > best) {
    best = score;
    try {
      localStorage.setItem(STORAGE_KEY, String(Math.floor(best)));
    } catch {
      /* ignore */
    }
    bestEl.textContent = `Best: ${Math.floor(best)}`;
  }
}

function circleRectOverlap(cx, cy, cr, rx, ry, rw, rh) {
  const nx = Math.max(rx, Math.min(cx, rx + rw));
  const ny = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - nx;
  const dy = cy - ny;
  return dx * dx + dy * dy < cr * cr;
}

function update(dt) {
  const difficulty = 1 + Math.min(2.2, score / 400);

  if (keys.left) player.x -= player.speed * dt;
  if (keys.right) player.x += player.speed * dt;
  player.x = Math.max(player.r, Math.min(W - player.r, player.x));

  survivalAcc += dt;
  if (survivalAcc >= 0.25) {
    survivalAcc -= 0.25;
    score += 1;
  }

  spawnAcc += dt;
  const spawnEvery = Math.max(0.45, 1.15 - difficulty * 0.18);
  if (spawnAcc >= spawnEvery) {
    spawnAcc -= spawnEvery;
    const w = rand(28, 56);
    hazards.push({
      x: rand(8, W - w - 8),
      y: -rand(20, 120),
      w,
      h: rand(18, 34),
      vy: rand(90, 150) * difficulty,
    });
  }

  orbAcc += dt;
  if (orbAcc >= rand(1.8, 3.2)) {
    orbAcc = 0;
    orbs.push({
      x: rand(20, W - 20),
      y: -20,
      r: 8,
      vy: rand(55, 95),
    });
  }

  for (const h of hazards) {
    h.y += h.vy * dt;
  }
  hazards = hazards.filter((h) => h.y < H + 80);

  for (const o of orbs) {
    o.y += o.vy * dt;
  }
  orbs = orbs.filter((o) => o.y < H + 40);

  for (const h of hazards) {
    if (circleRectOverlap(player.x, player.y, player.r, h.x, h.y, h.w, h.h)) {
      gameOver("A hazard hit you. Try again!");
      return;
    }
  }

  for (let i = orbs.length - 1; i >= 0; i--) {
    const o = orbs[i];
    const dx = o.x - player.x;
    const dy = o.y - player.y;
    if (dx * dx + dy * dy < (o.r + player.r) ** 2) {
      score += 15;
      orbs.splice(i, 1);
    }
  }

  scoreEl.textContent = `Score: ${Math.floor(score)}`;
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#141c2e");
  g.addColorStop(1, "#0a0e14");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  for (const h of hazards) {
    ctx.fillStyle = "#f85149";
    ctx.shadowColor = "rgba(248,81,73,0.45)";
    ctx.shadowBlur = 12;
    ctx.fillRect(h.x, h.y, h.w, h.h);
    ctx.shadowBlur = 0;
  }

  for (const o of orbs) {
    ctx.beginPath();
    ctx.fillStyle = "#3fb950";
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.fillStyle = "#58a6ff";
  ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(230,237,243,0.85)";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillText("Avoid red · grab green · R to restart", 12, 22);
}

function loop(ts) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min(0.05, (ts - lastTs) / 1000);
  lastTs = ts;

  if (running) update(dt);
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
  if (e.code === "KeyR") {
    e.preventDefault();
    resetGame();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
});

restartBtn.addEventListener("click", () => resetGame());

resetGame();
requestAnimationFrame(loop);
