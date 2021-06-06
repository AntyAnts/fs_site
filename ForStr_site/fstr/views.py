import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, request
from django.urls.resolvers import LocaleRegexDescriptor 
from .models import Str_obj
from django.conf import settings
from django.core import serializers
from django.core.files.storage import FileSystemStorage, Storage
from django.core.files.storage import default_storage
from urllib.parse import unquote


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
                folder = "fstr/static/file_folder/"+ str(card.id)
                
                try:
                    fs = FileSystemStorage(location=folder,base_url=folder)
                    fs_urls = []
                    for f in fs.listdir("")[1]:
                        fs_urls.append(fs.url(f))
                    resp = serializers.serialize('json',[card,])
                    fs_f = json.dumps({'list_files':fs_urls})
                    return HttpResponse(json.dumps({'resp':resp,'files':fs_f}))
                except:
                    resp = serializers.serialize('json',[card,])
                    return HttpResponse(json.dumps({'resp':resp}))

def upload(request):
    if request.method == 'POST':
        print(request.FILES['media'])
        print(request.POST['title'])
        cards = Str_obj.objects.all()
        for card in cards:
            if card.title == request.POST['title']:
                folder = "fstr/static/file_folder/"+ str(card.id)
                file = request.FILES['media']
                fs = FileSystemStorage(location=folder,base_url=folder)
                filename = fs.save(file.name,file)
                file_url = fs.url(filename)
                print(file_url)
                return(HttpResponse('OK'))
                
def delete_file(request):
    if request.method == "POST":
        
        for obj in Str_obj.objects.all():
            print(obj.id)
            print(str(request.POST['id']))
            if str(obj.id) == str(request.POST['id']):
                print('OK')
                folder = "fstr/static/file_folder/"+ str(obj.id)
                fs = FileSystemStorage(location=folder,base_url=folder)
                print(fs.listdir('')[1])
                for f in fs.listdir('')[1]:
                    print(f)
                    if str(f) == unquote(str(request.POST['file'])):
                        default_storage.delete("fstr/static/file_folder/"+ str(obj.id) + '/' + unquote(str(request.POST['file'])))
                        print('OK')
                        return HttpResponse('OK')
def set_coords(request):
    if request.method == "POST":
        coords = request.POST['coords'].split(',')
        cards = Str_obj.objects.all()
        for card in cards:
            if str(card.id) == str(request.POST['id']):
                card.coords = request.POST['coords'].split(',')
                card.save()
                return HttpResponse('ok')
def get_coords(request):
    if request.method == "POST":
        import json
        cards = Str_obj.objects.all()
        for card in cards:
            if str(card.id) == str(request.POST['id']):
                return HttpResponse(json.dumps(card.coords))      
def change_title(request):
    if request.method == "POST":
        cards = Str_obj.objects.all()
        print(request.POST['title'])
        for card in cards:
            if str(card.id) == str(request.POST['id']):
                card.title = str(request.POST['title'])
                card.comment = str(request.POST['comment'])
                card.save()
                print(card.title)
                return(redirect('/'))
def send_photo(request):
    if request.method == 'POST':
        print(request.FILES['file'])
        cards = Str_obj.objects.all()
        for card in cards:
            if str(card.id) == str(request.POST['id']):
                print("OK OK OK OK OK")
                folder = "fstr/static/file_folder/"+ str(card.id) + "/" + "img"
                file = request.FILES['file']
                fs = FileSystemStorage(location=folder,base_url=folder)
                filename = fs.save(file.name,file)
                file_url = fs.url(filename)
                card.img_url = file_url[4:]
                card.save()
                print(card.img_url)
                return HttpResponse('ok')
def get_photo(request):
    if request.method == 'POST':
        cards = Str_obj.objects.all()
        for card in cards:
            if str(card.id) == str(request.POST['id']):
                return HttpResponse(json.dumps(card.img_url))
    
# Create your views here.
