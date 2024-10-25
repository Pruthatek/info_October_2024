from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.bloghome, name="bloghome"),
    path('blogpost/', views.blogPost, name="blogPost"),
    path('deletedposts/', views.isDeletedCheck, name="deletedposts"),
    path('searchDatabase/', views.searchPosts, name="searchPosts"),
    path('fetchcategory/', views.fetch_category, name="fetchCategory"),
    path('category/', views.get_category, name="category"),
    path('storepost/', views.storePostSession, name='store_post_in_session'),
    path('addpara/', views.addPara, name='add_para'),
    path('addtolatest/', views.updateStatus, name='update_status'),
    path('delete/', views.deletePost, name='delete_post'),
    path('getBlogDetails/', views.getBlogDetails, name='getBlogDetails'),
]