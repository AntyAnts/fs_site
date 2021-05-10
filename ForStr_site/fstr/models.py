from django.db import models
from django import forms
from django.conf import settings


# id
# title
# comment
# img
# create_date

class Str_obj(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField(blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
    img_obj = models.ImageField(upload_to = 'img_obj',max_length = 500, blank=True)
    files_ls = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple':True}))



# Create your models here.