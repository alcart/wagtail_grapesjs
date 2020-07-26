from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def page_edit(request, page_id):
    return render(request, "wagtail_grapesjs/editor/editor.html", {"page_id": page_id})
