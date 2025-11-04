# 📖 Instrukce k použití AWJ Kalkulačky

## 🚀 Jak spustit kalkulačku

### Metoda 1: Použití awj-complete.html (DOPORUČENO)
Toto je nejjednodušší způsob - **100% garantovaná funkčnost**:

1. Otevřete soubor `awj-complete.html` ve vašem webovém prohlížeči
2. Kalkulačka se automaticky načte a provede první výpočet
3. Hotovo! Kalkulačka funguje okamžitě

**Jak otevřít:**
- **Windows:** Dvojklik na `awj-complete.html` NEBO pravý klik → Otevřít pomocí → Vyberte prohlížeč (Chrome, Firefox, Edge)
- **Mac:** Dvojklik na `awj-complete.html` NEBO pravý klik → Otevřít v aplikaci → Vyberte prohlížeč
- **Linux:** Pravý klik → Otevřít v prohlížeči NEBO přetáhněte soubor do okna prohlížeče

### Metoda 2: Použití index.html
Tato metoda používá samostatné soubory (HTML, CSS, JS):

1. Ujistěte se, že máte všechny tři soubory ve stejné složce:
   - `index.html`
   - `styles.css`
   - `script.js`
2. Otevřete soubor `index.html` ve webovém prohlížeči
3. Kalkulačka se načte a automaticky provede výpočet

## 💡 Jak používat kalkulačku

### 1. Zadání základních parametrů
- **Tlak (MPa):** Nastavte pracovní tlak vašeho AWJ stroje (100-620 MPa)
- **Průměr trysky (mm):** Průměr safírové/diamantové trysky (0.1-0.5 mm)
- **Průměr fokusační trubice (mm):** Průměr trubice pro abrasivo (0.5-2.0 mm)
- **Průtok abrasiva (g/min):** Hmotnostní průtok abrasiva (0-800 g/min)

### 2. Výběr materiálu a nastavení řezání
- **Materiál:** Vyberte materiál ze seznamu (Ocel, Nerez, Hliník, Titan, Sklo, Kámen, Keramika)
- **Tloušťka materiálu (mm):** Zadejte tloušťku materiálu (0.5-200 mm)
- **Kvalita řezu:** Vyberte požadovanou kvalitu:
  - Q1 - Separační řez (nejrychlejší, hrubý)
  - Q3 - Hrubý řez
  - Q5 - Standardní řez (doporučeno)
  - Q7 - Přesný řez (nejpomalejší, nejkvalitnější)
- **Délka řezu (m):** Zadejte celkovou délku řezu v metrech

### 3. Ekonomické parametry
- **Cena vody (Kč/m³):** Cena vodného ve vaší lokalitě
- **Cena abrasiva (Kč/kg):** Cena abrasivního materiálu
- **Cena elektřiny (Kč/kWh):** Cena elektrické energie
- **Příkon stroje (kW):** Elektrický příkon AWJ stroje

### 4. Výsledky
Kalkulačka automaticky vypočítá:
- ✅ Průtok vody (l/min)
- ✅ Rychlost řezání (mm/min)
- ✅ Čas řezu (sekundy/minuty/hodiny)
- ✅ Spotřebu vody, abrasiva a elektřiny
- ✅ Náklady na vodu, abrasivo a elektřinu
- ✅ **CELKOVÉ NÁKLADY** (zvýrazněno)
- ✅ **NÁKLADY NA METR** (Kč/m)

## 🎯 Speciální funkce

### Automatické přepočítávání
Kalkulačka automaticky přepočítá všechny hodnoty, když změníte jakýkoliv vstup. Není potřeba klikat na tlačítko "Vypočítat" (ale můžete, pokud chcete).

### Tlačítko "Reset"
Kliknutím na tlačítko "Reset" obnovíte všechny hodnoty na výchozí nastavení:
- Tlak: 380 MPa
- Tryska: 0.33 mm
- Fokusační trubice: 1.02 mm
- Abrasivo: 350 g/min
- Materiál: Ocel
- Tloušťka: 10 mm
- Kvalita: Q5 (standardní)
- Délka řezu: 1 m
- Všechny ekonomické parametry na běžné hodnoty

### Klávesové zkratky
- **Ctrl + Enter** (nebo Cmd + Enter na Mac): Přepočítat hodnoty
- **Ctrl + R** (nebo Cmd + R na Mac): Reset - POZOR! Funguje pouze když NENÍ fokus v žádném vstupním poli

## ⚠️ Řešení problémů

### Kalkulačka nezobrazuje výsledky
1. Zkontrolujte, že jste zadali platné hodnoty ve všech polích
2. Otevřete konzoli prohlížeče (F12) a podívejte se na případné chybové hlášky
3. Zkuste obnovit stránku (F5)
4. Zkuste použít `awj-complete.html` místo `index.html`

### Výsledky jsou "NaN" nebo "Infinity"
- Zkontrolujte, že všechna vstupní pole obsahují platná čísla
- Zkuste kliknout na tlačítko "Reset"
- Ujistěte se, že tloušťka materiálu a délka řezu nejsou nulové

### CSS nebo design nefunguje (pouze u index.html)
- Ujistěte se, že soubor `styles.css` je ve stejné složce jako `index.html`
- Použijte `awj-complete.html`, který má vše v jednom souboru

### JavaScript nefunguje (pouze u index.html)
- Ujistěte se, že soubor `script.js` je ve stejné složce jako `index.html`
- Zkontrolujte konzoli prohlížeče (F12) pro chybové zprávy
- Použijte `awj-complete.html`, který má vše v jednom souboru

## 📱 Mobilní zařízení

Kalkulačka je plně responzivní a funguje na:
- 📱 Mobilních telefonech
- 📱 Tabletech
- 💻 Noteboocích
- 🖥️ Desktop počítačích

## 🌐 Podporované prohlížeče

Kalkulačka funguje ve všech moderních prohlížečích:
- ✅ Google Chrome (doporučeno)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera

**Minimální verze:** Prohlížeč z roku 2020 nebo novější

## 📊 Přesnost výpočtů

⚠️ **DŮLEŽITÉ:** Všechny vypočítané hodnoty jsou **orientační** a slouží pro:
- Plánování výroby
- Odhad nákladů
- Srovnání různých parametrů
- Optimalizaci nastavení

Pro přesné hodnoty vždy:
1. Konzultujte dokumentaci vašeho AWJ stroje
2. Proveďte testovací řezy
3. Upravte parametry podle skutečných výsledků

## 🆘 Podpora

Pokud máte problémy:
1. Přečtěte si tuto dokumentaci
2. Zkontrolujte soubor `README.md` pro technické detaily
3. Otevřete konzoli prohlížeče (F12) a zkontrolujte chybové zprávy
4. Zkuste použít `awj-complete.html` - garantovaně funkční verze

## 🎓 Tipy pro použití

1. **Testovací řezy:** Porovnejte vypočítané hodnoty s reálnými výsledky a upravte parametry
2. **Ukládání nastavení:** Udělejte si poznámky o úspěšných nastaveních pro různé materiály
3. **Optimalizace nákladů:** Experimentujte s různými parametry pro nalezení optimálního poměru rychlost/kvalita/náklady
4. **Batch výpočty:** Pro více řezů použijte kalkulačku opakovaně a sečtěte celkové náklady

## ✨ Užitečné informace

- Kalkulačka funguje **offline** - není potřeba připojení k internetu
- Všechny výpočty probíhají **lokálně** ve vašem prohlížeči
- Žádná data se **nikam neodesílají**
- Je zcela **zdarma** k použití

---

**Vytvořeno:** 2025
**Verze:** 1.0.0
**Status:** ✅ Plně funkční
