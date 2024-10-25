from unicodedata import name
from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
   path('', views.admin_home, name='admin_home'),
   path('allblogs', views.allblogs, name='allblogs'),
   path('allblogs_blogpost<str:slug>', views.allblogs_blogpost, name='allblogs_blogpost'),
   
   path('createuser', views.signup, name='signup'),
   path('login', views.signin, name='signin'),
   path('signout', views.signout, name='signout'),
   path('blog_<str:slug>', views.blogPost, name="blogPost"),
   path('request-accepet/<str:slug>',views.blog_accept,name="blog_accept"),
   path('request-decline/<str:slug>',views.blog_decline,name="blog_decline"),
]
