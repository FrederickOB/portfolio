import { getAdinkraIcons } from "@/lib/adinkra";

/**
 * The Adinkra symbols the site already ships, with what each one means and
 * where it appears in the gallery.
 */

export type SymbolId =
  | "adwo"
  | "gyeNyame"
  | "akofena"
  | "ananseNtontan"
  | "eseNeTekrema"
  | "hyeWonHye"
  | "mateMasie"
  | "nyameBiribiWoSoro"
  | "nyameDua";

export interface AdinkraSymbol {
  /** Position in getAdinkraIcons. */
  index: number;
  name: string;
  translation: string;
  meaning: string;
  /** Where it marks something in the gallery, if anywhere. */
  role?: string;
}

export const SYMBOLS: Record<SymbolId, AdinkraSymbol> = {
  adwo: {
    index: 0,
    name: "Adwo",
    translation: "Peace",
    meaning: "Peace, calm and tranquillity.",
    role: "On the reception desk, as a welcome.",
  },
  gyeNyame: {
    index: 1,
    name: "Gye Nyame",
    translation: "Except for God",
    meaning: "The supremacy of God; the best known of all Adinkra.",
    role: "Set into the lobby floor.",
  },
  akofena: {
    index: 2,
    name: "Akofena",
    translation: "Sword of war",
    meaning: "Courage, valour and heroism.",
  },
  ananseNtontan: {
    index: 3,
    name: "Ananse Ntontan",
    translation: "Spider’s web",
    meaning: "Wisdom, creativity and the complexities of life.",
    role: "Guards Interface, the frontend room.",
  },
  eseNeTekrema: {
    index: 4,
    name: "Ese Ne Tekrema",
    translation: "The teeth and the tongue",
    meaning: "Friendship and interdependence: two parts that work side by side and need each other.",
    role: "Marks the statement on why one person builds both interfaces and data.",
  },
  hyeWonHye: {
    index: 5,
    name: "Hye Won Hye",
    translation: "That which does not burn",
    meaning: "Endurance and imperishability.",
    role: "Guards the Hall of Achievements.",
  },
  mateMasie: {
    index: 6,
    name: "Mate Masie",
    translation: "What I hear, I keep",
    meaning: "Wisdom, knowledge and prudence.",
    role: "Guards Signal, the data room.",
  },
  nyameBiribiWoSoro: {
    index: 7,
    name: "Nyame Biribi Wo Soro",
    translation: "God is in the heavens",
    meaning: "Hope.",
  },
  nyameDua: {
    index: 8,
    name: "Nyame Dua",
    translation: "God’s tree",
    meaning: "God’s presence and protection.",
  },
};

export const SYMBOL_IDS = Object.keys(SYMBOLS) as SymbolId[];

/**
 * One symbol as an SVG image. Each symbol is drawn in the top-left 24 units of
 * a 64-unit pattern tile, so cropping the view to that square centres it.
 */
export function symbolSvg(id: SymbolId, color: string, size = 512) {
  return getAdinkraIcons(color.replace("#", ""), "1")[SYMBOLS[id].index].replace(
    "width='100%25' height='100%25'",
    `width='${size}' height='${size}' viewBox='0 0 24 24'`,
  );
}
