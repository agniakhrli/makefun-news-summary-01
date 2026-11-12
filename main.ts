import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

interface Story {
  location: string;
  text: string;
  source: string;
}

const stories: Story[] = [
  {
    location: "Abu Dhabi",
    text: "Russia, Ukraine, and the US completed day two of peace talks in Abu Dhabi, agreeing in principle to a prisoner swap of up to 1,500 detainees from each side",
    source: "Reuters"
  },
  {
    location: "Antalya",
    text: "The COP31 climate summit opened in Antalya with a draft calling for 35% global electrification by 2035; the US remained absent for a second consecutive year",
    source: "Reuters"
  },
  {
    location: "Washington",
    text: "The US House of Representatives shelved an impeachment effort against Defense Secretary Pete Hegseth in a 211-204 vote",
    source: "BBC"
  },
  {
    location: "London",
    text: "A 41-year-old US Army officer serving with NATO's Allied Rapid Reaction Corps (ARRC) is in British custody on suspicion of espionage linked to Russia; he remains unnamed and uncharged, while the Kremlin denied involvement",
    source: "CNN"
  },
  {
    location: "Madrid",
    text: "Spain held its first general strike in 14 years over a national housing deficit estimated at 750,000 homes, as a snap general election was set for 29 November",
    source: "Reuters"
  },
  {
    location: "New York",
    text: "Anthropic priced its initial public offering at $70-78 per share, valuing the company up to ~$64 billion (~$1.4 trillion fully diluted), alongside a ~$26 billion private placement ahead of expected trading on 19 November",
    source: "CNBC"
  },
  {
    location: "Washington",
    text: "US October consumer price index rose 0.4% (+0.3% core), leaving a December Federal Reserve interest rate hike near fully priced by financial markets",
    source: "Reuters"
  },
  {
    location: "San Salvador",
    text: "Security forces from El Salvador and Haiti struck a 400 Mawozo gang headquarters; approximately 20 people were reported killed, though details remain unconfirmed",
    source: "BBC"
  },
  {
    location: "Kinshasa",
    text: "An ongoing Ebola outbreak in the Democratic Republic of the Congo has reached 11,042 cases and 5,387 deaths, with health officials identifying the Bundibugyo strain",
    source: "Reuters"
  },
  {
    location: "Seongnam",
    text: "A multi-vehicle crash involving 32 vehicles on a highway in Seongnam, South Korea, left 57 people injured, 9 of them seriously",
    source: "Yonhap"
  }
];

// Invariant checks
if (stories.length !== 10) {
  throw new Error(`Validation failed: Expected exactly 10 stories, found ${stories.length}`);
}

for (const s of stories) {
  if (!s.location || !s.text || !s.source) {
    throw new Error(`Validation failed: Story missing required fields: ${JSON.stringify(s)}`);
  }
}

const intro = "World news summary for Wednesday, 11 November 2026. ";
const formattedStories = stories.map(s => {
  const entry = `${s.text} (${s.source}).`;
  if (!entry.endsWith(`(${s.source}).`)) {
    throw new Error(`Validation failed: Story from ${s.source} improperly formatted.`);
  }
  return entry;
});

const summary = intro + formattedStories.join(" ");

// Strict Unicode code point count hard guard (<= 2000 code points)
const codePointCount = Array.from(summary).length;
if (codePointCount > 2000) {
  throw new Error(`Hard guard violated: Summary length ${codePointCount} code points exceeds 2000 maximum.`);
}

console.log(summary);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'entry.txt'), summary, 'utf8');
} catch (err) {
  // Fallback for local testing if /output is not writable
  const fallbackDir = 'out';
  mkdirSync(fallbackDir, { recursive: true });
  writeFileSync(join(fallbackDir, 'entry.txt'), summary, 'utf8');
}
