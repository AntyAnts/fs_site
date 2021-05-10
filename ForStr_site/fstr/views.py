from django.shortcuts import render, redirect
from django.http import HttpResponse 
from .models import Str_obj
from django.conf import settings
def index(request): 
   cards = Str_obj.objects.all()
   return render(request,'index.html',{'cards':cards})
def write_card(request):
    new_obj = Str_obj(title=request.POST['obj_name'],comment=request.POST['obj_comment'])
    if str(request.POST['obj_name']) == '' or str(request.POST['obj_comment']) == '':
        
        return(HttpResponse('<h1>You send empty fields</h1>'))
    else:
        new_obj.save()
        return(redirect('/'))

# Create your views here.
