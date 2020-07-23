from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def page_edit(request, page_id):
    return JsonResponse({
        'id': page_id
    })
