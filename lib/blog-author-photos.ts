/** Local team portraits used when blog author overrides omit `avatar`. */
const AUTHOR_PHOTO_BY_NAME: Record<string, string> = {
  "chris begealawuh": "/assets/Team/Dr-Chris-Begealawuh-1.webp",
  "ernest lequimboh": "/assets/Team/Ernest-Lequimboh.webp",
  "achai": "/assets/Team/Achai.webp",
  "achai kuol deng": "/assets/Team/Achai.webp",
  "richard a nyiawung": "/assets/Team/Rechard.webp",
  "richard nyiawung": "/assets/Team/Rechard.webp",
  "nfor christelle mugha": "/assets/Team/christelle.jpeg",
  "christelle nfor": "/assets/Team/christelle.jpeg",
  "roselyn ruvimbo kwaramba": "/assets/Team/Roselyn.webp",
  "tsion mengistu ademe": "/assets/Team/Tsion.webp",
  "maria ayuk": "/assets/authors/maria%20pp.jpeg",
  "solomon kimaita": "/assets/april/Solomon.webp",
};

function normalizeAuthorNameKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/,?\s*ph\.?d\.?/gi, "")
    .replace(/^dr\.?\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Prefer explicit `avatar`, then known team photo, else null (initials fallback). */
export function resolveAuthorPhoto(name: string, explicit?: string | null): string | null {
  const trimmed = explicit?.trim();
  if (trimmed) return trimmed;
  return AUTHOR_PHOTO_BY_NAME[normalizeAuthorNameKey(name)] ?? null;
}
