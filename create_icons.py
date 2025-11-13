#!/usr/bin/env python3
"""
Skript pro vytvoření PWA ikon pro AWJ Kalkulačku
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Velikosti ikon pro PWA
ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# Cesty
ICON_DIR = 'awj_app/static/awj_app/icons'

# Vytvoření adresáře pokud neexistuje
os.makedirs(ICON_DIR, exist_ok=True)

def create_icon(size):
    """Vytvoří ikonu dané velikosti"""
    # Vytvoření obrázku s modrým pozadím
    img = Image.new('RGB', (size, size), color='#1976d2')
    draw = ImageDraw.Draw(img)

    # Přidání bílého textu "AWJ"
    try:
        # Pokusíme se použít výchozí font
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback na základní font
        font = ImageFont.load_default()

    # Text "AWJ"
    text = "AWJ"

    # Získání rozměrů textu
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Vycentrování textu
    x = (size - text_width) // 2
    y = (size - text_height) // 2

    # Vykreslení textu
    draw.text((x, y), text, fill='white', font=font)

    # Přidání malé vlny (vodní proud)
    wave_y = size * 2 // 3
    wave_points = []
    for i in range(0, size, 10):
        wave_points.append((i, wave_y + 5 * (1 if (i // 10) % 2 == 0 else -1)))

    if len(wave_points) > 1:
        draw.line(wave_points, fill='lightblue', width=max(2, size // 100))

    # Uložení ikony
    filename = f'{ICON_DIR}/icon-{size}x{size}.png'
    img.save(filename, 'PNG')
    print(f'Vytvořena ikona: {filename}')

if __name__ == '__main__':
    print('Vytváření ikon pro PWA...')
    for size in ICON_SIZES:
        create_icon(size)
    print('Všechny ikony byly vytvořeny!')
