from django.shortcuts import render
# from django.http import HttpResponse
from . models import Server
from . serializers import seria
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class mainApi(APIView):
    def get(self, request, pk=None):
        queySet = Server.objects.all()
        serializer = seria(queySet, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = seria(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.errors, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = Server.objects.get(id=pk)
        user.delete()
        return Response('User Deleted Successfull !')