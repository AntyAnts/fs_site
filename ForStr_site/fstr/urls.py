from django.contrib import admin
from django.urls import path
from .views import index
from .views import write_card
from .views import delete_card
from .views import get_card
from .views import upload
from .views import delete_file
from .views import set_coords
from .views import get_coords
from .views import change_title
from .views import send_photo
from .views import get_photo
urlpatterns = [
    path('', index),
    path('write_card',write_card),
    path('delete_card',delete_card),
    path('get_card',get_card),
    path('upload',upload),
    path('delete_file',delete_file),
    path('set_coords',set_coords),
    path('get_coords',get_coords),
    path('change_title',change_title),
    path('send_photo',send_photo),
    path('get_photo',get_photo)
]