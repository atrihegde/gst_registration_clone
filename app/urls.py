from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('new/', views.registration_view, name='registration'),       
    path('trn/', views.trn_registration_view, name='trn_registration'), 
    path('data/', views.data, name='data'),
    path('data/<int:pk>/', views.edit, name='edit')
]