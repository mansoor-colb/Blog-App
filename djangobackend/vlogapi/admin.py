from django.contrib import admin
from .models import Student,users,otp,blogs,followers


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display=['id','stuname','email','call']

@admin.register(otp)
class otp(admin.ModelAdmin):
    list_display=['otp','email']

@admin.register(users)
class User(admin.ModelAdmin):
    list_display=['uid','username','password','phone','email']
# Register your models here.

@admin.register(blogs)
class blogs(admin.ModelAdmin):
    list_display=['blogid','uid','title','category','content','date','view']

@admin.register(followers)
class Followers(admin.ModelAdmin):
    list_display=['user','follower','following']