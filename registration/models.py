# registration/models.py
from django.db import models

class Registration(models.Model):
    registrationType = models.CharField(max_length=100)
    userType = models.CharField(max_length=100)
    state_ut = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    legalBusinessName = models.CharField(max_length=255)
    panNumber = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return self.legalBusinessName
    
    class Meta:
        verbose_name = "Registration"
        verbose_name_plural = "Registrations"

# Add a separate model for TRN registrations
class TRNRegistration(models.Model):
    trn = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"TRN: {self.trn}"
    
    class Meta:
        verbose_name = "TRN Registration"
        verbose_name_plural = "TRN Registrations"