from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls.resolvers import LocaleRegexDescriptor 
from .models import Str_obj
from django.conf import settings
from django.core import serializers
from .forms import FileUpl
def index(request): 
   cards = Str_obj.objects.all()
   return render(request,'index.html',{'cards':cards})
def write_card(request):
    try:
        new_obj = Str_obj(title=request.POST['obj_name'],comment=request.POST['obj_comment'])
        if str(request.POST['obj_name']) == '' or str(request.POST['obj_comment']) == '':
            
            return(HttpResponse('<h1>You send empty fields</h1>'))
        else:
            new_obj.save()
            return(redirect('/'))
    except:
            return(redirect('/'))
def delete_card(request):
    if request.method == 'POST':
        cards = Str_obj.objects.all()
        import json
        resp_data = json.loads(request.body.decode('utf-8'))
        for card in cards:
            if card.title == resp_data['title']:
                card.delete()
                return(redirect('/'))
def get_card(request):
    if request.method == 'POST':
        import json
        resp_data = json.loads(request.body.decode('utf-8'))
        cards = Str_obj.objects.all()
        for card in cards:
            if card.id == int(resp_data['obj_id']):
                resp = serializers.serialize('json',[card,])
                return HttpResponse(json.dumps(resp))
def upload(request):
    if request.method == 'POST':
        res = request.FILES
        return (print(res))
    
    
# Create your views here.
