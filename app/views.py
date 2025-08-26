from .models import Registration
from django.shortcuts import get_object_or_404, render, redirect

def home(request):
    return render(request, 'index.html')

def registration_view(request):
    if request.method == 'POST':
        Registration.objects.create(
            registrationType=request.POST.get('registrationType'),
            userType=request.POST.get('userType'),
            state_ut=request.POST.get('state_ut'),
            district=request.POST.get('district'),
            legalBusinessName=request.POST.get('legalBusinessName'),
            panNumber=request.POST.get('panNumber', '').strip(),
            email=request.POST.get('email'),
        )
        return redirect('/')  # Redirect after saving
    return render(request, 'registration.html')

def trn_registration_view(request):
    if request.method == 'POST':
        # handle TRN form submission
        trn = request.POST.get('trn')
        captcha = request.POST.get('captcha_trn')
        return redirect('/')  # redirect after submission
    return render(request, 'trn_registration.html')


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