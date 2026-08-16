const SPRITES = [
  "sonny",
  "lucy",
  "bertie",
  "charlie",
  "desi",
  "tippi",
  "bessie",
  "harry",
  "ivy",
  "kewpie",
  "waitress",
] as const;

const BACKGROUNDS = [
  "title",
  "bg-bar",
  "bg-alley",
  "bg-tenement",
  "bg-studio",
  "bg-club",
  "bg-hangar",
  "bg-dock",
  "bg-yacht",
  "bg-chase",
] as const;

export type Assets = {
  sprites: Record<string, HTMLCanvasElement>;
  bgs: Record<string, HTMLImageElement>;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Missing ${src}`));
    img.src = src;
  });
}

function isGreen(r: number, g: number, b: number): boolean {
  return g > 80 && g > r + 28 && g > b + 28;
}

function isPaper(r: number, g: number, b: number): boolean {
  return r > 232 && g > 232 && b > 232 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18;
}

export function keySprite(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = image;
  const seen = new Uint8Array(width * height);
  const q: number[] = [];

  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    if (isGreen(r, g, b) || isPaper(r, g, b)) {
      seen[i] = 1;
      q.push(i);
    }
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (q.length) {
    const i = q.pop()!;
    const o = i * 4;
    data[o + 3] = 0;
    const x = i % width;
    const y = (i / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    if (data[o + 3] && isGreen(data[o], data[o + 1], data[o + 2])) data[o + 3] = 0;
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}

export async function loadAssets(): Promise<Assets> {
  const sprites: Assets["sprites"] = {};
  const bgs: Assets["bgs"] = {};
  await Promise.all([
    ...SPRITES.map(async (name) => {
      const img = await loadImage(`/game/${name}.jpg`);
      sprites[name] = keySprite(img);
    }),
    ...BACKGROUNDS.map(async (name) => {
      bgs[name] = await loadImage(`/game/${name}.jpg`);
    }),
  ]);
  return { sprites, bgs };
}

export const THEME_BG: Record<string, string> = {
  bar: "bg-bar",
  alley: "bg-alley",
  tenement: "bg-tenement",
  studio: "bg-studio",
  club: "bg-club",
  hangar: "bg-hangar",
  dock: "bg-dock",
  yacht: "bg-yacht",
  streets: "bg-chase",
};
