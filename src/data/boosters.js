export const RARITIES = {
  commune:    { label: "Commune",    weight: 60, color: "#9ca3af" },
  rare:       { label: "Rare",       weight: 25, color: "#38bdf8" },
  epique:     { label: "Épique",     weight: 12, color: "#a855f7" },
  legendaire: { label: "Légendaire", weight: 3,  color: "#f59e0b" },
};

export const BOOSTERS = [
    {
        id: "origins",
        name: "Void Origins",
        tagline: "Le commencement. Les cartes fondatrices du Void.",
        accent: "#7c3aed",
        cards: 8,
        rarity: "Commune → Légendaire",
        available: true,
        pool: [
            { id: "origins-01", name: "Éclat Primordial", rarity: "commune" },
            { id: "origins-02", name: "Poussière d'Origine", rarity: "commune" },
            { id: "origins-03", name: "Fragment Ancien", rarity: "commune" },
            { id: "origins-04", name: "Veilleur du Seuil", rarity: "rare" },
            { id: "origins-05", name: "Écho du Néant", rarity: "rare" },
            { id: "origins-06", name: "Gardien des Origines", rarity: "epique" },
            { id: "origins-07", name: "Coeur du Void", rarity: "epique" },
            { id: "origins-08", name: "Le Premier", rarity: "legendaire" },
        ],
    },
    {
        id: "nebulor",
        name: "Nebulor",
        tagline: "Une prophétie sommeillait au cœur de la forêt de Nebulor.",
        accent: "#22d3ee",
        cards: 18,
        rarity: "Rare → Mythique",
        available: true,
        pool: [
            { id: "nebula-01", name: "Brume Stellaire", rarity: "commune" },
            { id: "nebula-02", name: "Nuage d'Ions", rarity: "rare" },
            { id: "nebula-03", name: "Pulsar", rarity: "rare" },
            { id: "nebula-04", name: "Supernova", rarity: "epique" },
            { id: "nebula-05", name: "Trou de Ver", rarity: "epique" },
            { id: "nebula-06", name: "Naissance d'Étoile", rarity: "legendaire" },
        ],
    },
    {
        id: "tsukaka",
        name: "Tsukaka",
        tagline: "Au cœur du trou noir immonde de Tsukaka.",
        accent: "#ec4899",
        cards: 12,
        rarity: "Épique → Singulière",
        available: false,
        pool: [
            { id: "singularity-01", name: "Horizon des Événements", rarity: "epique" },
            { id: "singularity-02", name: "Disque d'Accrétion", rarity: "epique" },
            { id: "singularity-03", name: "Point de Non-Retour", rarity: "legendaire" },
            { id: "singularity-04", name: "La Singularité", rarity: "legendaire" },
        ],
    },
];

export function getBooster(id) {
  return BOOSTERS.find((b) => b.id === id) || null;
}
 
export function getCard(boosterId, cardId) {
  const b = getBooster(boosterId);
  return b?.pool.find((c) => c.id === cardId) || null;
}
