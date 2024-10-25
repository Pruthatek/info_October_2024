from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    
   path('', views.home, name='home'),
  # path('varification', views.varification, name='varification'),
   path('upload',views.upload_blog,name="upload_blog"),
    path('blog_<str:slug>', views.blogPost, name="blogPost"),
    path('declineblogs', views.decline_blogs, name="decline_blogs"),
    path('login', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
    path('bloguploadform/', views.blogupload, name='blogupload'),
]
