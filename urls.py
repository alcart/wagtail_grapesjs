from django.urls import path

from . import views

urlpatterns = [
    path('grapesjs/edit/<int:page_id>/',
         views.page_edit,
         name='grapesjs_editor'),
]
