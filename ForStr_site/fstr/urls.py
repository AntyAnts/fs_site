from django.contrib import admin
from django.urls import path
from fstr.views import index
from .views import write_card

urlpatterns = [
    path('', index),
    path('write_card',write_card)
]