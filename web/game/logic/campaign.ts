export type LevelId =
  | "bertie"
  | "charlie"
  | "desi"
  | "tippi"
  | "bessie"
  | "chase"
  | "harry"
  | "ivy"
  | "kewpie";

export type LevelMode = "brawl" | "chase";

export type EnemyKind =
  | "waitress"
  | "rat"
  | "tenant"
  | "patron"
  | "bouncer"
  | "mechanic"
  | "docker"
  | "sailor";

export type ProjectileKind =
  | "bottle"
  | "cleaver"
  | "vase"
  | "stiletto"
  | "record"
  | "wrench"
  | "lamp"
  | "pin";

export type LevelDef = {
  id: LevelId;
  venue: string;
  boss: string;
  bossKind: string;
  fatality: string;
  mode: LevelMode;
  theme: string;
  width: number;
  waves: EnemyKind[][];
  projectile: ProjectileKind;
  intro: string;
  glimpse: string;
};

export const CAMPAIGN: LevelDef[] = [
  {
    id: "bertie",
    venue: "Bertie's Bustling Bubbles",
    boss: "Bertie",
    bossKind: "bertie",
    fatality: "TAKING OUT THE TRASH",
    mode: "brawl",
    theme: "bar",
    width: 3400,
    waves: [
      ["waitress", "waitress"],
      ["waitress", "waitress", "waitress"],
      ["waitress", "waitress", "waitress", "waitress"],
    ],
    projectile: "bottle",
    intro: "Midnight. Her hand leaves yours. The glasses aren't for toasting anymore.",
    glimpse: "A cream-tipped tail slips through the kitchen door.",
  },
  {
    id: "charlie",
    venue: "Charlie's Cracking Cantina",
    boss: "Charlie",
    bossKind: "charlie",
    fatality: "SURF AND TURF",
    mode: "brawl",
    theme: "alley",
    width: 3200,
    waves: [
      ["rat", "rat"],
      ["rat", "rat", "rat"],
      ["rat", "rat", "rat", "rat"],
    ],
    projectile: "cleaver",
    intro: "Cold air. Garbage. Her giggle fades down the bricks.",
    glimpse: "A silhouette dives through a door at the end of the alley.",
  },
  {
    id: "desi",
    venue: "Desi's Darling Dwellings",
    boss: "Desi",
    bossKind: "desi",
    fatality: "HE DIDN'T MAKE IT",
    mode: "brawl",
    theme: "tenement",
    width: 3000,
    waves: [
      ["tenant", "tenant"],
      ["tenant", "tenant", "tenant"],
      ["tenant", "tenant", "tenant", "tenant"],
    ],
    projectile: "vase",
    intro: "Keep it quiet down there!",
    glimpse: "She's on the roof, laughing at the moon.",
  },
  {
    id: "tippi",
    venue: "Tippi's Tantalizing Tango",
    boss: "Tippi",
    bossKind: "tippi",
    fatality: "EXIT, PURSUED BY GRAVITY",
    mode: "brawl",
    theme: "studio",
    width: 3100,
    waves: [
      ["patron", "patron"],
      ["patron", "patron", "patron"],
      ["patron", "patron", "patron", "patron"],
    ],
    projectile: "stiletto",
    intro: "Do you have an appointment?",
    glimpse: "Club music thumps through the floorboards.",
  },
  {
    id: "bessie",
    venue: "Bessie's Bouncing Ballroom",
    boss: "Bessie",
    bossKind: "bessie",
    fatality: "SPIN CYCLE",
    mode: "brawl",
    theme: "club",
    width: 3300,
    waves: [
      ["bouncer", "patron"],
      ["bouncer", "bouncer"],
      ["bouncer", "patron", "bouncer"],
    ],
    projectile: "record",
    intro: "She scoffs. The front door locks. She swallows the key.",
    glimpse: "The bowling-pin limo is already pulling away.",
  },
  {
    id: "chase",
    venue: "The Chase",
    boss: "The Tow Truck",
    bossKind: "truck",
    fatality: "WRONG TURN",
    mode: "chase",
    theme: "streets",
    width: 2400,
    waves: [],
    projectile: "pin",
    intro: "Out. You're driving.",
    glimpse: "The limo is always just ahead.",
  },
  {
    id: "harry",
    venue: "Harry's Holy Haulers",
    boss: "Harry",
    bossKind: "harry",
    fatality: "DISASSEMBLY REQUIRED",
    mode: "brawl",
    theme: "hangar",
    width: 3400,
    waves: [
      ["mechanic", "mechanic"],
      ["mechanic", "mechanic", "mechanic"],
      ["mechanic", "mechanic", "mechanic", "mechanic"],
    ],
    projectile: "wrench",
    intro: "Wrong place, wrong time, bowling boy.",
    glimpse: "Moonlight through a hole in the wall. The docks.",
  },
  {
    id: "ivy",
    venue: "Ivy's Illuminating Imports",
    boss: "Ivy",
    bossKind: "ivy",
    fatality: "LIT",
    mode: "brawl",
    theme: "dock",
    width: 3600,
    waves: [
      ["docker", "docker"],
      ["docker", "docker", "docker"],
      ["docker", "docker", "docker", "docker"],
    ],
    projectile: "lamp",
    intro: "Do you have any idea how much these are worth?",
    glimpse: "A yacht in the harbor. Bowling lanes on the deck.",
  },
  {
    id: "kewpie",
    venue: "Kewpie's Kicking Klipper",
    boss: "Kewpie",
    bossKind: "kewpie",
    fatality: "PERFECT 300",
    mode: "brawl",
    theme: "yacht",
    width: 3800,
    waves: [
      ["sailor", "sailor"],
      ["sailor", "sailor", "sailor"],
      ["sailor", "sailor", "sailor", "sailor"],
    ],
    projectile: "pin",
    intro: "Alright. Let's roll.",
    glimpse: "Red hair in a window. Then the engine room.",
  },
];

const BY_ID = new Map(CAMPAIGN.map((level) => [level.id, level]));

export function levelById(id: LevelId): LevelDef {
  const level = BY_ID.get(id);
  if (!level) throw new Error(`Unknown level: ${id}`);
  return level;
}

export function nextLevelId(id: LevelId): LevelId | "ending" {
  const i = CAMPAIGN.findIndex((level) => level.id === id);
  if (i < 0 || i === CAMPAIGN.length - 1) return "ending";
  return CAMPAIGN[i + 1].id;
}

export function fatalityTitle(id: LevelId): string {
  return levelById(id).fatality;
}
