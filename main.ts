// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: one public post quoting or linking
// make.fun's make-your-own-bounty post, with a photo of its own attached,
// make.fun (or @makefunai) and a play code in its text. POST.json at the
// repository root names that post; this program hands its address to the
// house by copying POST.json to the output directory. Nothing written
// here is scored — the house reads the post's replies, reposts and
// quotes from X itself.
//
// Run outside the grader's container with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const PLACEHOLDER = 'PLACEHOLDER';

const sourcePath = join(BOT_DIR, 'POST.json');
const targetPath = join(OUTPUT_DIR, 'POST.json');

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  console.error(`POST.json could not be read from ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

let post: unknown;
try {
  post = JSON.parse(raw);
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post !== 'object' || post === null || typeof (post as { url?: unknown }).url !== 'string') {
  console.error('POST.json must be an object with a string "url" field.');
  process.exit(1);
}

const url = (post as { url: string }).url;

// The gate refuses a POST.json over 16384 bytes; fail fast instead of copying one.
if (raw.length > 16384) {
  console.error(`POST.json is ${raw.length} bytes, over the 16384-byte gate cap.`);
  process.exit(1);
}

if (url.includes(PLACEHOLDER)) {
  console.warn(
    'WARNING: POST.json still holds the PLACEHOLDER url — no real post has been named yet. ' +
      'This skeleton must NOT be submitted; replace the url with the real post address first.',
  );
} else {
  // A real post address must look like https://x.com/<handle>/status/<digits>
  // (twitter.com, www./mobile. prefixes and /i/web/status/<id> are read the same way).
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    console.error(`POST.json url is not a valid URL: ${url}`);
    process.exit(1);
  }
  const host = parsed.hostname.replace(/^(www\.|mobile\.)/, '');
  const match = parsed.pathname.match(/^\/[^/]+\/status\/(\d+)$/) ?? parsed.pathname.match(/^\/i\/web\/status\/(\d+)$/);
  if (parsed.protocol !== 'https:' || !['x.com', 'twitter.com'].includes(host) || !match) {
    console.error(
      `POST.json url is not an X post address (expected https://x.com/<handle>/status/<id>): ${url}`,
    );
    process.exit(1);
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(`POST.json could not be copied to ${targetPath}: ${(err as Error).message}`);
  process.exit(1);
}

// Verify the copy byte for byte — the house reads exactly what lands in /output.
const copied = readFileSync(targetPath, 'utf8');
if (copied !== raw) {
  console.error('Copied POST.json differs from the source; refusing to report success.');
  process.exit(1);
}

console.log(`POST.json copied to ${targetPath} (${raw.length} bytes, url: ${url})`);
