from django.shortcuts import render, redirect
from django.http import HttpResponse 
from .models import Str_obj
from django.conf import settings
from json import dumps
def index(request): 
   cards = Str_obj.objects.all()
   class dict_cards_add(dict):
  
        # __init__ function
        def __init__(self):
            self = dict()
            
        # Function to add key:value
        def add(self, key, value):
            self[key] = value
    
   dict_cards = dict_cards_add()
   i = 0
   while i < cards.__len__():
       dict_cards.add('title' + str(i),cards[i].title)
       dict_cards.add('comment' + str(i),cards[i].comment)
       i += 1
   
   
   return render(request,'index.html',{'cards':cards,'dict_cards':dict_cards})
def write_card(request):
    new_obj = Str_obj(title=request.POST['obj_name'],comment=request.POST['obj_comment'])
    if str(request.POST['obj_name']) == '' or str(request.POST['obj_comment']) == '':
        
        return(HttpResponse('<h1>You send empty fields</h1>'))
    else:
        new_obj.save()
        return(redirect('/'))

# Create your views here.
