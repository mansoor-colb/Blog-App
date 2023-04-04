from django.db import models

# def upload_path(instance, filename):
#     return "/".join([ 'covers', str(instance.title), filename])
                     
# class images(models.Model):
#     uid = models.CharField (max_length=32, blank=False)
#     blog_id = models.CharField (max_length=100, blank=False)
#     images = models. ImageField (blank=True, null=True, upload_to=upload_path)



# Create your models here.
class Student(models.Model):
    stuname=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    call=models.CharField(max_length=100)




class users(models.Model):
    uid=models.CharField(max_length=100,primary_key=True)
    username=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    phone=models.CharField(max_length=100)
    email=models.CharField(max_length=100)


class otp(models.Model):
    otp=models.CharField(max_length=10)
    email=models.CharField(max_length=100)
   
class blogs(models.Model):
    uid=models.CharField(max_length=100)
    blogid=models.CharField(max_length=100)
    title=models.CharField(max_length=100)
    category=models.CharField(max_length=100)
    content=models.CharField(max_length=500000)
    date=models.CharField(max_length=100)