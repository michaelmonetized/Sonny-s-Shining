#!/usr/bin/env python3
from collections import deque
from pathlib import Path

from PIL import Image

SRC = Path(
    "/Users/michael/.grok/sessions/%2FUsers%2Fmichael%2FProjects%2Fsonnys-shining/01a00a9d-e351-74c1-988e-8817bc558525/images"
)
DST = Path("/Users/michael/Projects/sonnys-shining/web/public/game")
DST.mkdir(parents=True, exist_ok=True)

SPRITES = {
    "1.jpg": "kewpie.png",
    "2.jpg": "lucy.png",
    "3.jpg": "sonny.png",
    "4.jpg": "bertie.png",
    "7.jpg": "bessie.png",
    "8.jpg": "harry.png",
    "9.jpg": "desi.png",
    "10.jpg": "waitress.png",
    "11.jpg": "tippi.png",
    "12.jpg": "charlie.png",
    "14.jpg": "ivy.png",
}

BACKGROUNDS = {
    "5.jpg": "title.jpg",
    "6.jpg": "bg-bar.jpg",
    "13.jpg": "bg-tenement.jpg",
    "15.jpg": "bg-studio.jpg",
    "16.jpg": "bg-club.jpg",
    "17.jpg": "bg-hangar.jpg",
    "18.jpg": "bg-alley.jpg",
    "19.jpg": "bg-chase.jpg",
    "20.jpg": "bg-yacht.jpg",
    "21.jpg": "bg-dock.jpg",
}


def is_green(r: int, g: int, b: int) -> bool:
    return g > 80 and g > r + 28 and g > b + 28


def is_paper(r: int, g: int, b: int) -> bool:
    return r > 232 and g > 232 and b > 232 and abs(r - g) < 18 and abs(g - b) < 18


def flood_key(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    pix = im.load()
    seen = [[False] * h for _ in range(w)]
    q = deque()

    def enqueue(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not seen[x][y]:
            r, g, b, a = pix[x, y]
            if a > 0 and (is_green(r, g, b) or is_paper(r, g, b)):
                seen[x][y] = True
                q.append((x, y))

    for x in range(w):
        enqueue(x, 0)
        enqueue(x, h - 1)
    for y in range(h):
        enqueue(0, y)
        enqueue(w - 1, y)

    while q:
        x, y = q.popleft()
        pix[x, y] = (0, 0, 0, 0)
        enqueue(x + 1, y)
        enqueue(x - 1, y)
        enqueue(x, y + 1)
        enqueue(x, y - 1)

    # second pass: leftover chroma green not connected to the edge
    for x in range(w):
        for y in range(h):
            r, g, b, a = pix[x, y]
            if a and is_green(r, g, b):
                pix[x, y] = (0, 0, 0, 0)

    return im


def crop_alpha(im: Image.Image, pad: int = 12) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


for src_name, dest_name in SPRITES.items():
    keyed = crop_alpha(flood_key(Image.open(SRC / src_name)))
    keyed.save(DST / dest_name)
    print("sprite", dest_name, keyed.size)

for src_name, dest_name in BACKGROUNDS.items():
    im = Image.open(SRC / src_name).convert("RGB")
    im.save(DST / dest_name, quality=90)
    print("bg", dest_name, im.size)
