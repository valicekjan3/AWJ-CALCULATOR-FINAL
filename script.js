// AWJ Calculator - Script
// Konstanty a koeficienty pro výpočty

const MATERIAL_FACTORS = {
    steel: { hardness: 1.0, name: 'Ocel' },
    stainless: { hardness: 1.2, name: 'Nerezová ocel' },
    aluminum: { hardness: 0.6, name: 'Hliník' },
    titanium: { hardness: 1.5, name: 'Titan' },
    glass: { hardness: 0.8, name: 'Sklo' },
    stone: { hardness: 1.3, name: 'Kámen' },
    ceramic: { hardness: 1.4, name: 'Keramika' }
};

// Koeficienty kvality řezu
const QUALITY_FACTORS = {
    1: 4.0,   // Separační řez - nejrychlejší
    3: 2.5,   // Hrubý řez
    5: 1.0,   // Standardní řez
    7: 0.4    // Přesný řez - nejpomalejší
};

class AWJCalculator {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.calculate(); // Počáteční výpočet
    }

    initializeElements() {
        // Vstupní pole
        this.inputs = {
            pressure: document.getElementById('pressure'),
            orifice: document.getElementById('orifice'),
            focusTube: document.getElementById('focusTube'),
            abrasiveFlow: document.getElementById('abrasiveFlow'),
            material: document.getElementById('material'),
            thickness: document.getElementById('thickness'),
            quality: document.getElementById('quality'),
            cutLength: document.getElementById('cutLength'),
            waterCost: document.getElementById('waterCost'),
            abrasiveCost: document.getElementById('abrasiveCost'),
            electricityCost: document.getElementById('electricityCost'),
            machinePower: document.getElementById('machinePower')
        };

        // Výstupní pole
        this.outputs = {
            waterFlow: document.getElementById('waterFlow'),
            cuttingSpeed: document.getElementById('cuttingSpeed'),
            cuttingTime: document.getElementById('cuttingTime'),
            waterConsumption: document.getElementById('waterConsumption'),
            abrasiveConsumption: document.getElementById('abrasiveConsumption'),
            electricityConsumption: document.getElementById('electricityConsumption'),
            waterCostResult: document.getElementById('waterCostResult'),
            abrasiveCostResult: document.getElementById('abrasiveCostResult'),
            electricityCostResult: document.getElementById('electricityCostResult'),
            totalCost: document.getElementById('totalCost'),
            costPerMeter: document.getElementById('costPerMeter')
        };

        // Tlačítka
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }

    attachEventListeners() {
        // Automatický výpočet při změně jakéhokoliv vstupu
        Object.values(this.inputs).forEach(input => {
            input.addEventListener('input', () => this.calculate());
            input.addEventListener('change', () => this.calculate());
        });

        // Tlačítko Vypočítat
        this.calculateBtn.addEventListener('click', () => this.calculate());

        // Tlačítko Reset
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    calculate() {
        try {
            // Získání hodnot ze vstupů
            const pressure = parseFloat(this.inputs.pressure.value) || 0;
            const orifice = parseFloat(this.inputs.orifice.value) || 0;
            const focusTube = parseFloat(this.inputs.focusTube.value) || 0;
            const abrasiveFlow = parseFloat(this.inputs.abrasiveFlow.value) || 0;
            const materialFactor = parseFloat(this.inputs.material.value) || 1.0;
            const thickness = parseFloat(this.inputs.thickness.value) || 0;
            const qualityFactor = parseFloat(this.inputs.quality.value) || 1.0;
            const cutLength = parseFloat(this.inputs.cutLength.value) || 0;
            const waterCost = parseFloat(this.inputs.waterCost.value) || 0;
            const abrasiveCost = parseFloat(this.inputs.abrasiveCost.value) || 0;
            const electricityCost = parseFloat(this.inputs.electricityCost.value) || 0;
            const machinePower = parseFloat(this.inputs.machinePower.value) || 0;

            // Výpočet průtoku vody (l/min) - zjednodušený vzorec
            // Q = C * d² * √P, kde C je konstanta, d je průměr trysky, P je tlak
            const waterFlow = 0.6 * Math.pow(orifice, 2) * Math.sqrt(pressure);

            // Výpočet rychlosti řezání (mm/min)
            // Závislost na tlaku, materiálu, tloušťce, kvalitě a průtoku abrasiva

            // Základní rychlost řezání
            let baseSpeed = (pressure / 100) * (abrasiveFlow / 100) * qualityFactor;

            // Korekce podle tloušťky materiálu
            baseSpeed = baseSpeed / (Math.pow(thickness, 0.8) * materialFactor);

            // Korekce podle průměru fokusační trubice
            baseSpeed = baseSpeed * (focusTube / 1.0);

            const cuttingSpeed = Math.max(baseSpeed * 100, 1); // mm/min

            // Výpočet času řezu
            const cuttingTimeMinutes = (cutLength * 1000) / cuttingSpeed; // převod m na mm
            const cuttingTimeHours = cuttingTimeMinutes / 60;

            // Spotřeba vody (litry)
            const waterConsumption = waterFlow * cuttingTimeMinutes;

            // Spotřeba abrasiva (kg)
            const abrasiveConsumption = (abrasiveFlow * cuttingTimeMinutes) / 1000;

            // Spotřeba elektřiny (kWh)
            const electricityConsumption = machinePower * cuttingTimeHours;

            // Náklady
            const waterCostTotal = (waterConsumption / 1000) * waterCost; // litry na m³
            const abrasiveCostTotal = abrasiveConsumption * abrasiveCost;
            const electricityCostTotal = electricityConsumption * electricityCost;
            const totalCost = waterCostTotal + abrasiveCostTotal + electricityCostTotal;
            const costPerMeter = cutLength > 0 ? totalCost / cutLength : 0;

            // Zobrazení výsledků
            this.outputs.waterFlow.textContent = `${waterFlow.toFixed(2)} l/min`;
            this.outputs.cuttingSpeed.textContent = `${cuttingSpeed.toFixed(2)} mm/min`;
            this.outputs.cuttingTime.textContent = this.formatTime(cuttingTimeMinutes);
            this.outputs.waterConsumption.textContent = `${waterConsumption.toFixed(2)} l`;
            this.outputs.abrasiveConsumption.textContent = `${abrasiveConsumption.toFixed(2)} kg`;
            this.outputs.electricityConsumption.textContent = `${electricityConsumption.toFixed(2)} kWh`;
            this.outputs.waterCostResult.textContent = `${waterCostTotal.toFixed(2)} Kč`;
            this.outputs.abrasiveCostResult.textContent = `${abrasiveCostTotal.toFixed(2)} Kč`;
            this.outputs.electricityCostResult.textContent = `${electricityCostTotal.toFixed(2)} Kč`;
            this.outputs.totalCost.textContent = `${totalCost.toFixed(2)} Kč`;
            this.outputs.costPerMeter.textContent = `${costPerMeter.toFixed(2)} Kč/m`;

            // Animace výsledků
            this.animateResults();

        } catch (error) {
            console.error('Chyba při výpočtu:', error);
            this.showError();
        }
    }

    formatTime(minutes) {
        if (minutes < 1) {
            return `${(minutes * 60).toFixed(0)} s`;
        } else if (minutes < 60) {
            return `${minutes.toFixed(2)} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = Math.floor(minutes % 60);
            return `${hours} h ${mins} min`;
        }
    }

    animateResults() {
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s`;
            }, 10);
        });
    }

    showError() {
        Object.values(this.outputs).forEach(output => {
            output.textContent = 'Chyba';
            output.style.color = 'var(--danger-color)';
        });
    }

    reset() {
        // Reset na výchozí hodnoty
        this.inputs.pressure.value = 380;
        this.inputs.orifice.value = 0.33;
        this.inputs.focusTube.value = 1.02;
        this.inputs.abrasiveFlow.value = 350;
        this.inputs.material.value = '1.0';
        this.inputs.thickness.value = 10;
        this.inputs.quality.value = '1.0';
        this.inputs.cutLength.value = 1;
        this.inputs.waterCost.value = 100;
        this.inputs.abrasiveCost.value = 15;
        this.inputs.electricityCost.value = 5;
        this.inputs.machinePower.value = 50;

        // Přepočítání s výchozími hodnotami
        this.calculate();

        // Vizuální feedback
        this.resetBtn.textContent = '✓ Resetováno';
        setTimeout(() => {
            this.resetBtn.textContent = 'Reset';
        }, 1500);
    }
}

// Validace vstupů
function validateInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            const value = parseFloat(this.value);

            if (value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    });
}

// Info tooltip pro vstupní pole
function addTooltips() {
    const tooltips = {
        pressure: 'Pracovní tlak AWJ stroje (typicky 300-620 MPa)',
        orifice: 'Průměr safírové nebo diamantové trysky (0.1-0.5 mm)',
        focusTube: 'Průměr fokusační trubice pro abrasivo (0.5-2.0 mm)',
        abrasiveFlow: 'Hmotnostní průtok abrasivního materiálu (typicky 200-800 g/min)',
        thickness: 'Tloušťka řezaného materiálu',
        quality: 'Kvalita řezu ovlivňuje rychlost a drsnost povrchu',
        cutLength: 'Celková délka řezu v metrech'
    };

    Object.keys(tooltips).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltips[id];
        }
    });
}

// Export výsledků do CSV
function exportToCSV() {
    const calculator = window.awjCalculator;
    if (!calculator) return;

    const data = [];
    data.push(['AWJ Calculator - Výsledky výpočtu']);
    data.push(['Datum', new Date().toLocaleString('cs-CZ')]);
    data.push([]);
    data.push(['Vstupní parametry']);

    Object.keys(calculator.inputs).forEach(key => {
        const input = calculator.inputs[key];
        const label = input.previousElementSibling?.textContent || key;
        const value = input.value;
        data.push([label, value]);
    });

    data.push([]);
    data.push(['Výsledky']);

    Object.keys(calculator.outputs).forEach(key => {
        const output = calculator.outputs[key];
        const label = output.previousElementSibling?.textContent || key;
        const value = output.textContent;
        data.push([label, value]);
    });

    // Vytvoření CSV
    let csv = data.map(row => row.join(';')).join('\n');

    // Download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `awj_kalkulace_${Date.now()}.csv`;
    link.click();
}

// Klávesové zkratky
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter = Vypočítat
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('calculateBtn').click();
    }

    // Ctrl/Cmd + R = Reset (pouze pokud není focus na input)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('resetBtn').click();
    }
});

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    // Vytvoření instance kalkulátoru
    window.awjCalculator = new AWJCalculator();

    // Validace vstupů
    validateInputs();

    // Přidání tooltipů
    addTooltips();

    console.log('AWJ Kalkulačka inicializována');
    console.log('Klávesové zkratky:');
    console.log('  Ctrl/Cmd + Enter: Vypočítat');
    console.log('  Ctrl/Cmd + R: Reset');
});

// Zobrazení načítání
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
