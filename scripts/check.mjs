#!/usr/bin/env node
/**
 * Lightweight repo validation: required paths, package.json parse,
 * reflex-dodge HTML references local assets only (no http(s) script src).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function need(rel, label = rel) {
  const p = resolve(root, rel);
  if (!existsSync(p)) errors.push(`Missing ${label}: ${rel}`);
  return p;
}

const required = [
  "README.md",
  "package.json",
  "src/index.html",
  "src/main.js",
  "src/styles.css",
  "games/README.md",
  "games/reflex-dodge/README.md",
  "games/reflex-dodge/index.html",
  "games/reflex-dodge/main.js",
  "games/reflex-dodge/styles.css",
  "docs/pipeline.md",
  "docs/agent-worklog.md",
  "scripts/check.mjs",
];

for (const rel of required) need(rel);

let pkg;
try {
  pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
} catch (e) {
  errors.push(`package.json: ${e.message}`);
}

if (pkg) {
  if (!pkg.scripts?.start) errors.push('package.json: missing scripts.start');
  if (!pkg.scripts?.check) errors.push('package.json: missing scripts.check');
}

const gameHtmlPath = resolve(root, "games/reflex-dodge/index.html");
if (existsSync(gameHtmlPath)) {
  const html = readFileSync(gameHtmlPath, "utf8");
  if (!html.includes('src="main.js"')) {
    errors.push("games/reflex-dodge/index.html: expected script src=\"main.js\"");
  }
  if (!html.includes('href="styles.css"')) {
    errors.push("games/reflex-dodge/index.html: expected link href=\"styles.css\"");
  }
  if (/src\s*=\s*["']https?:/i.test(html)) {
    errors.push("games/reflex-dodge/index.html: external script URL not allowed for check");
  }
}

const homeHtml = resolve(root, "src/index.html");
if (existsSync(homeHtml)) {
  const h = readFileSync(homeHtml, "utf8");
  if (!h.includes("games/reflex-dodge/index.html")) {
    errors.push('src/index.html: missing link to games/reflex-dodge/index.html');
  }
}

if (errors.length) {
  console.error("check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log("check ok: required files and basic invariants verified");
