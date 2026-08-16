import { emptyInput, type InputFrame } from "../logic/input";

export class Keys {
  private down = new Set<string>();
  private just = new Set<string>();
  touch = emptyInput();
  tapStart = false;

  attach(target: Window | HTMLElement): () => void {
    const onDown = (e: Event) => {
      const ev = e as KeyboardEvent;
      if (!this.down.has(ev.code)) this.just.add(ev.code);
      this.down.add(ev.code);
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(ev.code)) {
        ev.preventDefault();
      }
    };
    const onUp = (e: Event) => this.down.delete((e as KeyboardEvent).code);
    const onBlur = () => {
      this.down.clear();
      this.just.clear();
    };
    target.addEventListener("keydown", onDown);
    target.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      target.removeEventListener("keydown", onDown);
      target.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }

  held(code: string): boolean {
    return this.down.has(code);
  }

  frame(): InputFrame {
    const left = this.held("KeyA") || this.held("ArrowLeft");
    const right = this.held("KeyD") || this.held("ArrowRight");
    const up = this.held("KeyW") || this.held("ArrowUp");
    const down = this.held("KeyS") || this.held("ArrowDown");
    const start = this.just.has("Enter") || this.just.has("Space") || this.touch.start || this.tapStart;
    const input: InputFrame = {
      moveX: clamp((right ? 1 : 0) - (left ? 1 : 0) + this.touch.moveX, -1, 1),
      moveY: clamp((down ? 1 : 0) - (up ? 1 : 0) + this.touch.moveY, -1, 1),
      light: this.held("KeyJ") || this.just.has("KeyJ") || this.held("Digit1") || this.touch.light,
      heavy: this.held("KeyK") || this.just.has("KeyK") || this.held("Digit2") || this.touch.heavy,
      towel: this.held("KeyQ") || this.held("KeyL") || this.touch.towel,
      dodge: this.held("Space") || this.just.has("Space") || this.held("ShiftLeft") || this.touch.dodge,
      special: this.held("KeyE") || this.just.has("KeyE") || this.held("KeyU") || this.touch.special,
      interact: this.held("KeyF") || this.just.has("KeyF") || this.held("KeyI") || this.touch.interact,
      start,
    };
    this.just.clear();
    this.tapStart = false;
    return input;
  }
}

function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}
