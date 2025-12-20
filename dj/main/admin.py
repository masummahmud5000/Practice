from django.contrib import admin
from . models import Server
# Register your models here.
@admin.register(Server)

class serverAdmin(admin.ModelAdmin):
    list_display = ['id','name','age','phoneNumber']