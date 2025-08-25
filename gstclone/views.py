from django.shortcuts import render, redirect
from registration.models import Registration
from django.http import HttpResponse

def home(request):
    return render(request, 'index.html')

def data(request):
    data = Registration.objects.all()
    context = {
        'data' : data
    }
    return render(request, 'data.html', context)

def edit(request, pk):
    return HttpResponse("edit view working!")