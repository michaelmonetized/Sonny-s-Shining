import type { Health } from "./health";
import type { ScoreState } from "./score";
import type { EnemyKind, LevelDef, ProjectileKind } from "./campaign";

export type Facing = 1 | -1;

export type ActorKind = "player" | "grunt" | "thrower" | "boss";

export type ActorState =
  | "idle"
  | "walk"
  | "attack"
  | "hurt"
  | "dodge"
  | "dead"
  | "catch"
  | "throw";

export type Actor = {
  id: string;
  kind: ActorKind;
  name: string;
  sprite: string;
  enemyKind?: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: Facing;
  hp: Health;
  state: ActorState;
  stateMs: number;
  invulnMs: number;
  attackCd: number;
  dodgeCd: number;
  radius: number;
  range: number;
  pendingHit: boolean;
  heavy: boolean;
};

export type Projectile = {
  id: string;
  kind: ProjectileKind;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  damage: number;
  catchable: boolean;
  returned: boolean;
  owner: string;
};

export type Pickup = {
  id: string;
  kind: "hotdog" | "pie";
  x: number;
  y: number;
  life: number;
};

export type Floater = {
  text: string;
  x: number;
  y: number;
  life: number;
  color: string;
};

export type WorldPhase =
  | "combat"
  | "boss"
  | "fatality"
  | "clear"
  | "chase"
  | "crash"
  | "gameover";

export type World = {
  level: LevelDef;
  phase: WorldPhase;
  timeMs: number;
  width: number;
  floorMin: number;
  floorMax: number;
  cameraX: number;
  player: Actor;
  actors: Actor[];
  projectiles: Projectile[];
  pickups: Pickup[];
  score: ScoreState;
  lives: number;
  waveIndex: number;
  special: number;
  launcherUnlocked: boolean;
  shake: number;
  slowMo: number;
  fatalityMs: number;
  messages: Floater[];
  chaseTime: number;
  traffic: { x: number; y: number; vx: number; lane: number }[];
  nextId: number;
};
