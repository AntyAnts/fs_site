from django.contrib import admin
from django.urls import path
from .views import index
from .views import write_card
from .views import delete_card
from .views import get_card
from .views import upload
from .views import delete_file

urlpatterns = [
    path('', index),
    path('write_card',write_card),
    path('delete_card',delete_card),
    path('get_card',get_card),
    path('upload',upload),
    path('delete_file',delete_file)
]