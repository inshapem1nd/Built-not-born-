import { useState, useEffect } from "react";
// ── CALCULATOR COMPONENTS ─────────────────────────────────────────────────
function CalcCut({ color, lang }) {
  const [form, setForm] = useState({ weight: "", height: "", age: "", sex: "m", activity: "1.55" });
  const [result, setResult] = useState(null);
  const labels = {
    DE: { title: " Dein persönlicher Rechner", w: "Gewicht (kg)", h: "Größe (cm)", a: "Alter", male: "Mann", female: "Frau", act: "Aktivität", calc: "BERECHNEN", tdee: "Täglicher Kalorienbedarf", deficit: "Dein Defizit-Ziel", protein: "Dein Proteinziel", proteinNote: "täglich zum Abnehmen", deficitNote: "für 0,5–1 kg Verlust/Woche", acts: ["Wenig Bewegung (Bürojob)", "Leicht aktiv (1–3x Sport/Woche)", "Moderat aktiv (3–5x/Woche)", "Sehr aktiv (6–7x/Woche)", "Extrem aktiv (2x täglich)"] },
    EN: { title: " Your personal calculator", w: "Weight (kg)", h: "Height (cm)", a: "Age", male: "Male", female: "Female", act: "Activity", calc: "CALCULATE", tdee: "Daily calorie needs", deficit: "Your deficit target", protein: "Your protein target", proteinNote: "daily for fat loss", deficitNote: "for 0.5–1 kg loss/week", acts: ["Sedentary (desk job)", "Lightly active (1–3x sport/week)", "Moderately active (3–5x/week)", "Very active (6–7x/week)", "Extremely active (2x daily)"] },
    ES: { title: " Tu calculadora personal", w: "Peso (kg)", h: "Altura (cm)", a: "Edad", male: "Hombre", female: "Mujer", act: "Actividad", calc: "CALCULAR", tdee: "Necesidad calórica diaria", deficit: "Tu objetivo de déficit", protein: "Tu objetivo de proteína", proteinNote: "diario para perder grasa", deficitNote: "para 0,5–1 kg pérdida/semana", acts: ["Sedentario (trabajo de oficina)", "Ligeramente activo (1–3x/semana)", "Moderadamente activo (3–5x/semana)", "Muy activo (6–7x/semana)", "Extremadamente activo (2x al día)"] },
    FR: { title: " Ton calculateur personnel", w: "Poids (kg)", h: "Taille (cm)", a: "Âge", male: "Homme", female: "Femme", act: "Activité", calc: "CALCULER", tdee: "Besoin calorique quotidien", deficit: "Ton objectif déficit", protein: "Ton objectif protéine", proteinNote: "quotidien pour perdre du gras", deficitNote: "pour 0,5–1 kg perte/semaine", acts: ["Sédentaire (bureau)", "Légèrement actif (1–3x sport/sem)", "Modérément actif (3–5x/sem)", "Très actif (6–7x/sem)", "Extrêmement actif (2x/jour)"] },
  };
  const L = labels[lang] || labels.EN;
  const actVals = ["1.2", "1.375", "1.55", "1.725", "1.9"];
  const calculate = () => {
    const w = parseFloat(form.weight), h = parseFloat(form.height), a = parseFloat(form.age);
    if (!w || !h || !a) return;
    const bmr = form.sex === "m"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * parseFloat(form.activity));
    const deficit = tdee - 400;
    const protein = Math.round(w * 1.8);
    setResult({ tdee, deficit, protein });
  };
  const inp = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14,
    fontFamily: "inherit", width: "100%", boxSizing: "border-box", outline: "none"
  };
  const labelStyle = { fontSize: 11, color: "#555", marginBottom: 5, display: "block", letterSpacing: "0.05em" };
  return (
    <div style={{ marginTop: 14, background: color + "08", border: `1px solid ${color}20`, borderRadius: 12, padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: color, marginBottom: 14 }}>{L.title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div>
          <label style={labelStyle}>{L.w}</label>
          <input type="number" placeholder="80" value={form.weight} onChange={e => inp("weight", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{L.h}</label>
          <input type="number" placeholder="178" value={form.height} onChange={e => inp("height", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{L.a}</label>
          <input type="number" placeholder="25" value={form.age} onChange={e => inp("age", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Sex</label>
          <div style={{ display: "flex", gap: 6 }}>
            {["m", "f"].map(s => (
              <button key={s} onClick={() => inp("sex", s)} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
                background: form.sex === s ? color : "rgba(255,255,255,0.06)",
                color: form.sex === s ? "#000" : "#555", fontWeight: 700, fontSize: 13, fontFamily: "inherit"
              }}>{s === "m" ? L.male : L.female}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>{L.act}</label>
        <select value={form.activity} onChange={e => inp("activity", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
          {actVals.map((v, i) => <option key={v} value={v}>{L.acts[i]}</option>)}
        </select>
      </div>
      <button onClick={calculate} style={{
        width: "100%", padding: "12px", borderRadius: 10, border: "none",
        background: color, color: "#000", fontWeight: 900, fontSize: 13,
        cursor: "pointer", letterSpacing: "0.08em", fontFamily: "inherit"
      }}>{L.calc}</button>
      {result && (
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: L.tdee, val: result.tdee, unit: "kcal", note: "" },
            { label: L.deficit, val: result.deficit, unit: "kcal", note: L.deficitNote },
            { label: L.protein, val: result.protein, unit: "g", note: L.proteinNote },
          ].map(r => (
            <div key={r.label} style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "12px 10px", textAlign: "center",
              border: `1px solid ${color}20`
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: color }}>{r.val}</div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>{r.unit}</div>
              <div style={{ fontSize: 10, color: "#444", lineHeight: 1.3 }}>{r.label}</div>
              {r.note && <div style={{ fontSize: 9, color: "#333", marginTop: 3 }}>{r.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function CalcBuild({ color, lang }) {
  const [form, setForm] = useState({ weight: "", height: "", age: "", sex: "m", activity: "1.55" });
  const [result, setResult] = useState(null);
  const labels = {
    DE: { title: " Dein persönlicher Rechner", w: "Gewicht (kg)", h: "Größe (cm)", a: "Alter", male: "Mann", female: "Frau", act: "Aktivität", calc: "BERECHNEN", tdee: "Kalorienbedarf", surplus: "Dein Aufbau-Ziel", protein: "Proteinziel", proteinNote: "täglich für Muskelaufbau", surplusNote: "für sauberen Aufbau", acts: ["Wenig Bewegung (Bürojob)", "Leicht aktiv (1–3x Sport/Woche)", "Moderat aktiv (3–5x/Woche)", "Sehr aktiv (6–7x/Woche)", "Extrem aktiv (2x täglich)"] },
    EN: { title: " Your personal calculator", w: "Weight (kg)", h: "Height (cm)", a: "Age", male: "Male", female: "Female", act: "Activity", calc: "CALCULATE", tdee: "Calorie needs", surplus: "Your bulk target", protein: "Protein target", proteinNote: "daily for muscle gain", surplusNote: "for lean bulk", acts: ["Sedentary (desk job)", "Lightly active (1–3x sport/week)", "Moderately active (3–5x/week)", "Very active (6–7x/week)", "Extremely active (2x daily)"] },
    ES: { title: " Tu calculadora personal", w: "Peso (kg)", h: "Altura (cm)", a: "Edad", male: "Hombre", female: "Mujer", act: "Actividad", calc: "CALCULAR", tdee: "Necesidad calórica", surplus: "Tu objetivo bulk", protein: "Objetivo proteína", proteinNote: "diario para ganar músculo", surplusNote: "para lean bulk", acts: ["Sedentario", "Ligeramente activo (1–3x/sem)", "Moderadamente activo (3–5x/sem)", "Muy activo (6–7x/sem)", "Extremadamente activo"] },
    FR: { title: " Ton calculateur personnel", w: "Poids (kg)", h: "Taille (cm)", a: "Âge", male: "Homme", female: "Femme", act: "Activité", calc: "CALCULER", tdee: "Besoin calorique", surplus: "Ton objectif bulk", protein: "Objectif protéine", proteinNote: "quotidien pour la masse", surplusNote: "pour lean bulk", acts: ["Sédentaire", "Légèrement actif (1–3x/sem)", "Modérément actif (3–5x/sem)", "Très actif (6–7x/sem)", "Extrêmement actif"] },
  };
  const L = labels[lang] || labels.EN;
  const actVals = ["1.2", "1.375", "1.55", "1.725", "1.9"];
  const calculate = () => {
    const w = parseFloat(form.weight), h = parseFloat(form.height), a = parseFloat(form.age);
    if (!w || !h || !a) return;
    const bmr = form.sex === "m"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * parseFloat(form.activity));
    const surplus = tdee + 300;
    const protein = Math.round(w * 2.0);
    setResult({ tdee, surplus, protein });
  };
  const inp = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14,
    fontFamily: "inherit", width: "100%", boxSizing: "border-box", outline: "none"
  };
  const labelStyle = { fontSize: 11, color: "#555", marginBottom: 5, display: "block", letterSpacing: "0.05em" };
  return (
    <div style={{ marginTop: 14, background: color + "08", border: `1px solid ${color}20`, borderRadius: 12, padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: color, marginBottom: 14 }}>{L.title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div>
          <label style={labelStyle}>{L.w}</label>
          <input type="number" placeholder="80" value={form.weight} onChange={e => inp("weight", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{L.h}</label>
          <input type="number" placeholder="178" value={form.height} onChange={e => inp("height", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{L.a}</label>
          <input type="number" placeholder="25" value={form.age} onChange={e => inp("age", e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Sex</label>
          <div style={{ display: "flex", gap: 6 }}>
            {["m", "f"].map(s => (
              <button key={s} onClick={() => inp("sex", s)} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
                background: form.sex === s ? color : "rgba(255,255,255,0.06)",
                color: form.sex === s ? "#000" : "#555", fontWeight: 700, fontSize: 13, fontFamily: "inherit"
              }}>{s === "m" ? L.male : L.female}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>{L.act}</label>
        <select value={form.activity} onChange={e => inp("activity", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
          {actVals.map((v, i) => <option key={v} value={v}>{L.acts[i]}</option>)}
        </select>
      </div>
      <button onClick={calculate} style={{
        width: "100%", padding: "12px", borderRadius: 10, border: "none",
        background: color, color: "#000", fontWeight: 900, fontSize: 13,
        cursor: "pointer", letterSpacing: "0.08em", fontFamily: "inherit"
      }}>{L.calc}</button>
      {result && (
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: L.tdee, val: result.tdee, unit: "kcal", note: "" },
            { label: L.surplus, val: result.surplus, unit: "kcal", note: L.surplusNote },
            { label: L.protein, val: result.protein, unit: "g", note: L.proteinNote },
          ].map(r => (
            <div key={r.label} style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "12px 10px", textAlign: "center",
              border: `1px solid ${color}20`
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: color }}>{r.val}</div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>{r.unit}</div>
              <div style={{ fontSize: 10, color: "#444", lineHeight: 1.3 }}>{r.label}</div>
              {r.note && <div style={{ fontSize: 9, color: "#333", marginTop: 3 }}>{r.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── TRANSLATIONS ──────────────────────────────────────────────────────────
const LANGS = { DE: " DE", EN: " EN", ES: " ES", FR: " FR" };
const T = {
  DE: { brand: "INSHAPE MIND", tagline: "Wähle deinen Fokus. Dein Blueprint wartet.", yourFocus: "DEIN FOKUS", foundation: "THE BLUEPRINT FOUNDATION\u2122", appSoon: "Die App kommt bald.", appDesc: "KI Coach, Tracking & personalisierte Analysen. Inshape Mind — alles in einer App.", notify: "NOTIFY ME", moreComingSoon: "Mehr als ein Guide", back: "\u2190", impressum: "Impressum", privacy: "Datenschutz", trustTitle: "INSHAPE MIND", aboutTitle: "Über INSHAPE MIND", trustBody: "Ich hab selbst gemerkt: Niemand wird mit Disziplin, dem perfekten Körper oder der richtigen Mentalität geboren. Das alles baut man sich auf — manchmal mühsam, oft inkonsistent, aber Schritt für Schritt.\n\nBuilt Not Born ist das, was ich mir am Anfang gewünscht hätte: ein klarer, ehrlicher Einstieg ohne Bullshit. Kein perfektes System, sondern ein Fundament das funktioniert.\n\nDieser Blueprint ist erst der Anfang. Die App kommt — mit KI-Coaching und Tracking das wirklich auf dich zugeschnitten ist." },
  EN: { brand: "INSHAPE MIND", tagline: "Choose your focus. Your blueprint is waiting.", yourFocus: "YOUR FOCUS", foundation: "THE BLUEPRINT FOUNDATION\u2122", appSoon: "The app is coming soon.", appDesc: "AI Coach, tracking & personalized analysis. Inshape Mind — all in one app.", notify: "NOTIFY ME", moreComingSoon: "More than a guide", back: "\u2190", impressum: "Legal Notice", privacy: "Privacy Policy", trustTitle: "INSHAPE MIND", aboutTitle: "About INSHAPE MIND", trustBody: "I figured this out myself: nobody is born with discipline, the perfect body, or the right mindset. All of it is built — sometimes the hard way, often inconsistently, but step by step.\n\nBuilt Not Born is what I wish I'd had at the start: a clear, honest entry point with no BS. Not a perfect system — a foundation that actually works.\n\nThis blueprint is just the beginning. The app is coming — with AI coaching and tracking that's truly tailored to you." },
  ES: { brand: "INSHAPE MIND", tagline: "Elige tu enfoque. Tu blueprint te espera.", yourFocus: "TU ENFOQUE", foundation: "THE BLUEPRINT FOUNDATION\u2122", appSoon: "La app llega pronto.", appDesc: "Coach IA, seguimiento y análisis personalizados. Inshape Mind — todo en una app.", notify: "AVÍSAME", moreComingSoon: "Más que una guía", back: "\u2190", impressum: "Aviso Legal", privacy: "Privacidad", trustTitle: "INSHAPE MIND", aboutTitle: "Sobre INSHAPE MIND", trustBody: "Lo descubrí yo mismo: nadie nace con disciplina, el cuerpo perfecto o la mentalidad correcta. Todo eso se construye — a veces con esfuerzo, a menudo de forma inconsistente, pero paso a paso.\n\nBuilt Not Born es lo que me hubiera gustado tener al principio: un punto de partida claro y honesto, sin tonterías. No un sistema perfecto, sino una base que realmente funciona.\n\nEste blueprint es solo el comienzo. La app llega — con coaching IA y seguimiento realmente adaptado a ti." },
  FR: { brand: "INSHAPE MIND", tagline: "Choisis ton objectif. Ton blueprint t'attend.", yourFocus: "TON OBJECTIF", foundation: "THE BLUEPRINT FOUNDATION\u2122", appSoon: "L'app arrive bientôt.", appDesc: "Coach IA, suivi & analyses personnalisées. Inshape Mind — tout en une app.", notify: "PRÉVENEZ-MOI", moreComingSoon: "Plus qu'un guide", back: "\u2190", impressum: "Mentions légales", privacy: "Confidentialité", trustTitle: "INSHAPE MIND", aboutTitle: "À propos d'INSHAPE MIND", trustBody: "Je l'ai compris moi-même : personne ne naît avec la discipline, le corps parfait ou le bon mindset. Tout cela se construit — parfois difficilement, souvent de façon inconstante, mais étape par étape.\n\nBuilt Not Born, c'est ce que j'aurais aimé avoir au départ : un point de départ clair et honnête, sans bullshit. Pas un système parfait — une base qui fonctionne vraiment.\n\nCe blueprint n'est que le début. L'app arrive — avec un coaching IA et un suivi vraiment adapté à toi." },
};
// ── CONTENT ───────────────────────────────────────────────────────────────
const GOALS = {
  DE: [
    {
      id: "cut", label: "Abnehmen", sub: "Körperfett verlieren, Körper definieren", icon: "◈", color: "#E8FF3B",
      sections: [
        {
          title: "Das Fundament", content: [
            { heading: "Kaloriendefizit — die einzige Wahrheit", body: "Kein Trend, keine Diät ersetzt das Grundprinzip: Du musst weniger Kalorien zu dir nehmen als du verbrauchst. 300–500 kcal unter deinem Bedarf ist der Sweet Spot — aggressiv genug für Fortschritt, moderat genug um Muskelmasse zu erhalten.", action: "
            { heading: "Protein ist dein bestes Werkzeug", body: "Mindestens 1,6–2g Protein pro kg Körpergewicht täglich. Protein sättigt, schützt Muskelmasse beim Abnehmen und kostet mehr Energie bei der Verdauung — der sogenannte thermische Effekt.", action: "
            { heading: "80/20 — Struktur ohne Verbot", body: "80% deiner Mahlzeiten clean, 20% Leben. Kein Cheat Day-Drama, kein Verbot. Flexibilität ist kein Fehler — sie ist die Strategie.", action: "
          ]
        },
        {
          title: "Training", content: [
            { heading: "Cardio ist nicht alles", body: "Krafttraining beim Abnehmen ist massiv unterschätzt. Mehr Muskelmasse = höherer Grundumsatz = mehr Kalorien verbrannt im Ruhezustand. Cardio verbrennt während des Trainings, Kraft verändert deinen Grundumsatz dauerhaft.", action: "
            { heading: "NEAT — dein stiller Verbündeter", body: "Non-Exercise Activity Thermogenesis: alles was du verbrennst ohne gezielten Sport. Treppe statt Aufzug, zu Fuß zum Supermarkt. Summiert sich auf 300–700 kcal extra täglich.", action: "
            { heading: "Waage vs. Körper — was wirklich zählt", body: "Die Waage lügt kurzfristig. Wasser, Salz, Verdauung — das Gewicht schwankt täglich um 1–2 kg. Täglich wiegen und sich daran aufhängen zerstört die Motivation ohne Grund.", action: "
          ]
        },
        {
          title: "Mindset", content: [
            { heading: "Geduld ist eine Skill", body: "0,5–1 kg Fettverlust pro Woche ist realistisch und gesund. Wer schneller will, verliert Muskelmasse und crasht den Stoffwechsel.", action: "
            { heading: "Plateaus sind normal — kein Grund zur Panik", body: "Nach 3–4 Wochen stagniert oft das Gewicht. Das ist kein Fehler — der Körper passt sich an. Die Lösung ist nicht radikaler, sondern smarter.", action: "
          ]
        }
      ]
    },
    {
      id: "build", label: "Aufbauen", sub: "Muskelmasse gewinnen, stärker werden", icon: "◉", color: "#FF6B35",
      sections: [
        {
        },
        {
          title: "Das Fundament", content: [
            { heading: "Kalorienüberschuss — kontrolliert & smart", body: "250–400 kcal über deinem Bedarf. Mehr bringt nicht schneller Muskeln, nur mehr Fett. Ein langsamer Aufbau ist ein sauberer Aufbau.", action: "
            { heading: "Progressive Overload — das einzige Gesetz das zählt", body: "Du wächst nur wenn du deinen Muskeln neue Reize gibst. Mehr Gewicht, mehr Wiederholungen, weniger Pause — irgendwas muss sich jede Woche steigern.", action: "
            { heading: "Protein & Timing — so setzt du es um", body: "1,8–2,2g Protein pro kg täglich. Verteilt auf 4–5 Mahlzeiten, damit der Körper kontinuierlich Baumaterial hat.", action: "
          ]
          title: "Training", content: [
            { heading: "Compound Lifts first — immer", body: "Kniebeuge, Kreuzheben, Bankdrücken, Schulterdrücken, Rudern. Diese Grundübungen bauen echte Masse auf und lösen die maximale hormonelle Reaktion aus.", action: "
            { heading: "Schlaf ist Training", body: "Muskeln wachsen nicht im Gym — sie wachsen in der Nacht. Wachstumshormon wird hauptsächlich im Tiefschlaf ausgeschüttet. 7–9 Stunden sind Teil des Programms.", action: "
            { heading: "Creatine — das einzige Supplement das zählt", body: "3–5g täglich, jeden Tag, unabhängig vom Training. Mehr Kraft, mehr Volumen, bessere Recovery. Das wissenschaftlich am besten belegte Supplement — kein Hype.", action: "
          ]
        },
        {
          title: "Ernährung & Recovery", content: [
            { heading: "Carbs sind dein Freund", body: "Im Aufbau sind Kohlenhydrate Treibstoff, kein Feind. Für intensive Krafteinheiten brauchst du Glykogen in den Muskeln. Low Carb im Aufbau ist kontraproduktiv.", action: "
            { heading: "Recovery aktiv gestalten", body: "Dehnen, Foam Rolling, kalte Dusche — als Investment in mehr Trainingstage. Wer besser recovert, kann öfter und härter trainieren.", action: "
          ]
        }
      ]
    },
    {
      id: "nutrition", label: "Ernährung", sub: "Basics die wirklich etwas verändern", icon: "
      sections: [
        {
          title: "Warum es wichtig ist", content: [
            { heading: "Food is information — nicht nur Kalorien", body: "Jede Mahlzeit sendet Signale an deinen Körper. Energie, Hormone, Fokus, Stimmung, Schlaf — alles hängt damit zusammen was du isst. Ernährung ist Performance im Alltag.", action: "
            { heading: "Entzündung vs. Regeneration", body: "Hochverarbeitete Lebensmittel, Zucker, Transfette fördern stille Entzündungen. Die spürst du nicht sofort, aber sie fressen Energie, stören Schlaf und verlangsamen Recovery.", action: "
            { heading: "Hydration — das meistunterschätzte Tool", body: "Schon 2% Flüssigkeitsmangel reduziert Leistung und Konzentration messbar. Gut hydriert = klarer denken, besser trainieren, schneller regenerieren.", action: "
          ]
        },
        {
          title: "Die 80/20 Philosophie", content: [
            { heading: "Kein Verbot, kein Perfektionismus", body: "80% der Mahlzeiten nährstoffreich. 20% Leben. Diese Struktur hält ein Jahr durch, wo eine Crash-Diät nach 3 Wochen bricht.", action: "
            { heading: "Was 'clean' wirklich bedeutet", body: "Gemüse, Obst, mageres Protein, Vollkorn, gesunde Fette. Kein Superfood-Hype — echtes Essen das der Körper kennt.", action: "
            { heading: "Meal Prep — Willenskraft durch Automation ersetzen", body: "Schlechte Entscheidungen passieren wenn man hungrig und ohne Plan ist. Vorbereitung macht dich nicht willensstarker — sie entfernt die Entscheidung komplett.", action: "
          ]
        },
        {
          title: "Praktische Basics", content: [
            { heading: "Labels lesen — in 10 Sekunden", body: "Du brauchst keine Ernährungswissenschaft. Zwei Blicke: Zutatenliste und Makros per 100g.", action: "
            { heading: "Supplements — was brauchst du wirklich?", body: "95% aller Ziele erreichst du ohne einen einzigen Supplement. Aber es gibt sinnvolle Ausnahmen.", action: "
          ]
        }
      ]
    },
    {
      id: "mindset", label: "Mindset", sub: "Der Kopf entscheidet alles andere", icon: "◎", color: "#B57BFF",
      sections: [
        {
          title: "Die Basis", content: [
            { heading: "Built, not born — was das wirklich bedeutet", body: "Niemand startet mit dem perfekten Körper, dem perfekten Mindset oder der perfekten Disziplin. Das alles wird gebaut — Entscheidung für Entscheidung. Genetik ist ein Startpunkt, nicht ein Schicksal.", action: "
            { heading: "Motivation ist unzuverlässig — Systeme nicht", body: "Motivation kommt und geht. Wer auf sie wartet, trainiert unregelmäßig. Ein System trifft die Entscheidung bereits im Voraus.", action: "
            { heading: "Disziplin ist ein Muskel", body: "Disziplin entsteht durch Wiederholung bis zur Automatisierung. Was sich heute nach Überwindung anfühlt, ist in 60 Tagen Routine.", action: "
          ]
        },
        {
          title: "Performance", content: [
            { heading: "Konsistenz schlägt Intensität — immer", body: "60% jeden Tag schlägt 100% und dann 2 Wochen Pause. Der Compound-Effekt kleiner täglicher Aktionen ist die mächtigste Kraft in der Selbstoptimierung.", action: "
            { heading: "Verzögerter Erfolg ist normaler Erfolg", body: "Resultate kommen immer verzögert. Der Körper verändert sich von innen nach außen: erst Kraft, dann Körperzusammensetzung, dann Optik.", action: "
            { heading: "Stress ist Feind und Lehrer", body: "Chronischer Stress erhöht Cortisol, blockiert Muskelaufbau, erhöht Fetteinlagerung. Kurzfristiger Stress — Training, Herausforderung — macht dich stärker. Der Unterschied: Erholung.", action: "
          ]
        },
        {
          title: "Tägliche Tools", content: [
            { heading: "Morgenroutine als Anker", body: "Du brauchst keine 5AM-Club Stunde. Aber 10–15 Min bewusstes Starten verändern den Ton des restlichen Tages fundamental.", action: "
            { heading: "Journaling ohne Druck", body: "Kein Tagebuch, kein Essay. Ein Tool zur Reflexion. Wer seinen Tag reflektiert, lernt schneller aus ihm.", action: "
            { heading: "Umfeld ist Schicksal", body: "Du wirst zum Durchschnitt der 5 Menschen mit denen du am meisten Zeit verbringst. Dein Umfeld beeinflusst deine Entscheidungen täglich — ob du willst oder nicht.", action: "
          ]
        }
      ]
    }
  ],
  EN: [
    {
      id: "cut", label: "Cut", sub: "Lose body fat, get defined", icon: "◈", color: "#E8FF3B",
      sections: [
        {
          title: "The Foundation", content: [
            { heading: "Calorie deficit — the only truth", body: "No trend, no diet replaces the core principle: consume fewer calories than you burn. 300–500 kcal below maintenance is the sweet spot — aggressive enough for progress, moderate enough to preserve muscle.", action: "
            { heading: "Protein is your best tool", body: "Minimum 1.6–2g protein per kg bodyweight daily. Protein keeps you full, preserves muscle while cutting, and costs more energy to digest — the thermic effect.", action: "
            { heading: "80/20 — structure without restriction", body: "80% of meals clean, 20% life. No cheat day drama, no forbidden foods. Flexibility isn't failure — it's the strategy.", action: "
          ]
        },
        {
          title: "Training", content: [
            { heading: "Cardio isn't everything", body: "Strength training while cutting is massively underrated. More muscle = higher resting metabolism = more calories burned at rest. Cardio burns during the session; strength permanently changes your metabolism.", action: "
            { heading: "NEAT — your silent ally", body: "Non-Exercise Activity Thermogenesis: everything you burn without structured sport. Stairs instead of elevator, walking to the store. Adds up to 300–700 extra kcal daily.", action: "
            { heading: "Scale vs. body — what really counts", body: "The scale lies short-term. Water, salt, digestion — weight fluctuates 1–2 kg daily. Obsessing over daily readings kills motivation for no reason.", action: "
          ]
        },
        {
          title: "Mindset", content: [
            { heading: "Patience is a skill", body: "0.5–1 kg fat loss per week is realistic and healthy. Going faster loses muscle and crashes metabolism.", action: "
            { heading: "Plateaus are normal — don't panic", body: "After 3–4 weeks weight often stalls. That's biology, not failure. The body adapts. The solution: smarter, not more extreme.", action: "
          ]
        }
      ]
    },
    {
      id: "build", label: "Build", sub: "Gain muscle mass, get stronger", icon: "◉", color: "#FF6B35",
      sections: [
        {
        },
        {
          title: "The Foundation", content: [
            { heading: "Calorie surplus — controlled & smart", body: "250–400 kcal above maintenance. More doesn't mean faster muscle — just more fat. Slow building is clean building.", action: "
            { heading: "Progressive overload — the only law that matters", body: "You only grow when you give muscles new stimuli. More weight, more reps, shorter rest — something must progress every week.", action: "
            { heading: "Protein & timing — how to execute", body: "1.8–2.2g protein per kg daily. Spread across 4–5 meals so the body has continuous building material.", action: "
          ]
          title: "Training", content: [
            { heading: "Compound lifts first — always", body: "Squat, deadlift, bench, OHP, rows. These fundamentals build real mass and trigger maximum hormonal response. Isolation after, never before.", action: "
            { heading: "Sleep is training", body: "Muscles don't grow in the gym — they grow at night. Growth hormone releases primarily during deep sleep. 7–9 hours is part of the program, not a luxury.", action: "
            { heading: "Creatine — the only supplement that matters", body: "3–5g daily, every day, regardless of training. More strength, more volume, better recovery. Most researched supplement in existence — no hype, pure evidence.", action: "
          ]
        },
        {
          title: "Nutrition & Recovery", content: [
            { heading: "Carbs are your friend", body: "When building, carbohydrates are fuel, not the enemy. For intense strength sessions you need glycogen in your muscles. Low carb while bulking is counterproductive.", action: "
            { heading: "Active recovery", body: "Stretching, foam rolling, cold shower — as investment in more training days. Better recovery = more frequent and harder training.", action: "
          ]
        }
      ]
    },
    {
      id: "nutrition", label: "Nutrition", sub: "Basics that actually change things", icon: "
      sections: [
        {
        },
        {
          title: "Why it matters", content: [
            { heading: "Food is information — not just calories", body: "Every meal sends signals to your body. Energy, hormones, focus, mood, sleep — it all connects to what you eat. Nutrition is daily performance.", action: "
            { heading: "Inflammation vs. regeneration", body: "Processed foods, sugar, trans fats promote silent inflammation. You don't feel it immediately — but it drains energy, disrupts sleep, slows recovery.", action: "
            { heading: "Hydration — the most underrated tool", body: "Even 2% fluid deficit measurably reduces performance and concentration. Well-hydrated = clearer thinking, better training, faster recovery.", action: "
          ]
          title: "The 80/20 Philosophy", content: [
            { heading: "No restrictions, no perfectionism", body: "80% nutrient-rich meals, 20% life. This structure holds for a year where a crash diet breaks after 3 weeks.", action: "
            { heading: "What 'clean' really means", body: "Vegetables, fruit, lean protein, whole grains, healthy fats. No superfood hype — just real food the body recognizes.", action: "
            { heading: "Meal prep — replace willpower with automation", body: "Bad decisions happen when you're hungry and without a plan. Preparation doesn't make you stronger-willed — it removes the decision entirely.", action: "
          ]
        },
        {
          title: "Practical Basics", content: [
            { heading: "Reading labels in 10 seconds", body: "Two looks: ingredient list and macros per 100g. That's all you need.", action: "
            { heading: "Supplements — what do you actually need?", body: "95% of all goals are reachable without a single supplement. But there are sensible exceptions.", action: "
          ]
        }
      ]
    },
    {
      id: "mindset", label: "Mindset", sub: "Your head decides everything else", icon: "◎", color: "#B57BFF",
      sections: [
        {
          title: "The Foundation", content: [
            { heading: "Built, not born — what it really means", body: "Nobody starts with the perfect body, mindset, or discipline. All of it is built — decision by decision. Genetics is a starting point, not a destiny.", action: "
            { heading: "Motivation is unreliable — systems aren't", body: "Motivation comes and goes. Having a system means training even when you don't feel like it — because the system already made the decision.", action: "
            { heading: "Discipline is a muscle", body: "Discipline comes from repetition until automation. What feels like effort today is routine in 60 days.", action: "
          ]
        },
        {
          title: "Performance", content: [
            { heading: "Consistency beats intensity — always", body: "60% every day beats 100% then 2 weeks off. The compound effect of small daily actions is the most powerful force in self-optimization.", action: "
            { heading: "Delayed results are normal results", body: "Results always come with delay. The body changes inside out: strength first, then composition, then appearance.", action: "
            { heading: "Stress is enemy and teacher", body: "Chronic stress blocks muscle building and increases fat storage. Short-term stress — challenge, training — makes you stronger. The difference: recovery.", action: "
          ]
        },
        {
          title: "Daily Tools", content: [
            { heading: "Morning routine as anchor", body: "You don't need a 5AM Club hour. But 10–15 minutes of intentional starting fundamentally changes your day's tone.", action: "
            { heading: "Journaling without pressure", body: "Not a diary, not an essay. A tool for reflection. Those who reflect on their day learn faster from it.", action: "
        }
          ]
            { heading: "Environment is destiny", body: "You become the average of the 5 people you spend most time with. Your environment shapes daily decisions — whether you like it or not.", action: "
      ]
    }
  ],
};
GOALS.ES = [
  {
    id: "cut", label: "Definición", sub: "Pierde grasa, define tu cuerpo", icon: "◈", color: "#E8FF3B",
    sections: [
      {
        title: "La Base", content: [
          { heading: "Déficit calórico — la única verdad", body: "Ningún truco ni dieta sustituye el principio fundamental: debes consumir menos calorías de las que quemas. 300–500 kcal por debajo de tu mantenimiento es el punto óptimo — suficiente para progresar, moderado para preservar músculo.", action: "
          { heading: "La proteína es tu mejor herramienta", body: "Mínimo 1,6–2g de proteína por kg de peso corporal al día. La proteína sacia, preserva el músculo durante la definición y cuesta más energía digerirla — el efecto térmico.", action: "
          { heading: "80/20 — estructura sin restricción", body: "80% de comidas limpias, 20% vida. Sin drama de cheat day, sin alimentos prohibidos. La flexibilidad no es fracaso — es la estrategia.", action: "
        ]
      },
      {
        title: "Entrenamiento", content: [
          { heading: "El cardio no lo es todo", body: "El entrenamiento de fuerza durante la definición está muy subestimado. Más masa muscular = mayor metabolismo en reposo = más calorías quemadas en reposo. El cardio quema durante la sesión; la fuerza cambia tu metabolismo permanentemente.", action: "
          { heading: "NEAT — tu aliado silencioso", body: "Termogénesis por actividad sin ejercicio: todo lo que quemas sin deporte estructurado. Escaleras en vez de ascensor, caminar a la tienda. Suma 300–700 kcal extra al día.", action: "
          { heading: "Báscula vs. cuerpo — lo que realmente cuenta", body: "La báscula miente a corto plazo. Agua, sal, digestión — el peso fluctúa 1–2 kg diarios. Obsesionarte con lecturas diarias mata la motivación sin razón.", action: "
        ]
      },
      {
        title: "Mentalidad", content: [
          { heading: "La paciencia es una habilidad", body: "0,5–1 kg de pérdida de grasa por semana es realista y saludable. Ir más rápido pierde músculo y colapsa el metabolismo.", action: "
          { heading: "Las mesetas son normales — no pánico", body: "Tras 3–4 semanas el peso suele estancarse. Es biología, no fracaso. El cuerpo se adapta. La solución: más inteligente, no más extrema.", action: "
        ]
      }
    ]
  },
  {
    id: "build", label: "Volumen", sub: "Gana masa muscular, hazte más fuerte", icon: "◉", color: "#FF6B35",
    sections: [
      {
      },
      {
        title: "La Base", content: [
          { heading: "Superávit calórico — controlado e inteligente", body: "250–400 kcal por encima de tu mantenimiento. Más no significa músculo más rápido — solo más grasa. Un volumen lento es un volumen limpio.", action: "
          { heading: "Sobrecarga progresiva — la única ley que importa", body: "Solo creces cuando das nuevos estímulos a tus músculos. Más peso, más repeticiones, menos descanso — algo debe progresar cada semana.", action: "
          { heading: "Proteína y timing — cómo ejecutarlo", body: "1,8–2,2g de proteína por kg al día. Repartida en 4–5 comidas para que el cuerpo tenga material constante para construir.", action: "
        ]
        title: "Entrenamiento", content: [
          { heading: "Ejercicios compuestos primero — siempre", body: "Sentadilla, peso muerto, press de banca, press militar, remo. Estos fundamentos construyen masa real y activan la máxima respuesta hormonal. Aislamiento después, nunca antes.", action: "
        ]
          { heading: "Dormir es entrenar", body: "Los músculos no crecen en el gym — crecen de noche. La hormona del crecimiento se libera principalmente en sueño profundo. 7–9 horas no es un lujo, es parte del programa.", action: "
          { heading: "Creatina — el único suplemento que importa", body: "3–5g diarios, todos los días, independientemente del entrenamiento. Más fuerza, más volumen, mejor recuperación. El suplemento más investigado — sin exageraciones, pura evidencia.", action: "
      },
      {
        title: "Nutrición y Recuperación", content: [
          { heading: "Los carbohidratos son tu amigo", body: "En volumen, los carbohidratos son combustible, no el enemigo. Para sesiones intensas necesitas glucógeno en los músculos. Bajo en carbos durante el volumen es contraproducente.", action: "
          { heading: "Recuperación activa", body: "Estiramientos, foam roller, ducha fría — como inversión en más días de entrenamiento. Mejor recuperación = entrenar más a menudo y más duro.", action: "
        ]
      }
    ]
  },
  {
    id: "nutrition", label: "Nutrición", sub: "Lo básico que realmente cambia las cosas", icon: "
    sections: [
      {
      },
      {
        title: "Por qué importa", content: [
          { heading: "La comida es información — no solo calorías", body: "Cada comida envía señales a tu cuerpo. Energía, hormonas, enfoque, ánimo, sueño — todo se conecta con lo que comes. La nutrición es rendimiento diario.", action: "
          { heading: "Inflamación vs. regeneración", body: "Los alimentos procesados, azúcar, grasas trans promueven inflamación silenciosa. No la sientes de inmediato, pero drena energía, altera el sueño y ralentiza la recuperación.", action: "
          { heading: "Hidratación — la herramienta más subestimada", body: "Incluso un déficit de fluidos del 2% reduce mediblemente el rendimiento y la concentración. Bien hidratado = pensar más claro, entrenar mejor, recuperar más rápido.", action: "
        ]
        title: "La Filosofía 80/20", content: [
          { heading: "Sin restricciones, sin perfeccionismo", body: "80% comidas ricas en nutrientes, 20% vida. Esta estructura aguanta un año donde una dieta extrema falla a las 3 semanas.", action: "
          { heading: "Lo que 'limpio' realmente significa", body: "Verduras, fruta, proteína magra, granos integrales, grasas saludables. Sin exageraciones de superalimentos — solo comida real que el cuerpo reconoce.", action: "
          { heading: "Meal prep — sustituye fuerza de voluntad por automatización", body: "Las malas decisiones ocurren cuando tienes hambre y no tienes plan. La preparación no te hace más fuerte de voluntad — elimina la decisión por completo.", action: "
        ]
      },
      {
        title: "Básicos Prácticos", content: [
          { heading: "Leer etiquetas en 10 segundos", body: "Dos miradas: lista de ingredientes y macros por 100g. Eso es todo lo que necesitas.", action: "
          { heading: "Suplementos — ¿qué necesitas realmente?", body: "El 95% de los objetivos se alcanzan sin un solo suplemento. Pero hay excepciones sensatas.", action: "
        ]
      }
    ]
  },
  {
    id: "mindset", label: "Mentalidad", sub: "Tu cabeza decide todo lo demás", icon: "◎", color: "#B57BFF",
    sections: [
      {
        title: "La Base", content: [
          { heading: "Built, not born — qué significa realmente", body: "Nadie empieza con el cuerpo, mentalidad o disciplina perfectos. Todo eso se construye — decisión tras decisión. La genética es un punto de partida, no un destino.", action: "
          { heading: "La motivación es poco fiable — los sistemas no", body: "La motivación va y viene. Tener un sistema significa entrenar incluso cuando no tienes ganas — porque el sistema ya tomó la decisión.", action: "
          { heading: "La disciplina es un músculo", body: "La disciplina viene de la repetición hasta automatizarse. Lo que hoy se siente como esfuerzo, en 60 días es rutina.", action: "
        ]
      },
      {
        title: "Mentalidad de Rendimiento", content: [
          { heading: "La constancia vence a la intensidad — siempre", body: "60% cada día vence al 100% seguido de 2 semanas sin nada. El efecto compuesto de pequeñas acciones diarias es la fuerza más poderosa en la autooptimización.", action: "
          { heading: "Los resultados retrasados son resultados normales", body: "Los resultados siempre llegan con retraso. El cuerpo cambia de dentro hacia fuera: primero fuerza, luego composición, luego apariencia.", action: "
          { heading: "El estrés es enemigo y maestro", body: "El estrés crónico bloquea el desarrollo muscular y aumenta el almacenamiento de grasa. El estrés a corto plazo — desafío, entrenamiento — te hace más fuerte. La diferencia: recuperación.", action: "
        ]
      },
      {
        title: "Herramientas Diarias", content: [
          { heading: "Rutina matutina como ancla", body: "No necesitas una hora del 5AM Club. Pero 10–15 minutos de inicio intencional cambian fundamentalmente el tono de tu día.", action: "
          { heading: "Diario sin presión", body: "No es un diario ni un ensayo. Es una herramienta de reflexión. Quien reflexiona sobre su día aprende más rápido de él.", action: "
          { heading: "El entorno es destino", body: "Te conviertes en el promedio de las 5 personas con las que pasas más tiempo. Tu entorno moldea tus decisiones diarias — quieras o no.", action: "
        ]
      }
    ]
  }
];
GOALS.FR = [
  {
    id: "cut", label: "Sèche", sub: "Perds de la graisse, dessine ton corps", icon: "◈", color: "#E8FF3B",
    sections: [
      {
        title: "Les Fondations", content: [
          { heading: "Déficit calorique — la seule vérité", body: "Aucune tendance, aucun régime ne remplace le principe de base : tu dois consommer moins de calories que tu n'en brûles. 300–500 kcal sous ton maintien est l'équilibre parfait — assez agressif pour progresser, assez modéré pour préserver le muscle.", action: "
          { heading: "La protéine est ton meilleur outil", body: "Minimum 1,6–2g de protéine par kg de poids corporel par jour. La protéine rassasie, préserve le muscle pendant la sèche et coûte plus d'énergie à digérer — l'effet thermique.", action: "
          { heading: "80/20 — structure sans restriction", body: "80% de repas propres, 20% de vie. Pas de drame de cheat day, pas d'aliments interdits. La flexibilité n'est pas un échec — c'est la stratégie.", action: "
        ]
      },
      {
        title: "Entraînement", content: [
          { heading: "Le cardio n'est pas tout", body: "La musculation pendant la sèche est massivement sous-estimée. Plus de masse musculaire = métabolisme de base plus élevé = plus de calories brûlées au repos. Le cardio brûle pendant la séance ; la force change ton métabolisme durablement.", action: "
          { heading: "NEAT — ton allié silencieux", body: "Thermogenèse d'activité hors exercice : tout ce que tu brûles sans sport structuré. Escaliers au lieu de l'ascenseur, marcher pour les courses. Ça ajoute 300–700 kcal en plus par jour.", action: "
          { heading: "Balance vs. corps — ce qui compte vraiment", body: "La balance ment à court terme. Eau, sel, digestion — le poids fluctue de 1–2 kg par jour. S'obséder sur les valeurs quotidiennes tue la motivation sans raison.", action: "
        ]
      },
      {
        title: "Mindset", content: [
          { heading: "La patience est une compétence", body: "0,5–1 kg de perte de gras par semaine est réaliste et sain. Aller plus vite fait perdre du muscle et casse le métabolisme.", action: "
          { heading: "Les plateaux sont normaux — pas de panique", body: "Après 3–4 semaines, le poids stagne souvent. C'est de la biologie, pas un échec. Le corps s'adapte. La solution : plus intelligent, pas plus extrême.", action: "
        ]
      }
    ]
  },
  {
    id: "build", label: "Prise de Masse", sub: "Gagne du muscle, deviens plus fort", icon: "◉
    sections: [
      {
        title: "Les Fondations", content: [
          { heading: "Surplus calorique — contrôlé et intelligent", body: "250–400 kcal au-dessus de ton maintien. Plus ne signifie pas plus de muscle, juste plus de gras. Une prise de masse lente est une prise de masse propre.", action: "
          { heading: "Surcharge progressive — la seule loi qui compte", body: "Tu ne grandis que lorsque tu donnes de nouveaux stimuli à tes muscles. Plus de poids, plus de répétitions, moins de repos — quelque chose doit progresser chaque semaine.", action: "
          { heading: "Protéine et timing — comment l'exécuter", body: "1,8–2,2g de protéine par kg par jour. Répartie sur 4–5 repas pour que le corps ait des matériaux de construction en continu.", action: "
        ]
      },
      {
        title: "Entraînement", content: [
          { heading: "Les mouvements polyarticulaires d'abord — toujours", body: "Squat, soulevé de terre, développé couché, développé militaire, rowing. Ces bases construisent une masse réelle et déclenchent une réponse hormonale maximale. L'isolation après, jamais avant.", action: "
          { heading: "Dormir, c'est s'entraîner", body: "Les muscles ne grandissent pas en salle — ils grandissent la nuit. L'hormone de croissance se libère principalement en sommeil profond. 7–9 heures, ce n'est pas un luxe, c'est une partie du programme.", action: "
          { heading: "Créatine — le seul complément qui compte", body: "3–5g par jour, tous les jours, peu importe si tu t'entraînes. Plus de force, plus de volume, meilleure récupération. Le complément le plus étudié — pas de hype, juste des preuves.", action: "
        ]
      },
      {
        title: "Nutrition et Récupération", content: [
          { heading: "Les glucides sont tes amis", body: "En prise de masse, les glucides sont du carburant, pas l'ennemi. Pour des séances intenses tu as besoin de glycogène dans les muscles. Peu de glucides en prise de masse est contre-productif.", action: "
          { heading: "Récupération active", body: "Étirements, foam rolling, douche froide — comme un investissement pour plus de jours d'entraînement. Meilleure récupération = entraînements plus fréquents et plus durs.", action: "
        ]
      }
    ]
  },
  {
    id: "nutrition", label: "Nutrition", sub: "Les bases qui changent vraiment les choses", icon: "
    sections: [
      {
      },
      {
        title: "Pourquoi c'est important", content: [
          { heading: "La nourriture est de l'information — pas juste des calories", body: "Chaque repas envoie des signaux à ton corps. Énergie, hormones, concentration, humeur, sommeil — tout est lié à ce que tu manges. La nutrition, c'est de la performance au quotidien.", action: "
          { heading: "Inflammation vs. régénération", body: "Les aliments ultra-transformés, le sucre, les gras trans favorisent une inflammation silencieuse. Tu ne le sens pas immédiatement, mais ça draine l'énergie, perturbe le sommeil et ralentit la récupération.", action: "
          { heading: "L'hydratation — l'outil le plus sous-estimé", body: "Même un déficit hydrique de 2% réduit mesurablement la performance et la concentration. Bien hydraté = penser plus clairement, mieux s'entraîner, récupérer plus vite.", action: "
        ]
        title: "La Philosophie 80/20", content: [
          { heading: "Pas de restrictions, pas de perfectionnisme", body: "80% de repas riches en nutriments, 20% de vie. Cette structure tient un an là où un régime extrême craque après 3 semaines.", action: "
          { heading: "Ce que 'propre' signifie vraiment", body: "Légumes, fruits, protéines maigres, céréales complètes, bonnes graisses. Pas de hype superfood — juste de la vraie nourriture que le corps reconnaît.", action: "
          { heading: "Meal prep — remplace la volonté par l'automatisation", body: "Les mauvaises décisions arrivent quand tu as faim et aucun plan. La préparation ne te rend pas plus volontaire — elle élimine la décision complètement.", action: "
        ]
      },
      {
        title: "Bases Pratiques", content: [
          { heading: "Lire les étiquettes en 10 secondes", body: "Deux coups d'œil : liste d'ingrédients et macros par 100g. C'est tout ce qu'il te faut.", action: "
          { heading: "Compléments — de quoi as-tu vraiment besoin ?", body: "95% des objectifs sont atteignables sans un seul complément. Mais il y a des exceptions sensées.", action: "
        ]
      }
    ]
  },
  {
    id: "mindset", label: "Mindset", sub: "Ta tête décide de tout le reste", icon: "◎", color: "#B57BFF",
    sections: [
      {
      },
      {
        title: "Les Fondations", content: [
          { heading: "Built, not born — ce que ça signifie vraiment", body: "Personne ne commence avec le corps, le mindset ou la discipline parfaits. Tout cela se construit — décision après décision. La génétique est un point de départ, pas un destin.", action: "
          { heading: "La motivation est peu fiable — les systèmes non", body: "La motivation vient et part. Avoir un système signifie s'entraîner même sans en avoir envie — parce que le système a déjà pris la décision.", action: "
          { heading: "La discipline est un muscle", body: "La discipline vient de la répétition jusqu'à l'automatisation. Ce qui demande un effort aujourd'hui devient une routine en 60 jours.", action: "
        ]
        title: "Mindset de Performance", content: [
          { heading: "La constance bat l'intensité — toujours", body: "60% chaque jour bat 100% suivi de 2 semaines d'arrêt. L'effet cumulé de petites actions quotidiennes est la force la plus puissante en auto-optimisation.", action: "
          { heading: "Des résultats retardés sont des résultats normaux", body: "Les résultats arrivent toujours avec retard. Le corps change de l'intérieur vers l'extérieur : d'abord la force, puis la composition, puis l'apparence.", action: "
          { heading: "Le stress est ennemi et professeur", body: "Le stress chronique bloque la construction musculaire et augmente le stockage des graisses. Le stress à court terme — défi, entraînement — te rend plus fort. La différence : la récupération.", action: "
        ]
      },
      {
        title: "Outils Quotidiens", content: [
          { heading: "Routine matinale comme ancre", body: "Tu n'as pas besoin d'une heure façon 5AM Club. Mais 10–15 minutes de démarrage intentionnel changent fondamentalement le ton de ta journée.", action: "
          { heading: "Journaling sans pression", body: "Pas un journal intime, pas un essai. Un outil de réflexion. Ceux qui réfléchissent sur leur journée en apprennent plus vite.", action: "
          { heading: "L'environnement est un destin", body: "Tu deviens la moyenne des 5 personnes avec qui tu passes le plus de temps. Ton environnement façonne tes décisions quotidiennes — que tu le veuilles ou non.", action: "
        ]
      }
    ]
  }
];
// ── LEGAL CONTENT ─────────────────────────────────────────────────────────
const LEGAL = {
  DE: {
    impressumTitle: "Impressum",
    impressumBody: `Angaben gemäß § 5 DDG
Tyrone Kreim
Oidtmannhof 4
41812 Erkelenz
Deutschland
Kontakt
E-Mail: inshapemind@outlook.com
Umsatzsteuer
Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
"Inshape Mind" und "Built Not Born" sind Projektbezeichnungen von Tyrone Kreim.
Verbraucherstreitbeilegung
Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
    privacyTitle: "Datenschutzerklärung",
    privacyBody: `1. Verantwortlicher
Tyrone Kreim, Oidtmannhof 4, 41812 Erkelenz, inshapemind@outlook.com
2. Welche Daten werden erhoben
Diese Anwendung (Built Not Born Blueprint) selbst erhebt, speichert oder übermittelt keine personenbezogenen Daten. Eingaben in den Rechnern (Gewicht, Größe, Alter etc.) werden ausschließlich lokal in deinem Browser verarbeitet und nirgendwo gespeichert oder übertragen.
3. Zahlungsabwicklung
Der Kauf erfolgt über einen externen Anbieter (Gumroad bzw. Lemon Squeezy). Bei einem Kauf werden deine Daten (z.B. Name, E-Mail-Adresse, Zahlungsdaten) direkt von diesem Anbieter verarbeitet. Es gelten dessen Datenschutzbestimmungen:– Gumroad: gumroad.com/privacy– Lemon Squeezy: lemonsqueezy.com/privacy
4. Cookies und Tracking
Diese Seite verwendet aktuell keine Cookies, Analyse-Tools oder Tracking-Pixel.
5. Hosting
Diese Anwendung wird über Vercel Inc. gehostet. Beim Aufruf der Seite werden technisch notwendige Verbindungsdaten (z.B. IP-Adresse) durch den Hosting-Anbieter verarbeitet. Mehr dazu: vercel.com/legal/privacy-policy
6. Deine Rechte
Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner Daten sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde. Wende dich dafür an: inshapemind@outlook.com
7. Änderungen
Diese Datenschutzerklärung kann bei Weiterentwicklung der Anwendung (z.B. Hinzufügen von Tracking oder Newsletter) angepasst werden.`,
  },
  EN: {
    impressumTitle: "Legal Notice",
    impressumBody: `Information according to § 5 DDG (German Digital Services Act)
Tyrone Kreim
Oidtmannhof 4
41812 Erkelenz
Germany
Contact
Email: inshapemind@outlook.com
VAT
According to § 19 (1) UStG, no VAT is charged (German small business regulation).
"Inshape Mind" and "Built Not Born" are project names operated by Tyrone Kreim.
Consumer dispute resolution
I am not willing and not obligated to participate in dispute resolution proceedings before a consumer arbitration board.`,
    privacyTitle: "Privacy Policy",
    privacyBody: `1. Controller
Tyrone Kreim, Oidtmannhof 4, 41812 Erkelenz, Germany, inshapemind@outlook.com
2. What data is collected
This application (Built Not Born Blueprint) itself does not collect, store, or transmit any personal data. Inputs in the calculators (weight, height, age, etc.) are processed exclusively locally in your browser and are never stored or transmitted anywhere.
3. Payment processing
The purchase is handled by an external provider (Gumroad or Lemon Squeezy). When you make a purchase, your data (e.g. name, email address, payment details) is processed directly by this provider. Their privacy policies apply:– Gumroad: gumroad.com/privacy– Lemon Squeezy: lemonsqueezy.com/privacy
4. Cookies and tracking
This site currently does not use any cookies, analytics tools, or tracking pixels.
5. Hosting
This application is hosted via Vercel Inc. When the page is accessed, technically necessary connection data (e.g. IP address) is processed by the hosting provider. More info: vercel.com/legal/privacy-policy
6. Your rights
You have the right at any time to access, correct, delete, and restrict the processing of your data, as well as the right to lodge a complaint with a data protection supervisory authority. Contact: inshapemind@outlook.com
7. Changes
This privacy policy may be updated as the application evolves (e.g. addition of tracking or newsletter features).`,
  },
  ES: {
    impressumTitle: "Aviso Legal",
    impressumBody: `Información según § 5 DDG (Ley alemana de servicios digitales)
Tyrone Kreim
Oidtmannhof 4
41812 Erkelenz
Alemania
Contacto
Email: inshapemind@outlook.com
IVA
Según § 19 (1) UStG, no se cobra IVA (régimen alemán de pequeños negocios).
"Inshape Mind" y "Built Not Born" son nombres de proyecto operados por Tyrone Kreim.
Resolución de disputas
No estoy dispuesto ni obligado a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.`,
    privacyTitle: "Política de Privacidad",
    privacyBody: `1. Responsable
Tyrone Kreim, Oidtmannhof 4, 41812 Erkelenz, Alemania, inshapemind@outlook.com
2. Qué datos se recopilan
Esta aplicación (Built Not Born Blueprint) no recopila, almacena ni transmite datos personales por sí misma. Las entradas en las calculadoras (peso, altura, edad, etc.) se procesan exclusivamente de forma local en tu navegador y nunca se almacenan ni transmiten.
3. Procesamiento de pagos
La compra se gestiona a través de un proveedor externo (Gumroad o Lemon Squeezy). Al realizar una compra, tus datos (p. ej. nombre, email, datos de pago) son procesados directamente por este proveedor. Se aplican sus políticas de privacidad:– Gumroad: gumroad.com/privacy– Lemon Squeezy: lemonsqueezy.com/privacy
4. Cookies y seguimiento
Este sitio actualmente no utiliza cookies, herramientas de análisis ni píxeles de seguimiento.
5. Hosting
Esta aplicación está alojada por Vercel Inc. Al acceder a la página, los datos de conexión técnicamente necesarios (p. ej. dirección IP) son procesados por el proveedor de hosting. Más info: vercel.com/legal/privacy-policy
6. Tus derechos
Tienes derecho en cualquier momento a acceder, corregir, eliminar y restringir el procesamiento de tus datos, así como el derecho a presentar una queja ante una autoridad de protección de datos. Contacto: inshapemind@outlook.com
7. Cambios
Esta política de privacidad puede actualizarse a medida que la aplicación evoluciona (p. ej. adición de seguimiento o newsletter).`,
  },
  FR: {
    impressumTitle: "Mentions légales",
    impressumBody: `Informations selon § 5 DDG (loi allemande sur les services numériques)
Tyrone Kreim
Oidtmannhof 4
41812 Erkelenz
Allemagne
Contact
Email : inshapemind@outlook.com
TVA
Conformément au § 19 (1) UStG, aucune TVA n'est facturée (régime allemand des petites entreprises).
"Inshape Mind" et "Built Not Born" sont des noms de projet exploités par Tyrone Kreim.
Résolution des litiges
Je ne suis ni disposé ni obligé de participer à une procédure de résolution de litiges devant une commission d'arbitrage de consommateurs.`,
    privacyTitle: "Politique de Confidentialité",
    privacyBody: `1. Responsable
Tyrone Kreim, Oidtmannhof 4, 41812 Erkelenz, Allemagne, inshapemind@outlook.com
2. Quelles données sont collectées
Cette application (Built Not Born Blueprint) ne collecte, ne stocke ni ne transmet elle-même aucune donnée personnelle. Les saisies dans les calculateurs (poids, taille, âge, etc.) sont traitées exclusivement localement dans ton navigateur et ne sont jamais stockées ni transmises.
3. Traitement des paiements
L'achat est géré par un prestataire externe (Gumroad ou Lemon Squeezy). Lors d'un achat, tes données (nom, email, données de paiement) sont traitées directement par ce prestataire. Leurs politiques de confidentialité s'appliquent :
– Gumroad : gumroad.com/privacy– Lemon Squeezy : lemonsqueezy.com/privacy
4. Cookies et suivi
Ce site n'utilise actuellement aucun cookie, outil d'analyse ou pixel de suivi.
5. Hébergement
Cette application est hébergée par Vercel Inc. Lors de l'accès à la page, les données de connexion techniquement nécessaires (p. ex. adresse IP) sont traitées par l'hébergeur. Plus d'infos : vercel.com/legal/privacy-policy
6. Tes droits
Tu as le droit à tout moment d'accéder à tes données, de les corriger, de les supprimer et d'en restreindre le traitement, ainsi que le droit de déposer une plainte auprès d'une autorité de protection des données. Contact : inshapemind@outlook.com
7. Modifications
Cette politique de confidentialité peut être mise à jour à mesure que l'application évolue (p. ex. ajout de suivi ou de newsletter).`,
  },
};
// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Blueprint() {
  const [lang, setLang] = useState("DE");
  const [selected, setSelected] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [legalPage, setLegalPage] = useState(null); // null | "impressum" | "privacy"
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [checkedStorage, setCheckedStorage] = useState(false);
  const CORRECT_PASSWORD = "Builtnotborn26";
  const STORAGE_KEY = "bnb_unlocked";
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setIsUnlocked(true);
      }
    } catch (e) {
      // localStorage unavailable — fall back to session-only unlock
    }
    setCheckedStorage(true);
  }, []);
  const handlePasswordSubmit = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setPasswordInput("");
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch (e) {
        // localStorage unavailable — unlock still works for this session
      }
    } else {
      alert("Incorrect access code. Please try again.");
      setPasswordInput("");
    }
  };
  const t = T[lang];
  const goals = GOALS[lang] || GOALS.EN;
  const goal = goals.find(g => g.id === selected);
  const toggleExpand = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  const selectGoal = (id) => { setSelected(id); setActiveSection(0); setExpanded({}); };
  const goBack = () => { setSelected(null); setExpanded({}); };
  const legal = LEGAL[lang] || LEGAL.EN;
  // Avoid flashing the lock screen while we check localStorage
  if (!checkedStorage) {
    return <div style={{ minHeight: "100vh", background: "#080808" }} />;
  }
  // ── LOCK SCREEN ─────────────────────────────────────────────────────────
  if (!isUnlocked) {
    return (
      <div style={{
        minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#fff", padding: "20px"
      }}>
        <div style={{ maxWidth: 360, textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(42px, 11vw, 68px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em",
            background: "linear-gradient(135deg,#fff 0%,#666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 24
          }}>BUILT<br/>NOT<br/>BORN</div>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.6 }}>
            Enter your access code to unlock the Blueprint
          </div>
          <input
            type="password"
            placeholder="Access code"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
            style={{
              width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 14,
              outline: "none"
            }}
          />
          <button onClick={handlePasswordSubmit} style={{
            width: "100%", padding: "14px 16px", background: "#E8FF3B", color: "#000", border: "none",
            borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
          }}>
            UNLOCK
          </button>
          <div style={{ marginTop: 24, fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>
            {"THE BLUEPRINT FOUNDATION\u2122"}
          </div>
        </div>
      </div>
    );
  }
  const FooterLinks = ({ accent }) => (
    <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 18, fontSize: 11, color: "#333" }}>
      <span onClick={() => setLegalPage("impressum")} style={{ cursor: "pointer", textDecoration: "underline", textDecorationColor: "#222" }}>{t.impressum}</span>
      <span onClick={() => setLegalPage("privacy")} style={{ cursor: "pointer", textDecoration: "underline", textDecorationColor: "#222" }}>{t.privacy}</span>
    </div>
  );
  // ── LEGAL PAGE ──────────────────────────────────────────────────────────
  if (legalPage) {
    const isImpressum = legalPage === "impressum";
    const title = isImpressum ? legal.impressumTitle : legal.privacyTitle;
    const body = isImpressum ? legal.impressumBody : legal.privacyBody;
    return (
      <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#fff" }}>
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(8,8,8,0.94)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "12px 18px", display: "flex", alignItems: "center", gap: 12
        }}>
          <button onClick={() => setLegalPage(null)} style={{
            background: "rgba(255,255,255,0.06)", border: "none", color: "#666",
            width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "inherit"
          }}>{t.back}</button>
          <div style={{ fontSize: 16, fontWeight: 800 }}>{title}</div>
        </div>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 20px 60px" }}>
          <div style={{
            color: "#888", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14, padding: "20px"
          }}>{body}</div>
          <div style={{ marginTop: 28, textAlign: "center", fontSize: 10, color: "#1a1a1a", letterSpacing: "0.1em" }}>{t.brand} 
        </div>
      </div>
    );
  }
  // ── HOME ────────────────────────────────────────────────────────────────
  if (!selected) {
    return (
      <div style={{
        minHeight: "100vh", background: "#080808",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: "#fff", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "fixed", inset: 0, opacity: 0.025,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{ textAlign: "center", maxWidth: 420, width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 32 }}>
            {Object.entries(LANGS).map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)} style={{
                padding: "5px 11px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 700, fontFamily: "inherit",
                background: lang === code ? "#fff" : "rgba(255,255,255,0.07)",
                color: lang === code ? "#000" : "#555", transition: "all 0.15s"
              }}>{label}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "#444", marginBottom: 28, fontWeight: 500 }}>{t.brand}</div>
          <div style={{ marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(10px,2.5vw,18px)", flexWrap: "nowrap" }}>
            <span style={{ display: "inline-block", fontSize: "clamp(38px,11vw,72px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", background: "linear-gradient(135deg,#fff 0%,#666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BUILT</span>
            <span style={{ fontSize: "clamp(11px,2.6vw,15px)", color: "#333", letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}>NOT</span>
            <span style={{ display: "inline-block", fontSize: "clamp(38px,11vw,72px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", background: "linear-gradient(135deg,#fff 0%,#666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BORN</span>
          </div>
          <p style={{ color: "#444", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>{t.tagline}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {goals.map((g) => (
              <button key={g.id} onClick={() => selectGoal(g.id)} style={{
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "18px 20px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                transition: "all 0.2s", width: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.055)"; e.currentTarget.style.transform = "translateX(3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: g.color + "12", border: `1px solid ${g.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, color: g.color }}>{g.icon}</div>
                <div>
                  <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{g.label}</div>
                  <div style={{ color: "#444", fontSize: 12 }}>{g.sub}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#2a2a2a", fontSize: 16 }}>{"\u2192"}</div>
              </button>
            ))}
          </div>
          {/* Trust block — expandable */}
          <div style={{
            marginTop: 32,
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 18, overflow: "hidden",
            position: "relative", textAlign: "left"
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 120, height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,255,59,0.08), transparent 70%)",
              pointerEvents: "none"
            }} />
            <button onClick={() => setAboutOpen(o => !o)} style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              padding: "20px 22px", display: "flex", alignItems: "center", gap: 12,
              textAlign: "left", fontFamily: "inherit", position: "relative", zIndex: 1
            }}>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 800, letterSpacing: "0.05em", color: "#ccc" }}>{t.aboutTitle}</div>
              <div style={{ color: "#2a2a2a", fontSize: 16, transition: "transform 0.2s", transform: aboutOpen ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</div>
            </button>
            {aboutOpen && (
              <div style={{ padding: "0 22px 24px", position: "relative", zIndex: 1 }}>
                <div style={{ color: "#777", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line" }}>{t.trustBody}</div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 32, fontSize: 11, color: "#1e1e1e", letterSpacing: "0.08em" }}>{t.foundation}</div>
          <FooterLinks />
        </div>
      </div>
    );
  }
  // ── DETAIL ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#fff" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${goal.color},transparent)`, zIndex: 100 }} />
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={goBack} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#666", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "inherit" }}>{t.back}</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.2em", textTransform: "uppercase" }}>BLUEPRINT</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: goal.color, letterSpacing: "-0.01em" }}>{goal.label}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {Object.keys(LANGS).map(code => (
            <button key={code} onClick={() => { setLang(code); setSelected(null); }} style={{ padding: "3px 8px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, fontFamily: "inherit", background: lang === code ? goal.color + "20" : "transparent", color: lang === code ? goal.color : "#333" }}>{code}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 18px 80px" }}>
        <div style={{ background: `linear-gradient(135deg,${goal.color}0d,transparent)`, border: `1px solid ${goal.color}18`, borderRadius: 18, padding: "20px", marginBottom: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: goal.color, marginBottom: 6, textTransform: "uppercase" }}>{t.yourFocus}</div>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 4 }}>{goal.label}</div>
          <div style={{ color: "#555", fontSize: 13, lineHeight: 1.5 }}>{goal.sub}</div>
        </div>
        <div style={{ display: "flex", gap: 7, marginBottom: 20, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {goal.sections.map((s, i) => (
            <button key={i} onClick={() => { setActiveSection(i); setExpanded({}); }} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: activeSection === i ? goal.color + "1a" : "rgba(255,255,255,0.04)", color: activeSection === i ? goal.color : "#444", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.15s", outline: activeSection === i ? `1px solid ${goal.color}40` : "1px solid transparent", fontFamily: "inherit" }}>{s.title}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {goal.sections[activeSection].content.map((item, i) => {
            const key = `${activeSection}-${i}`;
            const open = expanded[key];
            const showCalc = open && item.calc;
            return (
              <div key={key} style={{ background: open ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)", border: `1px solid ${open ? goal.color + "28" : "rgba(255,255,255,0.05)"}`, borderRadius: 14, overflow: "hidden", transition: "all 0.2s" }}>
                <button onClick={() => toggleExpand(key)} style={{ width: "100%", background: "none", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", fontFamily: "inherit" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 5, background: open ? goal.color : "#252525", flexShrink: 0, transition: "background 0.2s" }} />
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: open ? "#fff" : "#aaa", lineHeight: 1.3 }}>{item.heading}</div>
                  <div style={{ color: "#2a2a2a", fontSize: 16, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</div>
                </button>
                {open && (
                  <div style={{ padding: "0 18px 18px 37px" }}>
                    <div style={{ color: "#777", fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>{item.body}</div>
                    <div style={{ background: goal.color + "0c", border: `1px solid ${goal.color}1a`, borderRadius: 10, padding: "14px 16px", fontSize: 12.5, color: "#999", lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: showCalc ? 0 : 0 }}>{item.action}</div>
                    {showCalc && item.calc === "cut" && <CalcCut color={goal.color} lang={lang} />}
                    {showCalc && item.calc === "build" && <CalcBuild color={goal.color} lang={lang} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
          {goal.sections.map((_, i) => (
            <div key={i} onClick={() => { setActiveSection(i); setExpanded({}); }} style={{ width: i === activeSection ? 18 : 5, height: 5, borderRadius: 3, background: i === activeSection ? goal.color : "#1a1a1a", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <div style={{ marginTop: 36, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "22px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#333", marginBottom: 10, textTransform: "uppercase" }}>{t.moreComingSoon}</div>
          <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6 }}>{t.appSoon}</div>
          <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6, marginBottom: 18 }}>{t.appDesc}</div>
          <div style={{ display: "inline-block", padding: "11px 22px", background: goal.color, color: "#000", borderRadius: 10, fontSize: 12, fontWeight: 900, letterSpacing: "0.07em", cursor: "pointer" }}>{t.notify}</div>
        </div>
        <div style={{ marginTop: 28, textAlign: "center", fontSize: 10, color: "#1a1a1a", letterSpacing: "0.1em" }}>{t.brand} 
        <FooterLinks />
      </div>
    </div>
  );
}
