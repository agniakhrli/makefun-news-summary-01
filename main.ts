import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

// 11 November 2026 World News Summary - 10 Verified Stories
const stories: string[] = [
  "1. Abu Dhabi: Russia, Ukraine, and the US completed day two of peace talks in Abu Dhabi, agreeing in principle to a prisoner swap of up to 1,500 detainees from each side. (Reuters)",
  "2. Antalya: The COP31 climate summit opened in Antalya with a draft calling for 35% global electrification by 2035; the US remained absent for a second consecutive year. (Reuters)",
  "3. Washington: The US House of Representatives shelved an impeachment effort against Defense Secretary Pete Hegseth in a 211–204 vote. (BBC)",
  "4. London: A 41-year-old US Army officer serving with NATO's Allied Rapid Reaction Corps (ARRC) is in British custody on suspicion of espionage linked to Russia; he remains unnamed and uncharged, while the Kremlin denied involvement. (CNN)",
  "5. Madrid: Spain held its first general strike in 14 years over a national housing deficit estimated at 750,000 homes, as a snap general election was set for 29 November. (Reuters)",
  "6. New York: Anthropic priced its initial public offering at $70–78 per share, valuing the company up to ~$64 billion (~$1.4 trillion fully diluted), alongside a ~$26 billion private placement ahead of expected trading on 19 November. (CNBC)",
  "7. Washington: US October consumer price index rose 0.4% (+0.3% core), leaving a December Federal Reserve interest rate hike near fully priced by financial markets. (Reuters)",
  "8. San Salvador: Security forces from El Salvador and Haiti struck a 400 Mawozo gang headquarters; approximately 20 people were reported killed, though details remain unconfirmed. (BBC)",
  "9. Kinshasa: An ongoing Ebola outbreak in the Democratic Republic of the Congo has reached 11,042 cases and 5,387 deaths, with health officials identifying the Bundibugyo strain. (Reuters)",
  "10. Seongnam: A multi-vehicle crash involving 32 vehicles on a highway in Seongnam, South Korea, left 57 people injured, 9 of them seriously. (Yonhap)"
];

const text = stories.join("\n\n");
const codePoints = Array.from(text).length;

// Hard story count guard: must be exactly 10 stories
if (stories.length !== 10) {
  throw new Error(`Expected exactly 10 stories, got ${stories.length}`);
}

// Hard character limit guard: must not exceed 2000 Unicode code points
if (codePoints > 2000) {
  throw new Error(`Summary text exceeds hard limit of 2000 Unicode code points: ${codePoints}`);
}

// Print summary to stdout
process.stdout.write(text + "\n");

// Write summary to output file for make.fun evaluation harness
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");
try {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf-8");
} catch (e) {
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    throw new Error(`Failed to write output to ${outputPath}: ${e instanceof Error ? e.message : e}`);
  }
  // Ignore filesystem error in environments without output directory permissions during local run
}
