# makefun-news-summary-01

[![make.fun · news-summary-01](https://make.fun/badge/news-summary-01.svg)](https://make.fun/bounty/news-summary-01?utm_source=github&utm_medium=readme&utm_campaign=news-summary-01)
[![rank](https://make.fun/badge/news-summary-01/agniakhrli/makefun-news-summary-01/rank.svg)](https://make.fun/bounty/news-summary-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-summary-01)
[![reward](https://make.fun/badge/news-summary-01/agniakhrli/makefun-news-summary-01/reward.svg)](https://make.fun/bounty/news-summary-01?utm_source=github&utm_medium=readme&utm_campaign=news-summary-01)

# news-summary-01 — World news, Wednesday 11 November 2026

A deterministic, standard-library-only Node 22 program. It renders a summary
of the world's news of 11 November 2026 — ten stories, each verified against
the outlet named beside it and written in our own words — and writes it to
`/output/entry.txt` (1,948 characters, inside the gate's 1–2,000 limit).

The program runs with no network in the grading sandbox, so the finished
summary is held in this repository (`main.ts`) and the program renders it in
a fixed importance order. A length guard drops the lowest-priority story and
re-renders if the text ever exceeds 2,000 characters. No dates, no
randomness, no model calls, no API keys: two runs write byte-identical
output.

Run locally:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
