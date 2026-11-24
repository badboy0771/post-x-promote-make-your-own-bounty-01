# Agent task: post-x-promote-make-your-own-bounty-01

Promote make.fun's make-your-own-bounty post on X
(https://x.com/makefunai/status/2124915864336236646). The entry is one public
X post quoting or linking that post, with a photo of its own, make.fun or
@makefunai and a play code in its text. Score = replies + reposts + quotes.

- `POST.json` names the post: `{"url": "https://x.com/<handle>/status/<id>"}`.
- `main.ts` (Node 22, stdlib only) copies `POST.json` to the output directory.
- Play code (verified from the server): `makefun-delta-applause-cable`.
- Bounty closes 27 Nov 2026 01:35 WIB; quota is TOTAL MAX 1 entry — never
  submit with the PLACEHOLDER url in `POST.json`.
- Run: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
