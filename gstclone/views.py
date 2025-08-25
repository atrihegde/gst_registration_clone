from django.shortcuts import render, redirect
from registration.models import Registration

def home(request):
    return render(request, 'index.html')

def data(request):
    data = Registration.objects.all()
    context = {
        'data' : data
    }
    return render(request, 'data.html', context)