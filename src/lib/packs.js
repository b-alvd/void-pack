import { RARITIES, getBooster } from "@/src/data/boosters";

export function rollCard(boosterId) {
  const booster = getBooster(boosterId);
  if (!booster || !booster.pool?.length) return null;

  const weighted = booster.pool.map((c) => ({
    card: c,
    weight: RARITIES[c.rarity]?.weight ?? 1,
  }));
  const total = weighted.reduce((s, w) => s + w.weight, 0);
  let r = Math.random() * total;
  for (const { card, weight } of weighted) {
    r -= weight;
    if (r <= 0) return card;
  }
  return weighted[weighted.length - 1].card;
}
