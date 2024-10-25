"""blogpost URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('dbadmin/', admin.site.urls),
    path('admin_use/',include('admin_use.urls')),
    path('blog_upload/',include('blog_upload.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('blog/',include('blog.urls')),
    path('admin/blogupload/', TemplateView.as_view(template_name='index.html')),
    path('admin/create-user/', TemplateView.as_view(template_name='index.html')),
    path('admin/allblogs/', TemplateView.as_view(template_name='index.html')),
    path('admin/under-review/', TemplateView.as_view(template_name='index.html')),
    path('admin/rejected/', TemplateView.as_view(template_name='index.html')),
    path('admin/published/', TemplateView.as_view(template_name='index.html')),
    path('admin/deleted/', TemplateView.as_view(template_name='index.html')),
    path('admin/approved/', TemplateView.as_view(template_name='index.html')),
    path('blogs/', TemplateView.as_view(template_name='index.html')),
    path('bloguploadform/', TemplateView.as_view(template_name='index.html')),
    path('terms/', TemplateView.as_view(template_name='index.html')),
    path('privacy/', TemplateView.as_view(template_name='index.html')),
    path('terms/', TemplateView.as_view(template_name='index.html')),
    path('Wellness/', TemplateView.as_view(template_name='index.html')),
    path('News/', TemplateView.as_view(template_name='index.html')),
    path('Other/', TemplateView.as_view(template_name='index.html')),
    path('Science/', TemplateView.as_view(template_name='index.html')),
    path('Tech/', TemplateView.as_view(template_name='index.html')),
    path('Money/', TemplateView.as_view(template_name='index.html')),
    path('Home/', TemplateView.as_view(template_name='index.html')),
    path('Education/', TemplateView.as_view(template_name='index.html')),
    path('Cars/', TemplateView.as_view(template_name='index.html')),
    path('sidecontent/', TemplateView.as_view(template_name='index.html')),
    path('bloguploadform/', TemplateView.as_view(template_name='index.html')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
 
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
