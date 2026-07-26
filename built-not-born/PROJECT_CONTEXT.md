# Inshape Mind — Built Not Born Blueprint

## Was das hier ist

Das ist der **fertige, bereits live deployte** Kern-Produkt-Code — eine interaktive
React-App ("Built Not Born Blueprint"), die als bezahltes Digitalprodukt (9,99€)
über Gumroad verkauft wird.

**Diese App ist NICHT die Landingpage.** Die Landingpage ist ein separates Projekt
(gebaut in Antigravity), das VOR dieser App im Funnel sitzt:

```
TikTok Bio → Landingpage (Marketing/Mission, kein Kaufzwang)
           → Kauf-Button → Gumroad Checkout
           → nach Kauf: Zugangscode + Link zu dieser App (Blueprint)
```

## Aktueller Stand der App (dieses Projekt)

- **Stack:** Vite + React, gehostet auf Vercel, Code auf GitHub
- **Passwortschutz:** Die App ist mit einem Zugangscode geschützt
  (`Builtnotborn26`), der Zugriff wird nach Eingabe im `localStorage` gespeichert,
  damit Käufer sich nicht bei jedem Besuch neu einloggen müssen.
- **Inhalt:** 4 Themenbereiche — Abnehmen (Sèche/Cut), Aufbauen (Prise de Masse/Bulk),
  Ernährung (Nutrition), Mindset — jeweils mit 3 Unterabschnitten und
  je 2-3 Karten mit Erklärung + konkretem Aktionsschritt.
- **Sprachen:** Deutsch, Englisch, Spanisch, Französisch — vollständig übersetzt,
  umschaltbar über einen Sprachwähler oben in der App.
- **Rechner:** Eingebaute Kalorien-/Protein-Rechner (Mifflin-St-Jeor-Formel) in
  den Abnehmen- und Aufbauen-Bereichen, ebenfalls mehrsprachig.
- **Rechtliches:** Impressum und Datenschutzerklärung (Tyrone Kreim, Erkelenz,
  Kleinunternehmer §19 UStG) als eigene Unterseiten, verlinkt im Footer.
- **Markenidentität:** "Built Not Born" als Leitmotiv/Motto, Marke heißt
  "Inshape Mind". Design: dunkles Theme (#080808 Hintergrund), vier Akzentfarben
  je Themenbereich (Gelb #E8FF3B, Orange #FF6B35, Cyan #3BFFC8, Lila #B57BFF),
  Font "DM Sans".
- **Trust-Block:** Ein aufklappbarer "Über INSHAPE MIND" Abschnitt auf der
  Startseite mit persönlichem, aber weiterhin faceless gehaltenem Markentext.

## Wichtig für die Landingpage (Antigravity)

Die Landingpage soll:
1. Die Marke/Mission von Inshape Mind vermitteln (Bewegung statt reines Produkt)
2. Als drei Tabs aufgebaut sein: **Ernährung / Mindset / Sport**
   (keine lange Scroll-Seite, mobile-first)
3. Erst am Ende zu einem klaren, aber nicht aufdringlichen Call-to-Action
   Button führen (Kauf über Gumroad)
4. Farblich/stilistisch zur bestehenden App passen (siehe Design-Werte oben),
   damit der Übergang zwischen Landingpage → Gumroad → App stimmig wirkt
5. NICHT diese Blueprint.jsx App selbst verändern oder neu aufbauen —
   die Landingpage ist ein eigenständiges, separates Projekt

## Dateien in diesem Projekt

- `src/Blueprint.jsx` — die komplette bestehende App (Referenz für Design,
  Content-Ton, Struktur, Sprachlogik)
- `src/main.jsx` — Einstiegspunkt der bestehenden App
- `index.html`, `package.json`, `vite.config.js` — Projekt-Grundgerüst
