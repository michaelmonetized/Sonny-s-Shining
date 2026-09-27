export const MINOR_HITS_PER_SEGMENT = 3;

export type Health = {
  hits: number;
  maxHits: number;
  segments: number;
  maxSegments: number;
};

function pack(hits: number, maxHits: number, maxSegments: number): Health {
  return {
    hits,
    maxHits,
    maxSegments,
    segments: Math.ceil(hits / MINOR_HITS_PER_SEGMENT),
  };
}

export function createHealth(segments: number): Health {
  const maxHits = segments * MINOR_HITS_PER_SEGMENT;
  return pack(maxHits, maxHits, segments);
}

export function applyDamage(hp: Health, amount: number): Health {
  return pack(Math.max(0, hp.hits - amount), hp.maxHits, hp.maxSegments);
}

export function heal(hp: Health, amount: number): Health {
  return pack(Math.min(hp.maxHits, hp.hits + amount), hp.maxHits, hp.maxSegments);
}

export function isDead(hp: Health): boolean {
  return hp.hits <= 0;
}
