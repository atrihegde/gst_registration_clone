from django.shortcuts import render, redirect
from .models import Registration

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

def fetch_data(request):
    data = Registration.objects.all()
    return render(request, 'data.html', 
        {'data':data})
