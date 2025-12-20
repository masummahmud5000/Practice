from rest_framework import serializers
from . models import Server


class seria(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'