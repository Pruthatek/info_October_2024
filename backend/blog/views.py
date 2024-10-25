import json
from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from yaml import serialize
from .models import *
import mimetypes
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.http import HttpResponse
from django.views.decorators.http import require_POST
import json
from .models import Post
from django.shortcuts import get_object_or_404
from django.conf import settings

import json

@csrf_exempt
def bloghome(request):
        
    if request.method == 'GET':
        allPosts = Post.objects.filter().order_by('-timeStamp') 
        data = []
        for post in allPosts:
            thumbnail_url = f"/static/{post.thumbnail}" if post.thumbnail else ""
            print(thumbnail_url)
            para = Para.objects.get(post=post, sequence=1)
            data.append({
                "id" : post.pk,
                "title" : post.title,
                "author" : post.author,
                "Category" : post.Category.category_title,
                "thumbnail" : thumbnail_url,
                "timeStamp" : str(post.timeStamp),
                "add_to_top" : post.add_to_top,
                "latest" : post.latest,               
                "content" : para.content
            })
        return HttpResponse(json.dumps(data))

def blogPost(request):
    if request.method == 'GET':
        try:
            # Get the post ID from request
            post_id = request.GET.get("id")
            
            # Use get_object_or_404 for better error handling
            post = get_object_or_404(Post, pk=post_id)
            
            # Serialize the post
            serialized_post = serializers.serialize("json", [post])
            
            # Convert to Python dictionary
            post_data = json.loads(serialized_post)[0]
            
            # Add the full static URL for the image field
            # Assuming your Post model has an 'image' field
            if 'fields' in post_data and 'image' in post_data['fields']:
                image_path = post_data['fields']['image']
                if image_path:
                    # Convert relative path to full static URL
                    post_data['fields']['image'] = f"{settings.STATIC_URL}{image_path}"
            
            return JsonResponse(post_data, safe=False)
            
        except Exception as e:
            return JsonResponse({
                'error': str(e),
                'message': 'Failed to fetch blog post'
            }, status=500)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405)


# def blogPost(request):
#     if request.method == 'GET':
#         id1=request.GET.get("id") 
#         post = Post.objects.filter(pk=id1)
#         data = serializers.serialize("json", post)
#         return HttpResponse(data, content_type="application/json")

def isDeletedCheck(request):
    allpost = Post.objects.filter(isDeleted=False).all()
    data = serializers.serialize("json", allpost)
    print("done")
    return HttpResponse(data, content_type="application/json")

def fetch_category(request):
    category = BlogCategory.objects.all()
    data = serializers.serialize("json", category)
    print("category done")
    return HttpResponse(data, content_type="application/json")

@csrf_exempt
def searchPosts(request):
    if request.method == "GET":
        searchQuery = request.GET.get("searchQuery")
        result = {"posts": []}

        # Search for posts based on title, author, and content, and filter by status
        posts = Post.objects.filter(
            Q(title__icontains=searchQuery) |
            Q(author__icontains=searchQuery)
        ).all()

        for post in posts:
            thumbnail_url = f"/static/{post.thumbnail}" if post.thumbnail else ""
            result["posts"].append({
                "title": post.title,
                "author": post.author,
                "thumbnail": thumbnail_url,
                "timeStamp": str(post.timeStamp) ,
                "pk": post.pk,
            })

        result = {"posts": result["posts"][:5]}
        return HttpResponse(json.dumps({"data": result}),content_type="application/json")

    return HttpResponse(
        json.dumps({"error": "You were not supposed to be here."}),
        content_type="application/json",
    ) 


@csrf_exempt
def get_category(request):
    if request.method == "GET":
        cat = request.GET.get("cat")
        cat = cat.capitalize()
        category = Post.objects.filter(Category=cat).all()
        data = serializers.serialize("json", category)
        print("done")
        return HttpResponse(data, content_type="application/json")


def save_file_to_static(file, folder_path):
    """Helper function to save file to static folder"""
    # Create directory if it doesn't exist
    os.makedirs(os.path.join(settings.STATICFILES_DIRS[0], folder_path), exist_ok=True)
    
    # Generate unique filename using timestamp
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{timestamp}_{file.name}"
    
    # Full path where file will be saved
    file_path = os.path.join(settings.STATICFILES_DIRS[0], folder_path, filename)
    
    # Save file
    with open(file_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
        
    return os.path.join(folder_path, filename)


@csrf_exempt
def storePostSession(request):
    if request.method == 'POST':
        try:
            title = request.POST.get('title')
            author = request.POST.get('author')
            category = request.POST.get('category')
            timestamp = request.POST.get('timestamp', datetime.datetime.now().strftime('%Y-%m-%d'))
            thumbnail = request.FILES.get('thumbnail')
            add_to_top = request.POST.get('add_to_top', False)
            cat = BlogCategory.objects.get(category_title=category)
            if not add_to_top:
                add_to_top = False
            print(add_to_top)
            # Handle thumbnail
            thumbnail_path = ""
            if thumbnail:
                thumbnail_path = save_file_to_static(thumbnail, 'blog/images')

            # Create Post instance
            post = Post.objects.create(
                title=title,
                author=author,
                Category=cat,
                timeStamp=timestamp,
                thumbnail=thumbnail_path,  # Store the relative path
                add_to_top=add_to_top
            )
            
            post_id = post.id
            request.session['post_id'] = post_id

            return JsonResponse({
                'message': 'Post data stored in session.',
                'post_id': post_id,
                'thumbnail_path': thumbnail_path
            })
        except Exception as e:
            return HttpResponseBadRequest(f'Invalid data: {e}')
    else:
        return HttpResponseBadRequest('Only POST requests are allowed.')

@csrf_exempt
def addPara(request):
    if request.method == 'POST':
        try:
            post_id = request.POST.get('post_id')
            post = Post.objects.get(pk=post_id)
            para_id = request.POST.get('para_id')
            data = request.POST
            status = data.get('status')
            content = data.get('content', "")
            is_deleted = data.get('isDeleted', False)
            sequence = data.get('sequence')
            
            # Handle ad field image
            ad_field_image = request.FILES.get("ad_field_image")
            ad_field_image_path = ""
            if ad_field_image:
                ad_field_image_path = save_file_to_static(ad_field_image, 'blog/ad_images')
                
            ad_field_product_name = data.get("ad_field_product_name")
            ad_field_price = data.get("ad_field_price")
            ad_field_model = data.get("ad_field_model")
            ad_field_link = data.get("ad_field_link")

            if para_id:
                try:
                    para = Para.objects.get(pk=para_id)
                    para.sequence = sequence
                    para.status = status
                    para.content = content
                    para.isDeleted = is_deleted
                    
                    # Update image path only if new image is uploaded
                    if ad_field_image_path:
                        para.ad_field_image = ad_field_image_path
                        
                    para.ad_field_product_name = ad_field_product_name
                    para.ad_field_price = ad_field_price
                    para.ad_field_model = ad_field_model
                    para.ad_field_link = ad_field_link
                    para.save()

                    return JsonResponse({
                        'message': 'Para updated successfully.',
                        'ad_field_image_path': ad_field_image_path if ad_field_image_path else para.ad_field_image
                    })
                except Para.DoesNotExist:
                    return HttpResponseBadRequest('Para object does not exist.')
            else:
                para = Para.objects.create(
                    post=post,
                    sequence=sequence,
                    status=status,
                    content=content,
                    isDeleted=is_deleted,
                    ad_field_image=ad_field_image_path,
                    ad_field_product_name=ad_field_product_name,
                    ad_field_price=ad_field_price,
                    ad_field_model=ad_field_model,
                    ad_field_link=ad_field_link,
                )

                return JsonResponse({
                    'message': 'Para added successfully.',
                    'ad_field_image_path': ad_field_image_path
                })
        except Post.DoesNotExist:
            return HttpResponseBadRequest('Post object does not exist.')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {e}')
    else:
        return HttpResponseBadRequest('Only POST requests are allowed.')
    
@csrf_exempt
def getBlogDetails(request):
    if request.method == 'GET':
        
        try:
            post = Post.objects.get(pk=request.GET.get('post_id'))
            paras = Para.objects.filter(post=post).order_by('sequence')

            para_data = []
            for para in paras:
                ad_field_image_url = f"/static/{para.ad_field_image}" if para.ad_field_image else None
                para_data.append({
                    'id': para.pk,
                    'sequence': para.sequence,
                    'status': para.status,
                    'content': para.content,
                    'isDeleted': para.isDeleted,
                    'ad_field_image': ad_field_image_url,
                    'ad_field_product_name': para.ad_field_product_name,
                    'ad_field_price': para.ad_field_price,
                    'ad_field_model': para.ad_field_model,
                    'ad_field_link': para.ad_field_link,
                })
            thumbnail_url = f"/static/{post.thumbnail}" if post.thumbnail else ""
            blog_data = {
                'id': post.pk,
                'title': post.title,
                'author': post.author,
                'category': post.Category.category_title,
                'timestamp': post.timeStamp,
                'thumbnail': thumbnail_url,
                'add_to_top': post.add_to_top,
                'paragraphs': para_data,
            }

            return JsonResponse(blog_data, safe=False)
        except Post.DoesNotExist:
            return HttpResponseBadRequest('Post object does not exist.')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {e}')
    else:
        return HttpResponseBadRequest('Only GET requests are allowed.')

@csrf_exempt
def updateStatus(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        post = Post.objects.get(pk=id)
        if post.latest:
            post.latest = False
            post.save()
        else:
            post.latest = True
            post.save()
        return HttpResponse(json.dumps({"msg" : "Added to latest post"}))
    else:
        return HttpResponse(json.dumps({"msg" : "Mehtod Not Allowed"}))

@require_POST
@csrf_exempt
def deletePost(request):
    try:
        id = request.POST.get("id")
        post = Post.objects.get(id=id)
        post.delete()
        return HttpResponse(json.dumps({"msg": "Post marked as deleted"}))
    except Post.DoesNotExist:
        return HttpResponse(json.dumps({"msg": "Post not found"}), status=404)
    except Exception as e:
        return HttpResponse(json.dumps({"msg": str(e)}), status=500)
    


