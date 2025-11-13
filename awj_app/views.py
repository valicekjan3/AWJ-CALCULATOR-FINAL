from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_GET
import json


def index(request):
    """Hlavní stránka AWJ kalkulačky"""
    return render(request, 'awj_app/index.html')


@require_GET
def manifest(request):
    """Vrací manifest.json pro PWA"""
    manifest_data = {
        "name": "AWJ Kalkulačka",
        "short_name": "AWJ Calc",
        "description": "Profesionální kalkulačka pro výpočet parametrů abrasivního vodního paprsku",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#1976d2",
        "orientation": "portrait-primary",
        "icons": [
            {
                "src": "/static/awj_app/icons/icon-72x72.png",
                "sizes": "72x72",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-96x96.png",
                "sizes": "96x96",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-128x128.png",
                "sizes": "128x128",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-144x144.png",
                "sizes": "144x144",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-152x152.png",
                "sizes": "152x152",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-384x384.png",
                "sizes": "384x384",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/static/awj_app/icons/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ]
    }
    return JsonResponse(manifest_data)


@require_GET
def service_worker(request):
    """Vrací service worker pro PWA"""
    return render(request, 'awj_app/service-worker.js', content_type='application/javascript')
