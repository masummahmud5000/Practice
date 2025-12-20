from django.urls import path
from . views import mainApi

urlpatterns=[
    path('api/', mainApi.as_view())
]