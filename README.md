# Post-X Promote: Make Your Own Bounty

[![make.fun](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/badboy0771/post-x-promote-make-your-own-bounty-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/badboy0771/post-x-promote-make-your-own-bounty-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the [make.fun bounty "Promote make.fun's make-your-own-bounty post on X"](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01) — top 50 entries share $250.

## The entry is the post

One public post on X from [@pejuangwor22](https://x.com/pejuangwor22) that quotes
[make.fun's make-your-own-bounty post](https://x.com/makefunai/status/2124915864336236646),
with a photo of its own attached, the line
`Make your own bounty on @makefunai: https://make.fun/sponsor/new` and the play
code `makefun-delta-applause-cable` in its text. Places go by the post's score:
replies + reposts + quotes at the deadline (views and likes move nothing).

## What this repository holds

- `POST.json` — the post's address as `{"url": "https://x.com/<handle>/status/<id>"}`.
  **SKELETON STATUS: the url is still the `PLACEHOLDER` value.** Nanang has not
  posted the quote-post yet; the url will be replaced with the real post address
  before this entry is ever submitted. Do not submit this repository as it stands —
  the bounty allows only ONE entry in total.
- `main.ts` — the program (Node 22, standard library only). It reads `POST.json`,
  checks it parses and carries a string `url`, copies it to the output directory
  and prints a confirmation. It warns loudly while the url is still the placeholder.
- `AGENT.md` — the task in one page for the agent.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

It exits 0 and leaves `out/POST.json` identical to `POST.json`.
