# Návod na nasazení AWJ PWA aplikace

## 📋 Obsah
1. [Lokální vývoj](#lokální-vývoj)
2. [Nasazení na PythonAnywhere](#nasazení-na-pythonanywhere)
3. [Konfigurace PWA](#konfigurace-pwa)
4. [Testování](#testování)

---

## 🖥️ Lokální vývoj

### Požadavky
- Python 3.8 nebo vyšší
- pip (správce balíčků Pythonu)

### Krok 1: Naklonování repozitáře

```bash
git clone https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL.git
cd AWJ-CALCULATOR-FINAL
```

### Krok 2: Vytvoření virtuálního prostředí (doporučeno)

```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Krok 3: Instalace závislostí

```bash
pip install -r requirements.txt
```

### Krok 4: Migrace databáze

```bash
python manage.py migrate
```

### Krok 5: Shromáždění statických souborů

```bash
python manage.py collectstatic --noinput
```

### Krok 6: Vytvoření superuživatele (volitelné)

```bash
python manage.py createsuperuser
```

### Krok 7: Spuštění vývojového serveru

```bash
python manage.py runserver
```

Aplikace bude dostupná na: **http://127.0.0.1:8000/**

---

## 🌐 Nasazení na PythonAnywhere

### Krok 1: Registrace na PythonAnywhere

1. Jděte na [https://www.pythonanywhere.com](https://www.pythonanywhere.com)
2. Zaregistrujte si bezplatný účet (nebo si zakupte placený účet pro vlastní doménu)

### Krok 2: Nahrání kódu

**Možnost A: Přes Git (doporučeno)**

```bash
# V Bash konzoli PythonAnywhere
git clone https://github.com/valicekjan3/AWJ-CALCULATOR-FINAL.git
cd AWJ-CALCULATOR-FINAL
```

**Možnost B: Přes Files tab**

Nahrajte soubory ručně přes Files tab v PythonAnywhere dashboardu.

### Krok 3: Vytvoření virtuálního prostředí

V Bash konzoli PythonAnywhere:

```bash
cd ~/AWJ-CALCULATOR-FINAL
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Krok 4: Konfigurace Web App

1. Jděte na **Web** tab
2. Klikněte na **Add a new web app**
3. Vyberte **Manual configuration**
4. Vyberte **Python 3.10** (nebo novější)

### Krok 5: Nastavení WSGI souboru

1. Na Web tab klikněte na odkaz **WSGI configuration file**
2. Smažte veškerý obsah a nahraďte ho tímto:

```python
import os
import sys

# Cesta k vašemu projektu
path = '/home/VASE_UZIVATELSKE_JMENO/AWJ-CALCULATOR-FINAL'
if path not in sys.path:
    sys.path.append(path)

# Nastavení Django settings modulu
os.environ['DJANGO_SETTINGS_MODULE'] = 'awj_project.settings'

# Import Django WSGI aplikace
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

**⚠️ Důležité:** Nahraďte `VASE_UZIVATELSKE_JMENO` svým skutečným uživatelským jménem na PythonAnywhere!

### Krok 6: Nastavení virtuálního prostředí

Na Web tab:

1. Najděte sekci **Virtualenv**
2. Zadejte cestu: `/home/VASE_UZIVATELSKE_JMENO/AWJ-CALCULATOR-FINAL/venv`

### Krok 7: Nastavení statických souborů

Na Web tab v sekci **Static files** přidejte:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/VASE_UZIVATELSKE_JMENO/AWJ-CALCULATOR-FINAL/staticfiles` |

### Krok 8: Aktualizace Django settings

V souboru `awj_project/settings.py`:

```python
# Pro produkci nastavte:
DEBUG = False

# Povolené hosty
ALLOWED_HOSTS = ['VASE_UZIVATELSKE_JMENO.pythonanywhere.com']

# Bezpečnostní klíč - vygenerujte nový!
SECRET_KEY = 'vase-novy-tajny-klic'
```

**🔐 Generování nového SECRET_KEY:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Krok 9: Migrace a collectstatic

V Bash konzoli:

```bash
cd ~/AWJ-CALCULATOR-FINAL
source venv/bin/activate
python manage.py migrate
python manage.py collectstatic --noinput
```

### Krok 10: Reload aplikace

Na Web tab klikněte na velké zelené tlačítko **Reload**.

### Krok 11: Ověření

Navštivte: `https://VASE_UZIVATELSKE_JMENO.pythonanywhere.com`

---

## 📱 Konfigurace PWA

### Testování PWA funkcionality

1. **Otevřete aplikaci v prohlížeči Chrome/Edge**
2. **Zkontrolujte instalační prompt** - měl by se objevit banner pro instalaci aplikace
3. **Testujte offline režim**:
   - Otevřete DevTools (F12)
   - Jděte na Network tab
   - Zaškrtněte "Offline"
   - Obnovte stránku - aplikace by měla fungovat offline

### Lighthouse audit

Pro kontrolu PWA kvality:

1. Otevřete DevTools (F12)
2. Jděte na **Lighthouse** tab
3. Vyberte **Progressive Web App**
4. Klikněte na **Generate report**

### HTTPS požadavek

⚠️ **PWA vyžaduje HTTPS!** PythonAnywhere automaticky poskytuje HTTPS pro všechny aplikace.

Pro lokální testování PWA použijte:
```bash
# Vytvoření SSL certifikátu pro localhost
python manage.py runserver_plus --cert-file cert.pem
```

Nebo použijte nástroj jako [ngrok](https://ngrok.com/) pro vytvoření HTTPS tunnelu.

---

## 🧪 Testování

### Funkční testy

```bash
python manage.py test
```

### Manuální testování

#### Testování kalkulačky:
1. Zadejte základní parametry stroje
2. Vyberte materiál a tloušťku
3. Nastavte ekonomické parametry
4. Klikněte na **Vypočítat**
5. Ověřte, že výsledky jsou zobrazeny správně

#### Testování PWA:
1. **Offline režim**: Vypněte internet a ověřte, že aplikace funguje
2. **Instalace**: Vyzkoušejte instalaci aplikace na plochu/home screen
3. **Ikony**: Zkontrolujte, že ikony aplikace se zobrazují správně

---

## 🔧 Běžné problémy a řešení

### Problém: Statické soubory se nenačítají

**Řešení:**
```bash
python manage.py collectstatic --noinput
# A pak Reload na PythonAnywhere Web tab
```

### Problém: 500 Internal Server Error

**Řešení:**
1. Zkontrolujte error logy na PythonAnywhere (Web tab → Error log)
2. Ujistěte se, že `DEBUG = False` a `ALLOWED_HOSTS` je správně nastaven
3. Ověřte, že všechny závislosti jsou nainstalovány

### Problém: PWA se neinstaluje

**Řešení:**
1. Ujistěte se, že používáte HTTPS
2. Zkontrolujte manifest.json v DevTools → Application → Manifest
3. Ověřte, že Service Worker je registrován v DevTools → Application → Service Workers

### Problém: Service Worker nefunguje

**Řešení:**
1. Vymažte cache v prohlížeči
2. Odregistrujte starý Service Worker v DevTools
3. Obnovte stránku (Ctrl+Shift+R)

---

## 📚 Další zdroje

- [Django dokumentace](https://docs.djangoproject.com/)
- [PythonAnywhere dokumentace](https://help.pythonanywhere.com/)
- [PWA dokumentace](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## 🆘 Podpora

Pokud máte problémy, otevřete issue na GitHubu nebo kontaktujte autora.

**Vytvořeno pro AWJ CALCULATOR PROJECT**
