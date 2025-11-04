# AWJ Kalkulačka (Abrasive Water Jet Calculator)

Profesionální webová kalkulačka pro výpočet parametrů abrasivního vodního paprsku (AWJ).

## 🌟 Funkce

- **Výpočet provozních parametrů:**
  - Průtok vody (l/min)
  - Rychlost řezání (mm/min)
  - Čas řezu
  - Spotřeba vody, abrasiva a elektřiny

- **Ekonomická analýza:**
  - Náklady na vodu
  - Náklady na abrasivo
  - Náklady na elektřinu
  - Celkové náklady na řez
  - Náklady na metr řezu

- **Podporované materiály:**
  - Ocel
  - Nerezová ocel
  - Hliník
  - Titan
  - Sklo
  - Kámen
  - Keramika

- **Úrovně kvality řezu:**
  - Q1 - Separační řez (nejrychlejší)
  - Q3 - Hrubý řez
  - Q5 - Standardní řez
  - Q7 - Přesný řez (nejpomalejší, nejvyšší kvalita)

## 🚀 Použití

1. Otevřete `index.html` v moderním webovém prohlížeči
2. Nastavte základní parametry stroje (tlak, průměr trysky, atd.)
3. Vyberte materiál a jeho tloušťku
4. Zadejte délku řezu a ekonomické parametry
5. Kalkulačka automaticky vypočítá všechny hodnoty při změně vstupů

## ⌨️ Klávesové zkratky

- `Ctrl/Cmd + Enter` - Vypočítat
- `Ctrl/Cmd + R` - Reset na výchozí hodnoty

## 📋 Parametry

### Základní parametry stroje
- **Tlak:** 100-620 MPa (výchozí: 380 MPa)
- **Průměr trysky:** 0.1-0.5 mm (výchozí: 0.33 mm)
- **Průměr fokusační trubice:** 0.5-2.0 mm (výchozí: 1.02 mm)
- **Průtok abrasiva:** 0-800 g/min (výchozí: 350 g/min)

### Materiál a řezání
- Výběr materiálu z přednastavených typů
- Tloušťka materiálu: 0.5-200 mm
- Kvalita řezu: Q1, Q3, Q5, Q7
- Délka řezu v metrech

### Ekonomické parametry
- Cena vody (Kč/m³)
- Cena abrasiva (Kč/kg)
- Cena elektřiny (Kč/kWh)
- Příkon stroje (kW)

## 🎨 Vlastnosti

- **Responzivní design** - funguje na PC, tabletech i mobilech
- **Automatické přepočítávání** - výsledky se aktualizují při změně vstupů
- **Moderní UI** - profesionální vzhled s barevným rozlišením výsledků
- **Validace vstupů** - automatická kontrola min/max hodnot
- **Tooltips** - nápověda u jednotlivých parametrů

## 💻 Technologie

- Čistý HTML5, CSS3 a JavaScript (žádné závislosti)
- CSS Grid a Flexbox pro layout
- Moderní ES6+ JavaScript
- Responzivní design s media queries

## 📝 Vzorce a výpočty

Kalkulačka používá odvětvové vzorce pro výpočet:

1. **Průtok vody:** `Q = C × d² × √P`
   - C = konstanta (0.6)
   - d = průměr trysky
   - P = tlak

2. **Rychlost řezání:** Komplexní vzorec zohledňující:
   - Tlak
   - Materiálovou konstantu
   - Tloušťku materiálu
   - Kvalitu řezu
   - Průtok abrasiva
   - Průměr fokusační trubice

3. **Spotřeba a náklady:** Přímý výpočet z času řezu a jednotkových cen

## ⚠️ Důležité upozornění

Všechny vypočítané hodnoty jsou orientační a mohou se lišit v závislosti na:
- Konkrétním typu AWJ stroje
- Stavu nástrojů (opotřebení)
- Kvalitě vstupních materiálů
- Podmínkách prostředí
- Nastavení konkrétního stroje

Pro přesné hodnoty vždy konzultujte dokumentaci vašeho AWJ stroje a proveďte testovací řezy.

## 📄 Licence

Tento projekt je k dispozici pro vzdělávací a komerční účely.

## 🔧 Instalace

Není potřeba žádná instalace - stačí stáhnout soubory a otevřít `index.html` v prohlížeči.

```bash
# Klonování repozitáře
git clone https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL.git

# Otevření v prohlížeči
cd AWJ-CALCULATOR-FINAL
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## 👨‍💻 Autor

Vytvořeno pro profesionální použití v oblasti AWJ řezání.

---

**Verze:** 1.0.0
**Poslední aktualizace:** Listopad 2025
