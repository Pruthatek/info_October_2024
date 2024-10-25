from pyexpat import model
from django.db import models

class Otp(models.Model):
    sno = models.AutoField(primary_key=True)
    username = models.CharField( max_length=50)
    otp_user = models.CharField(max_length=4)

    
    def __str__(self):
        return self.otp_user