from django.urls import path

from vlogapi import views

urlpatterns = [
    path('blogs/',views.blogList.as_view()),
    path('user/',views.userList.as_view()),
    path("userdet/<int:pk>/", views.userDetail.as_view()),
    path("createuser/", views.user_create,name='createuser'),
    path("createotp/", views.otp_create,name='createotp'),
    path("createblog/", views.blog_create,name='createblog'),
    path("createfollow/", views.followers_create,name='createfollow'),
    path("getuser/", views.get_user,name='getuser'),
    path("getuseruid/", views.get_user_uid,name='getuseruid'),
    path("getblogbid/", views.get_blog_bid,name='getblogbid'),
    path("getfolluid/",views.followList.as_view()),
    path("updateuser/", views.update_user,name='updateuser'),
    path("deleteuser/", views.delete_user,name='deleteuser'),
    path("getotp/", views.get_otp,name='getotp'),
    path("forgotpass/", views.forgot_pass,name='getotp'),
]
