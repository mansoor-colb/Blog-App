from rest_framework import serializers

from .models import Student,users,otp,blogs,followers,feed

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        # fields=['id','stuname','email']
        fields="__all__"


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=users
        # fields=['id','stuname','email']
        fields="__all__"
    def update (self,instance, validated_data) :
        
        # instance.id =validated_data.get('id', instance.id)
        instance.uid =validated_data.get('uid', instance.uid)

        instance.username=validated_data.get('username', instance.username)
        instance.password=validated_data.get ('password', instance.password)
        instance.phone=validated_data.get ('phone', instance.phone)
        instance.email=validated_data.get ('email', instance.email)
        instance.save()
        return instance


class otpSerializer(serializers.ModelSerializer):
    class Meta:
        model=otp
        # fields=['id','stuname','email']
        fields="__all__"



class blogSerializer(serializers.ModelSerializer):
    class Meta:
        model=blogs
        # fields=['id','stuname','email']
        fields="__all__"


class followersSerializer(serializers.ModelSerializer):
  
    class Meta:
        model=followers
        # fields=['id','stuname','email']
        fields=['user','follower','following' ]

class feedSerializer(serializers.ModelSerializer):
  
    class Meta:
        model=feed
        # fields=['id','stuname','email']
        fields=['user','feedname','feedurl' ]