// news-summary-01: a deterministic, standard-library-only program that writes
// one summary of the world's news of Wednesday 11 November 2026 to
// /output/entry.txt. The sandbox has no network, so the finished summary is
// held in this repository and the program renders it in a fixed order.
// No dates, no randomness, no network calls: two runs write byte-identical
// output. The gate takes UTF-8 text of 1 to 2,000 characters, so the render
// drops the lowest-priority story and re-renders if it ever runs long.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARS = 2000;

type Story = { text: string; source: string };

const HEADER = 'World news, Wednesday 11 November 2026:';

// Stories in importance order, each verified against the named outlet on
// 11 November 2026 and written in our own words. The last ones are dropped
// first if the rendered text ever exceeds the gate's limit.
const STORIES: Story[] = [
  {
    text: "Russia, Ukraine and the US opened the second and last scheduled day of peace talks in Abu Dhabi, their first direct negotiations since February; Kyiv called day one 'constructive', a prisoner swap of up to 1,500 each was discussed, but territory remains the central obstacle.",
    source: 'Reuters',
  },
  {
    text: "World leaders began speeches at the COP31 climate summit in Antalya, where Türkiye is pushing to raise electricity's share of energy use to 35% by 2035; the US is absent for a second year.",
    source: 'Reuters',
  },
  {
    text: 'House Republicans voted 211-204 to send impeachment articles against Defence Secretary Pete Hegseth to committee, shelving the bid.',
    source: 'BBC',
  },
  {
    text: "A 41-year-old US Army officer assigned to NATO's Allied Rapid Reaction Corps remained in custody in Britain on suspicion of Russia-linked espionage; he has not been named or charged, and Moscow denies any link.",
    source: 'CNN',
  },
  {
    text: 'Spain held its first general strike in 14 years, as unions protested a housing crisis the central bank says leaves the country about 750,000 homes short, weeks before a snap election.',
    source: 'Reuters',
  },
  {
    text: 'Anthropic set a $70-$78 price range for its Nasdaq listing, seeking up to about $64bn at a fully diluted value of up to $1.4tn, plus a $26bn private placement, with trading expected on 19 November.',
    source: 'CNBC',
  },
  {
    text: 'US consumer prices rose 0.4% in October, above forecasts, with core inflation at 0.3% for a third month; a December Federal Reserve rise is near fully priced, and Governor Waller said a half-point move should be considered.',
    source: 'Reuters',
  },
  {
    text: "El Salvador's President Bukele said his troops, with Haitian police, destroyed the 400 Mawozo gang's headquarters near Port-au-Prince; reports of about 20 killed are unconfirmed.",
    source: 'BBC',
  },
  {
    text: 'Confirmed Ebola cases in DR Congo passed 11,000, with 5,387 deaths from the rare Bundibugyo strain, the second-largest outbreak on record.',
    source: 'Reuters',
  },
  {
    text: 'A bus crashed into 32 vehicles in Seongnam, South Korea, injuring 57 people, nine seriously.',
    source: 'Yonhap',
  },
];

function render(stories: Story[]): string {
  return [HEADER, ...stories.map((s) => `${s.text} (${s.source})`)].join(' ');
}

const stories = [...STORIES];
let out = render(stories);
while ([...out].length > MAX_CHARS && stories.length > 0) {
  stories.pop();
  out = render(stories);
}

const dir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'entry.txt'), out, 'utf8');
