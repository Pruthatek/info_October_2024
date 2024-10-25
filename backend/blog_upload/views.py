import json
import os
from pyexpat.errors import messages
from sqlite3 import Timestamp
from bs4 import BeautifulSoup
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
import requests
from blog.models import BlogCategory, Post
# Create your views here.
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import EmailMessage, send_mail
from blogpost import settings
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt,csrf_protect
import math, random
from .models import Otp 
import uuid

# Create your views here. nfdhgbvgsehgjksjksdfdshjkfhjkjjfjfdfdjkjkbf
@csrf_exempt
def home(request):
    current_user =request.user
    allPosts = Post.objects.filter(author=current_user)
    print(current_user)
    context = {'allPosts' : allPosts}
    return render(request,'blog_upload/home.html',context)


@csrf_exempt
def upload_blog(request):

    if request.method=="POST":
      post = Post()  
      post.title=request.POST.get('title')
      post.author=request.POST.get('author')
      post.slug = uuid.uuid4()
      post.timeStamp = datetime.now()
      post.status = 'Waiting'
      post.head0 = request.POST.get('head0')
      post.chead0 = request.POST.get('chead0')
      post.cimages0 = request.FILES.get('cimages0')
      post.head1 = request.POST.get('head1')
      post.chead1 = request.POST.get('chead1')
      post.cimages1 = request.FILES.get('cimages1')
      post.head2 = request.POST.get('head2')
      post.chead2 = request.POST.get('chead2')
      post.cimages2 = request.FILES.get('cimages2')
      # if len(request.FILES) != 0:
      # post.thumbnail = request.FILES['image']
      post.save()
      # allPosts = Post.objects.all()
      # context = {'allPosts' : allPosts}
      return HttpResponse(json.dumps({"msg": " your details updated successfully."}),content_type="application/json",)

    
    else:
        return render(request,'blog_upload/upload.html')


@csrf_exempt
def blogPost(request, slug): 
    post = Post.objects.filter(slug=slug).first()
    context = {'post' : post}
    data = serializers.serialize("json", post)
    return HttpResponse(data, content_type="application/json")
    # return render(request,'blog_upload/blogpost.html',context)

@csrf_exempt
def decline_blogs(request):
    current_user =request.user
    allPosts = Post.objects.filter(author=current_user ,status='Decline')

    context = {'allPosts' : allPosts}
    data = serializers.serialize("json", allPosts)
    print(data)
    return HttpResponse(data, content_type="application/json")
    # return render(request,'blog_upload/decline.html',context)


@csrf_exempt
def signin(request):
      if request.method == 'POST':
        print(request.POST)
        # username = request.POST['username']
        # pass1 = request.POST['pass1']
        username = request.POST.get('username')
        pass1 = request.POST.get('pass1')
        
        user = authenticate(username=username, password=pass1)
        
        if user is not None:
            login(request, user)
           
           # allPosts = Post.objects.filter(author=username)
            #context = {'allPosts' : allPosts}
          #  messages.success(request, "OTP Sent On your Mail id")
        
        # # Welcome Email
        #     subject = "Welcome Back  !!"
        #     otp = generateOTP()
        #     message = "Hello " + user.first_name + "!! \n" + "OTP for Login is "+ otp+" \n\nThanking You\nHet"        
        #     from_email = settings.EMAIL_HOST_USER
        #     to_list = [user.email]
        #     send_mail(subject, message, from_email, to_list, fail_silently=True)

        #     OTP = Otp()
        #     OTP.username = request.user
        #     OTP.otp_user = otp
        #     OTP.save()
            return HttpResponse(json.dumps({"msg": " your details updated successfully."}),content_type="application/json",)

            #return render(request,'blog_upload/home.html',context)
            # messages.success(request, "Logged In Sucessfully!!")
            
        else:
            messages.error(request, "Bad Credentials!!")
            return HttpResponse(json.dumps({"msg": " your details updated successfully."}),content_type="application/json",)
    
      return HttpResponse(json.dumps({"msg": " your details updated successfully."}),content_type="application/json",)
    
# @csrf_exempt
# def varification(request) :
#     if request.method == 'POST':
#         otp = request.POST['otp']
#         OTP =Otp.objects.filter(username=request.user).first()
#         if(otp == OTP.otp_user):
#             OTP.delete()
#             return redirect('home')
#         else:
#             messages.error(request, "Wrong OTP!!")
#             return redirect('varification')

#     return render(request, "blog_upload/otpvarification.html")




    
@csrf_exempt
def signout(request):
    logout(request)
    messages.success(request, "Logged Out Successfully!!")
    return redirect('signin')



def generateOTP() :
    digits = "0123456789"
    OTP = ""
    for i in range(6) :
        OTP += digits[math.floor(random.random() * 10)]
    return OTP

@csrf_exempt
def blogupload(request):
    if request.method == "POST":
        post = Post()
        post.title=request.POST.get('title')
        post.author=request.POST.get('author')
        post.slug = uuid.uuid4()
        category_title = request.POST.get('category')
        post.Category = get_object_or_404(BlogCategory, category_title=category_title)
        post.thumbnail = request.FILES.get('thumbnail')
        post.content = request.POST.get('content')
        soup = BeautifulSoup(post.content, 'html.parser')
        post.status = "Approved"
        img_tags = soup.find_all('img')
        for img_tag in img_tags:
            try:
                original_src = img_tag.get('src')
                response = requests.get(original_src)
                uuidnew = str(uuid.uuid4())
                with open('./media/blog/images/' + uuidnew + '.png', 'wb') as f :
                    f.write(response.content)
                # new_src = os.path.join(settings.MEDIA_URL, original_src)
                
                img_tag['src'] = 'http://127.0.0.1:8000/media/blog/images/' + uuidnew + '.png'
            except Exception as e:
                img_tag['src'] = 'http://127.0.0.1:8000/media/blog/images/404 Error.jpeg'
        post.content = str(soup)
        post.save()
        return HttpResponse(json.dumps({'message ': 'Added Succeded'}), status=200, content_type='application/json')
    else:
        return HttpResponse(json.dumps({'error ': 'method not allowed'}), status=401, content_type='application/json')