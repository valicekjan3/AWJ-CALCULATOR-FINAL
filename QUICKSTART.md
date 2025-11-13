# 🚀 Rychlý start - AWJ PWA Kalkulačka

## Lokální spuštění (5 minut)

```bash
# 1. Naklonování repozitáře
git clone https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL.git
cd AWJ-CALCULATOR-FINAL

# 2. Instalace závislostí
pip install -r requirements.txt

# 3. Migrace databáze
python manage.py migrate

# 4. Shromáždění statických souborů
python manage.py collectstatic --noinput

# 5. Spuštění serveru
python manage.py runserver
```

Otevřete prohlížeč: **http://127.0.0.1:8000/**

---

## Nasazení na PythonAnywhere (10 minut)

### 1. Registrace a Git clone

```bash
# V PythonAnywhere Bash konzoli
git clone https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL.git
cd AWJ-CALCULATOR-FINAL
```

### 2. Virtuální prostředí a závislosti

```bash
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Django setup

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

### 4. Web App konfigurace

**Web tab → Add new web app → Manual configuration → Python 3.10**

**WSGI soubor** (nahraďte `USERNAME`):

```python
import os
import sys

path = '/home/USERNAME/AWJ-CALCULATOR-FINAL'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'awj_project.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

**Virtualenv:** `/home/USERNAME/AWJ-CALCULATOR-FINAL/venv`

**Static files:**
- URL: `/static/`
- Directory: `/home/USERNAME/AWJ-CALCULATOR-FINAL/staticfiles`

### 5. Settings update

V `awj_project/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['USERNAME.pythonanywhere.com']
SECRET_KEY = 'novy-tajny-klic'  # Vygenerujte nový!
```

### 6. Reload

**Web tab → Reload**

Hotovo! 🎉

---

## Struktura projektu

```
AWJ-CALCULATOR-FINAL/
├── awj_project/          # Django projekt
│   ├── settings.py       # Konfigurace
│   ├── urls.py          # URL routing
│   └── wsgi.py          # WSGI konfigurace
├── awj_app/             # Django aplikace
│   ├── templates/       # HTML šablony
│   │   └── awj_app/
│   │       ├── index.html           # Hlavní stránka
│   │       └── service-worker.js    # Service Worker
│   ├── static/          # Statické soubory
│   │   └── awj_app/
│   │       ├── css/
│   │       │   └── styles.css
│   │       ├── js/
│   │       │   └── script.js
│   │       └── icons/   # PWA ikony
│   ├── views.py         # View funkce
│   └── urls.py          # URL konfigurace
├── manage.py            # Django management
├── requirements.txt     # Python závislosti
├── DEPLOY.md           # Detailní návod
└── QUICKSTART.md       # Tento soubor
```

---

## Klíčové soubory

### 1. awj_app/views.py
- `index()` - Hlavní stránka kalkulačky
- `manifest()` - PWA manifest
- `service_worker()` - Service Worker pro offline režim

### 2. awj_app/templates/awj_app/index.html
- Kompletní HTML šablona s PWA podporou
- Instalační prompt
- Online/Offline indikátor

### 3. awj_app/templates/awj_app/service-worker.js
- Cache strategie
- Offline podpora
- Automatická aktualizace cache

### 4. awj_project/settings.py
- `INSTALLED_APPS` - obsahuje 'awj_app'
- `ALLOWED_HOSTS` - nastavit pro produkci
- `STATIC_ROOT` - pro collectstatic

---

## PWA funkce

✅ **Offline režim** - aplikace funguje i bez internetu
✅ **Instalace** - možnost nainstalovat jako mobilní aplikaci
✅ **Ikony** - 8 velikostí ikon pro různá zařízení
✅ **Manifest** - plná PWA konfigurace
✅ **Service Worker** - automatické cachování

---

## Testování PWA

```bash
# Chrome DevTools (F12)
# → Lighthouse → Progressive Web App → Generate report
```

Měli byste vidět skóre 90+ 🎯

---

## Potřebujete pomoc?

📖 Podrobný návod: `DEPLOY.md`
🐛 Issues: [GitHub Issues](https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL/issues)
📧 Email: kontakt autora

---

**Happy coding! 💻🌊**
