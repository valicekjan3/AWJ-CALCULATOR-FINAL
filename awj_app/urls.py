from django.urls import path
from . import views

app_name = 'awj_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('manifest.json', views.manifest, name='manifest'),
    path('service-worker.js', views.service_worker, name='service_worker'),
]
