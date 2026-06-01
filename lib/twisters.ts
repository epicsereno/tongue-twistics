import type { Category, TwisterEntry } from "@/types/game";

export const CATEGORIES: Category[] = [
  { id: "s-slaps", name: "S-SLAPS", emoji: "🐍", color: "#00ff88" },
  { id: "p-pack", name: "P-PACK", emoji: "🔥", color: "#ff6b35" },
  { id: "b-bang", name: "B-BANG", emoji: "💣", color: "#ff3366" },
  { id: "th-thrash", name: "TH-THRASH", emoji: "⚡", color: "#a855f7" },
  { id: "sh-shock", name: "SH-SHOCK", emoji: "💥", color: "#facc15" },
];

export const VALUES = [100, 250, 500, 750, 1000];

// time limits in seconds per value tier
const TIME_BY_VALUE: Record<number, number> = {
  100: 30,
  250: 25,
  500: 20,
  750: 15,
  1000: 12,
};

const RAW_TWISTERS: Omit<TwisterEntry, "timeLimit">[] = [
  // S-SLAPS
  { id: "s-100", categoryId: "s-slaps", value: 100, text: "She sells seashells by the seashore" },
  { id: "s-250", categoryId: "s-slaps", value: 250, text: "Six slippery snails slid slowly seaward" },
  { id: "s-500", categoryId: "s-slaps", value: 500, text: "Silly Sally swiftly shooed seven silly sheep" },
  { id: "s-750", categoryId: "s-slaps", value: 750, text: "Susie saw sixty-six slimy snakes sitting sadly somewhere south" },
  { id: "s-1000", categoryId: "s-slaps", value: 1000, text: "Selfish shellfish sell singular shells, surely some shellfish seem shady" },

  // P-PACK
  { id: "p-100", categoryId: "p-pack", value: 100, text: "Peter Piper picked a peck of pickled peppers" },
  { id: "p-250", categoryId: "p-pack", value: 250, text: "Pink pigs pranced past purple pansies" },
  { id: "p-500", categoryId: "p-pack", value: 500, text: "Proper copper coffee pot" },
  { id: "p-750", categoryId: "p-pack", value: 750, text: "Peppered pickled peppers please the puzzled piper perpetually" },
  { id: "p-1000", categoryId: "p-pack", value: 1000, text: "Proud peacocks parade past perfectly painted porches producing peculiar patterns" },

  // B-BANG
  { id: "b-100", categoryId: "b-bang", value: 100, text: "Betty Botter bought some butter" },
  { id: "b-250", categoryId: "b-bang", value: 250, text: "Black bears bite big blue berries boldly" },
  { id: "b-500", categoryId: "b-bang", value: 500, text: "Busy bees buzz between bright blooming blossoms" },
  { id: "b-750", categoryId: "b-bang", value: 750, text: "Biff boldly broke both brown and blue bottles before breakfast" },
  { id: "b-1000", categoryId: "b-bang", value: 1000, text: "Big black bears bathe by babbling brooks blowing bubbles brilliantly backwards" },

  // TH-THRASH
  { id: "th-100", categoryId: "th-thrash", value: 100, text: "The thirty-three thieves thought that they thrilled the throne" },
  { id: "th-250", categoryId: "th-thrash", value: 250, text: "Three free throws through thick threads" },
  { id: "th-500", categoryId: "th-thrash", value: 500, text: "Theo threw three thousand thoughtful things through the theater" },
  { id: "th-750", categoryId: "th-thrash", value: 750, text: "Thirteen thin thirsty thoughts thrashed thoroughly through the Thursday thunder" },
  { id: "th-1000", categoryId: "th-thrash", value: 1000, text: "The thoughtful thriller threw thirty-three thick threads through the thick thorny thicket" },

  // SH-SHOCK
  { id: "sh-100", categoryId: "sh-shock", value: 100, text: "She should show shiny shoes to shy sheep" },
  { id: "sh-250", categoryId: "sh-shock", value: 250, text: "Shallow ships ship fresh shrimp sharply" },
  { id: "sh-500", categoryId: "sh-shock", value: 500, text: "Should she show shorter shots or shrink shady shadows" },
  { id: "sh-750", categoryId: "sh-shock", value: 750, text: "Shelly shifted shiny shelves shaking shockingly short shrubbery sharply" },
  { id: "sh-1000", categoryId: "sh-shock", value: 1000, text: "She shed sheer shimmer shirts shoreside showing shockingly shallow shallow shell shelters" },
];

export const TWISTERS: TwisterEntry[] = RAW_TWISTERS.map((t) => ({
  ...t,
  timeLimit: TIME_BY_VALUE[t.value],
}));
