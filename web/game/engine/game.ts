import { CAMPAIGN, nextLevelId, type LevelId } from "../logic/campaign";
import { VIEW_H, VIEW_W, createWorld, tick } from "../logic/sim";
import type { World } from "../logic/types";
import {
  drawEnding,
  drawGameOver,
  drawIntro,
  drawMap,
  drawPause,
  drawTitle,
  drawWorld,
} from "../render/draw";
import { loadAssets, type Assets } from "./assets";
import { Tape } from "./audio";
import { Keys } from "./keys";

type Scene = "boot" | "title" | "intro" | "map" | "play" | "ending" | "gameover";

export class Game {
  readonly keys = new Keys();
  readonly tape = new Tape();
  assets: Assets | null = null;
  scene: Scene = "boot";
  sceneT = 0;
  introPage = 0;
  levelId: LevelId = "bertie";
  world: World | null = null;
  paused = false;
  private last = 0;
  private raf = 0;
  private unbind: (() => void) | null = null;


  constructor(private readonly canvas: HTMLCanvasElement) {}

  async start(): Promise<void> {
    this.unbind = this.keys.attach(window);
    this.assets = await loadAssets();
    this.scene = "title";
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.unbind?.();
    this.tape.stopJazz();
  }

  private loop(now: number): void {
    const dt = Math.min(48, now - this.last);
    this.last = now;
    this.sceneT += dt;
    this.step(dt);
    this.paint();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  private step(dt: number): void {
    const input = this.keys.frame();
    const start = input.start;
    if (this.scene === "title" && start) {
      this.tape.resume();
      this.tape.startJazz();
      this.tape.giggle();
      this.scene = "intro";
      this.introPage = 0;
      return;
    }
    if (this.scene === "intro" && start) {
      this.introPage += 1;
      if (this.introPage >= 4) this.scene = "map";
      return;
    }
    if (this.scene === "map" && start) {
      this.beginLevel(this.levelId);
      return;
    }
    if (this.scene === "ending" && start) {
      this.levelId = "bertie";
      this.scene = "title";
      return;
    }
    if (this.scene === "gameover" && start) {
      this.scene = "map";
      return;
    }
    if (this.scene === "play" && this.world) {
      if (this.keys.held("Escape") && !this.paused) {
        this.paused = true;
      }
      if (this.paused) {
        if (start) this.paused = false;
        return;
      }
      const prevHits = this.world.player.hp.hits;
      const prevScore = this.world.score.points;
      const prevPhase = this.world.phase;
      tick(this.world, input, dt);
      if (this.world.player.hp.hits < prevHits) this.tape.hurt();
      if (this.world.score.points > prevScore) {
        if (this.world.player.state === "catch") this.tape.catch(this.world.score.combo > 2);
        else this.tape.punch();
      }
      if (this.world.phase === "crash" && prevPhase !== "crash") this.tape.crash();
      if (this.world.phase === "clear") this.onClear();
      if (this.world.phase === "crash") this.onCrash();
      if (this.world.phase === "gameover") {
        this.scene = "gameover";
      }
    }
  }

  private beginLevel(id: LevelId): void {
    const carry = this.world;
    const alive = (carry?.lives ?? 0) > 0 && this.scene !== "gameover";
    this.levelId = id;
    this.world = createWorld(id, {
      lives: alive ? carry!.lives : 3,
      score: alive ? carry!.score : undefined,
      launcher: CAMPAIGN.findIndex((l) => l.id === id) > 4,
    });
    this.scene = "play";
    this.paused = false;
    this.tape.giggle();
  }

  private onClear(): void {
    const next = nextLevelId(this.levelId);
    if (next === "ending") {
      this.scene = "ending";
      this.tape.giggle();
      return;
    }
    this.levelId = next;
    this.scene = "map";
  }

  private onCrash(): void {
    if (this.sceneT < 0) return;
    if (!this.world || this.world.chaseTime < 16800) return;
    this.levelId = "harry";
    this.beginLevel("harry");
  }

  private paint(): void {
    const ctx = this.canvas.getContext("2d");
    const assets = this.assets;
    if (!ctx || !assets) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (this.scene === "boot") {
      ctx.fillStyle = "#100c0a";
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      ctx.fillStyle = "#c9a55a";
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.fillText("Loading the city…", VIEW_W / 2, VIEW_H / 2);
      return;
    }
    if (this.scene === "title") return drawTitle(ctx, assets, this.sceneT);
    if (this.scene === "intro") return drawIntro(ctx, assets, this.introPage);
    if (this.scene === "map") return drawMap(ctx, this.levelId, this.sceneT);
    if (this.scene === "ending") return drawEnding(ctx, assets, this.sceneT);
    if (this.scene === "gameover") return drawGameOver(ctx, this.world?.score.points ?? 0);
    if (this.world) {
      drawWorld(ctx, this.world, assets, this.sceneT);
      if (this.paused) drawPause(ctx);
    }
  }
}

export { VIEW_H, VIEW_W };
