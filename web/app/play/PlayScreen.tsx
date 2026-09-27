"use client";

import Link from "next/link";
import { useEffect, useRef, type PointerEvent } from "react";
import { Game, VIEW_H, VIEW_W } from "../../game/engine/game";
import { MobilePad } from "./MobilePad";
import "./play.css";

export function PlayScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const fingers = useRef(new Set<number>());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    document.body.classList.add("playing");
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add("has-touch");
    }
    canvas.tabIndex = 0;
    canvas.focus();
    const game = new Game(canvas);
    gameRef.current = game;
    void game.start();
    return () => {
      game.destroy();
      document.body.classList.remove("playing");
      document.body.classList.remove("has-touch");
    };
  }, []);

  const onStageDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, .stick-ring, a")) return;
    fingers.current.add(e.pointerId);
    const game = gameRef.current;
    if (!game) return;
    if (fingers.current.size >= 2) {
      game.keys.touch = { ...game.keys.touch, dodge: true };
    } else {
      game.keys.tapStart = true;
    }
  };

  const onStageUp = (e: PointerEvent<HTMLDivElement>) => {
    fingers.current.delete(e.pointerId);
    const game = gameRef.current;
    if (!game) return;
    if (fingers.current.size < 2) {
      game.keys.touch = { ...game.keys.touch, dodge: false };
    }
  };

  return (
    <div className="play-root">
      <div className="play-frame">
        <div className="play-masthead">
          <Link href="/" className="play-back">
            ← Gazette
          </Link>
          <span>The Shining Gazette · Sporting Extra</span>
          <span className="play-live">LIVE</span>
        </div>
        <div
          className="play-stage"
          onPointerDown={onStageDown}
          onPointerUp={onStageUp}
          onPointerCancel={onStageUp}
        >
          <canvas
            ref={canvasRef}
            width={VIEW_W}
            height={VIEW_H}
            className="play-canvas"
            onContextMenu={(e) => e.preventDefault()}
          />
          <MobilePad gameRef={gameRef} />
        </div>
      </div>
    </div>
  );
}
