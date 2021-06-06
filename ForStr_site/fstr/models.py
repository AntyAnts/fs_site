from django.db import models
from django import forms
from django.conf import settings


# id
# title
# comment
# img
# create_date

class Str_obj(models.Model):
    title = models.CharField(max_length=100,unique=True)
    comment = models.TextField(blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
    img_obj = models.ImageField(upload_to = 'img_obj',max_length = 500, blank=True)
    files_ls = models.FileField(upload_to='documents',default='some text')
    coords = models.CharField(max_length=100)
    img_url = models.URLField(max_length=100)



# Create your models here.
