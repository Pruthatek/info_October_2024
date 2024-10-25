import datetime
from importlib.resources import contents
from multiprocessing import AuthenticationError
import os
# from turtle import mode, title
from django.db import models

# Create your models here.

# Create your models here.

def filepath(request, filename):
    old_filename = filename
    timeNow = datetime.datetime.now().strftime('%Y%m%d%H:%M:%S')
    filename = "%s%s" % (timeNow, old_filename)
    return os.path.join('uploads/', filename)

class BlogCategory(models.Model):
    slug = models.CharField(max_length=255)
    category_title = models.CharField(max_length=255)

    def __str__(self):
        return self.category_title


class Post(models.Model):
    title = models.CharField(max_length=255)
    author=models.CharField(max_length=14)
    Category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE)
    thumbnail = models.CharField(max_length=255, default="")
    timeStamp=models.DateField(blank=True, default=datetime.datetime.now)
    add_to_top = models.BooleanField(default=False)
    latest = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    

class Para(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)    
    status = models.CharField(max_length=50)
    sequence = models.IntegerField(default=1)
    content =models.TextField(max_length=50000,null=True)
    isDeleted = models.BooleanField(default=False)
    ad_field_image = models.CharField(max_length=255, default="", blank=False, null=False)
    ad_field_product_name = models.CharField(max_length=10, default="", blank=False, null=False)
    ad_field_price = models.CharField(max_length=10, default="", blank=True, null=True)
    ad_field_model = models.CharField(max_length=10, default="", blank=True, null=True)
    ad_field_link = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.sequence}th Para of {self.post.title}"