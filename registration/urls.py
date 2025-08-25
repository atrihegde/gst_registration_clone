from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.registration_view, name='registration'),       
    path('trn/', views.trn_registration_view, name='trn_registration'), 
]
