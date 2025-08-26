from django.shortcuts import get_object_or_404, render, redirect
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
    edit_data = get_object_or_404(Registration, pk=pk)
    if request.method == 'POST':
        edit_data.state_ut = request.POST.get('state_ut')
        edit_data.district = request.POST.get('district')
        edit_data.legalBusinessName = request.POST.get('legalBusinessName')
        edit_data.panNumber = request.POST.get('panNumber')
        edit_data.email = request.POST.get('email')
        edit_data.save()
        return redirect('data')
    
    else:
        context ={
            'edit_data' : edit_data
        }
    return render(request, 'edit_data.html', context)