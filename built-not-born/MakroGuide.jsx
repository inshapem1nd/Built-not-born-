import { useState } from "react";

/**
 * Makro-Guide Komponente für Built Not Born Blueprint
 * -----------------------------------------------------
 * Zeigt eine einfache, sofort ablesbare Makro-Tabelle ohne Rechner.
 * Der Nutzer wählt: Ziel (Abnehmen/Aufbauen) + Aktivitätslevel (Wenig/Moderat/Viel)
 * -> Liste passt sich an, kein Scrollen/Swipen nötig (Hochformat-optimiert).
 *
 * Einbindung in Antigravity: einfach in die bestehende Blueprint-Seite
 * importieren, z.B. <MakroGuide /> unterhalb der bisherigen Ernährungs-Inhalte.
 * Farben/Fonts unten sind Platzhalter im Nike-inspired Dark-Stil, an das
 * bestehende Blueprint-Designsystem anpassen (Tailwind-Klassen ggf. ersetzen).
 */

// Datenbasis: kcal, Protein(g), Fett(g), Kohlenhydrate(g) pro Gewichtsklasse
const DATA = {
  abnehmen: {
    label: "Abnehmen",
    fettProzent: 22,
    rows: [
      { gewicht: "50–60 kg", protein: 110, wenig: { kcal: 1216, fett: 30, kh: 127 }, moderat: { kcal: 1430, fett: 35, kh: 169 }, viel: { kcal: 1645, fett: 40, kh: 211 } },
      { gewicht: "60–70 kg", protein: 130, wenig: { kcal: 1437, fett: 35, kh: 150 }, moderat: { kcal: 1690, fett: 41, kh: 200 }, viel: { kcal: 1944, fett: 48, kh: 249 } },
      { gewicht: "70–80 kg", protein: 150, wenig: { kcal: 1658, fett: 41, kh: 173 }, moderat: { kcal: 1950, fett: 48, kh: 230 }, viel: { kcal: 2243, fett: 55, kh: 288 } },
      { gewicht: "80–90 kg", protein: 170, wenig: { kcal: 1879, fett: 46, kh: 197 }, moderat: { kcal: 2210, fett: 54, kh: 261 }, viel: { kcal: 2542, fett: 62, kh: 326 } },
      { gewicht: "90–100 kg", protein: 190, wenig: { kcal: 2100, fett: 51, kh: 220 }, moderat: { kcal: 2470, fett: 60, kh: 292 }, viel: { kcal: 2841, fett: 69, kh: 364 } },
    ],
  },
  aufbauen: {
    label: "Aufbauen",
    fettProzent: 27,
    rows: [
      { gewicht: "50–60 kg", protein: 120, wenig: { kcal: 1636, fett: 49, kh: 179 }, moderat: { kcal: 1925, fett: 58, kh: 231 }, viel: { kcal: 2214, fett: 66, kh: 284 } },
      { gewicht: "60–70 kg", protein: 140, wenig: { kcal: 1934, fett: 58, kh: 213 }, moderat: { kcal: 2275, fett: 68, kh: 275 }, viel: { kcal: 2616, fett: 78, kh: 338 } },
      { gewicht: "70–80 kg", protein: 165, wenig: { kcal: 2231, fett: 67, kh: 242 }, moderat: { kcal: 2625, fett: 79, kh: 314 }, viel: { kcal: 3019, fett: 91, kh: 386 } },
      { gewicht: "80–90 kg", protein: 185, wenig: { kcal: 2529, fett: 76, kh: 277 }, moderat: { kcal: 2975, fett: 89, kh: 358 }, viel: { kcal: 3421, fett: 103, kh: 439 } },
      { gewicht: "90–100 kg", protein: 205, wenig: { kcal: 2826, fett: 85, kh: 311 }, moderat: { kcal: 3325, fett: 100, kh: 402 }, viel: { kcal: 3824, fett: 115, kh: 493 } },
    ],
  },
};

const LEVELS = [
  { key: "wenig", label: "Wenig" },
  { key: "moderat", label: "Moderat" },
  { key: "viel", label: "Viel" },
];

export default function MakroGuide() {
  const [ziel, setZiel] = useState("abnehmen");
  const [level, setLevel] = useState("moderat");

  const zielData = DATA[ziel];

  return (
    <section className="w-full max-w-md mx-auto bg-neutral-950 text-white rounded-2xl p-5 space-y-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Makro-Guide</h2>
        <p className="text-sm text-neutral-400">
          Finde dein Gewicht, wähle dein Aktivitätslevel — fertig.
        </p>
      </div>

      {/* Ziel-Auswahl: Abnehmen / Aufbauen */}
      <div className="flex gap-2">
        {Object.entries(DATA).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setZiel(key)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
              ziel === key
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Aktivitätslevel: Wenig / Moderat / Viel */}
      <div className="flex gap-2">
        {LEVELS.map((l) => (
          <button
            key={l.key}
            onClick={() => setLevel(l.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${
              level === l.key
                ? "bg-emerald-500 text-black"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Ergebnis-Liste, im Hochformat gestapelt, kein horizontales Scrollen */}
      <div className="space-y-3">
        {zielData.rows.map((row) => {
          const vals = row[level];
          return (
            <div
              key={row.gewicht}
              className="bg-neutral-900 rounded-xl p-4 border border-neutral-800"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-semibold text-sm">{row.gewicht}</span>
                <span className="text-xs text-neutral-400">{vals.kcal} kcal</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-base font-semibold">{row.protein}g</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wide">
                    Protein
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold">{vals.fett}g</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wide">
                    Fett
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold">{vals.kh}g</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wide">
                    Kohlenhydrate
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-neutral-500 leading-relaxed">
        Werte basieren auf Richtwerten für dein Ziel und Aktivitätslevel.
        Individuelle Abweichungen von ±10–15% sind normal — beobachte über
        2–3 Wochen und passe bei Bedarf an.
      </p>
    </section>
  );
}
