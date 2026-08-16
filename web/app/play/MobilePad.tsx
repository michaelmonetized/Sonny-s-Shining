"use client";

import { useRef, useState, type PointerEvent, type RefObject } from "react";
import type { Game } from "../../game/engine/game";
import type { InputFrame } from "../../game/logic/input";
import { stickFromPointer } from "../../game/logic/stick";

type Props = {
  gameRef: RefObject<Game | null>;
};

function write(game: Game | null, patch: Partial<InputFrame>): void {
  if (!game) return;
  game.keys.touch = { ...game.keys.touch, ...patch };
}

export function MobilePad({ gameRef }: Props) {
  const ringRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const [down, setDown] = useState<Record<string, boolean>>({});

  const pullStick = (clientX: number, clientY: number) => {
    const el = ringRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const radius = box.width / 2;
    const next = stickFromPointer(clientX - (box.left + radius), clientY - (box.top + radius), Math.max(1, radius - 8));
    setKnob(next);
    write(gameRef.current, { moveX: next.x, moveY: next.y });
  };

  const onStickDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    pullStick(e.clientX, e.clientY);
  };

  const onStickMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    pullStick(e.clientX, e.clientY);
  };

  const onStickUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setKnob({ x: 0, y: 0 });
    write(gameRef.current, { moveX: 0, moveY: 0 });
  };

  const hold = (key: keyof InputFrame) => ({
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDown((s) => ({ ...s, [key]: true }));
      const game = gameRef.current;
      if (key === "light" && game) game.keys.tapStart = true;
      write(game, { [key]: true });
    },
    onPointerUp: (e: PointerEvent<HTMLButtonElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDown((s) => ({ ...s, [key]: false }));
      write(gameRef.current, { [key]: false });
    },
    onPointerCancel: (e: PointerEvent<HTMLButtonElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setDown((s) => ({ ...s, [key]: false }));
      write(gameRef.current, { [key]: false });
    },
  });

  return (
    <div className="pad">
      <div
        ref={ringRef}
        className="stick-ring"
        onPointerDown={onStickDown}
        onPointerMove={onStickMove}
        onPointerUp={onStickUp}
        onPointerCancel={onStickUp}
      >
        <div
          className="stick-knob"
          style={{ transform: `translate(${knob.x * 34}px, ${knob.y * 34}px)` }}
        />
        <span className="pad-label">Move</span>
      </div>

      <div className="pad-actions">
        <button type="button" className={`pad-btn gold ${down.special ? "on" : ""}`} {...hold("special")}>
          Bowl
        </button>
        <button type="button" className={`pad-btn ${down.towel ? "on" : ""}`} {...hold("towel")}>
          Towel
        </button>
        <button type="button" className={`pad-btn ${down.dodge ? "on" : ""}`} {...hold("dodge")}>
          Dodge
        </button>
        <button type="button" className={`pad-btn ${down.heavy ? "on" : ""}`} {...hold("heavy")}>
          Heavy
        </button>
        <button type="button" className={`pad-btn punch ${down.light ? "on" : ""}`} {...hold("light")}>
          Punch
        </button>
      </div>
    </div>
  );
}
