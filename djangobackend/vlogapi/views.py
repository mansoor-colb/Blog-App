from django.shortcuts import render
from .serializers import StudentSerializer,UserSerializers,otpSerializer,blogSerializer,followersSerializer
from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView
from .models import Student,users,otp,blogs,followers
import io
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

import smtplib
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders


 






# Create your views here.
class StudentList(ListAPIView):
    serializer_class=StudentSerializer  
    queryset=Student.objects.all()


class blogList(ListAPIView):
    serializer_class=blogSerializer  
    queryset=blogs.objects.all()

class followList(ListAPIView):
    serializer_class=followersSerializer  
    queryset=followers.objects.all()

class userList(ListAPIView):
    serializer_class=UserSerializers 
    queryset=users.objects.all()


class userDetail(RetrieveUpdateDestroyAPIView):
    queryset = users.objects.all()
    serializer_class = UserSerializers 

@csrf_exempt
def user_create (request):
    if request.method == 'POST':
        json_data = request. body
        stream =io.BytesIO (json_data)
        python_data = JSONParser().parse(stream)
        serializer = UserSerializers(data=python_data)
        if serializer.is_valid () :
            serializer. save ()
            res={'msg': 'Data Created Successfully ' }
            json_data = JSONRenderer().render(res)
            return HttpResponse (json_data, content_type= 'application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')


@csrf_exempt
def get_user_uid(request) :
   
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        uid = python_data.get("uid",None)
    
        try:
        
   
            if uid is not None:
                stu= users.objects.get(uid=uid)
                serialize = UserSerializers(stu)
                print(serialize.data)
                x=serialize.data
                y={"status":200}
                x.update(y)
                json_data = JSONRenderer().render(x)
        
               
                return HttpResponse(json_data ,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except users.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":999}),content_type='application/json')


@csrf_exempt
def get_user(request) :
   
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        email = python_data.get("email",None)
        passwd = python_data.get("password",None)
        try:
        
   
            if email is not None:
                stu= users.objects.get(email=email,password=passwd)
                serialize = UserSerializers(stu)
                print(serialize.data)
                x=serialize.data
                y={"status":200}
                x.update(y)
                json_data = JSONRenderer().render(x)
        
               
                return HttpResponse(json_data ,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except users.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":999}),content_type='application/json')


@csrf_exempt
def forgot_pass(request):
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        email = python_data.get("email",None)
        try:
        
   
            if email is not None:
                stu= users.objects.get(email=email)
                serialize = UserSerializers(stu)
                print(serialize.data)
                x=serialize.data
                y={"status":200}
                x.update(y)
                json_data = JSONRenderer().render(x)

                smtp_port = 587                 # Standard secure SMTP port
                smtp_server = "smtp.gmail.com"  # Google SMTP Server

                # Set up the email lists
                email_from = "webdearsproject@gmail.com"
                em="""{email}""".format(email=email)
                email_list = [em]
                
        
            
                pswd = "iefrtrdbsudvpsyx" # As shown in the video this password is now dead, left in as example only


                # name the email subject
                subject = "Forgot Password !! From bLOG"



                # Define the email function (dont call it email!)
                def send_emails(email_list):

                    for person in email_list:
                        print(person)

                        # Make the body of the email
                        body = """Your password for registration is : {em}""".format(em=x['password'])
                    

                        # make a MIME object to define parts of the email
                        msg = MIMEMultipart()
                        msg['From'] = email_from
                        msg['To'] = person
                        msg['Subject'] = subject

                        html = """\
                        <html>
                        <head></head>
                            <body>
                            <p><h4 style="font-size:15px;">Please Scan qr for Registration password</h4></p>           
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={em}" ><br>
                            </body>
                        </html>
                        """.format(em=x['password'])
                        # Record the MIME types of text/html.
                        part2 = MIMEText(html, 'html')

                        # Attach parts into message container.
                        msg.attach(part2)
                        # msg.attach(MIMEText(body, 'plain'))

                        # Define the file to attach
                        # filename = "random_data.csv"

                        # Open the file in python as a binary
                        # attachment= open(filename, 'rb')  # r for read and b for binary

                        # Encode as base 64
                        # attachment_package = MIMEBase('application', 'octet-stream')
                        # attachment_package.set_payload((attachment).read())
                        # encoders.encode_base64(attachment_package)
                        # attachment_package.add_header('Content-Disposition', "attachment; filename= " + filename)
                        # msg.attach(attachment_package)

                        # Cast as string
                        text = msg.as_string()

                        # Connect with the server
                        print("Connecting to server...")
                        TIE_server = smtplib.SMTP(smtp_server, smtp_port)
                        TIE_server.starttls()
                        TIE_server.login(email_from, pswd)
                        print("Succesfully connected to server")
                        print()


                        # Send emails to "person" as list is iterated
                        print(f"Sending email to: {person}...")
                        TIE_server.sendmail(email_from, person, text)
                        print(f"Email sent to: {person}")
                        print()

                    # Close the port
                    TIE_server.quit()


                # Run the function
                send_emails(email_list)
               
                return HttpResponse(json_data ,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except users.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":999}),content_type='application/json')
    





@csrf_exempt
def update_user(request):
    if request.method == "PUT":
        json_data = request.body
        stream =io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get ('uid')
        stu =users.objects.get (uid=id)
        serializer = UserSerializers (stu, data=pythondata,partial=True)
        if serializer. is_valid () :
            serializer. save ()
            res = {'msg': 'Data Updated !!'}
            json_data = JSONRenderer () . render (res)
            return HttpResponse (json_data, content_type='application/ison')
        return HttpResponse (JSONRenderer().render({"codes":98}), content_type='application/ison')
    


@csrf_exempt
def delete_user(request):
    if request.method == "DELETE":
        json_data = request.body
        stream =io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get ('uid')
        
        if id is not None:
            try:
                stu = users.objects.get(uid=id)
            except users.DoesNotExist:
                    
                json_data = JSONRenderer().render({"codes":89,'msg' : "Student with this id does not exists "})
                return HttpResponse (json_data, content_type="application/json")
            stu.delete()
            return HttpResponse({"codes":123} ,content_type="application/json")
            
        return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')







@csrf_exempt
def otp_create (request):
    # delete_otp(request)
    if request.method == 'POST':
        json_data = request.body
       
        stream =io.BytesIO (json_data)
        python_data = JSONParser().parse(stream)
        print(python_data['email'])
        email = python_data.get ('email')
        
        
            
        stu = otp.objects.filter(email=email)
        stu.delete()

        



        smtp_port = 587                 # Standard secure SMTP port
        smtp_server = "smtp.gmail.com"  # Google SMTP Server

        # Set up the email lists
        email_from = "webdearsproject@gmail.com"
        em="""{email}""".format(email=python_data['email'])
        email_list = [em]
        print(type(str(em)))
 
       
        pswd = "iefrtrdbsudvpsyx" # As shown in the video this password is now dead, left in as example only


        # name the email subject
        subject = "Almost Done With Registration !!"



        # Define the email function (dont call it email!)
        def send_emails(email_list):

            for person in email_list:
                print(person)

                # Make the body of the email
                body = """Your OTP for registration is : {em}""".format(em=python_data['otp'])
               

                # make a MIME object to define parts of the email
                msg = MIMEMultipart()
                msg['From'] = email_from
                msg['To'] = person
                msg['Subject'] = subject

                # Attach the body of the message
                msg.attach(MIMEText(body, 'plain'))

                # Define the file to attach
                # filename = "random_data.csv"

                # Open the file in python as a binary
                # attachment= open(filename, 'rb')  # r for read and b for binary

                # Encode as base 64
                # attachment_package = MIMEBase('application', 'octet-stream')
                # attachment_package.set_payload((attachment).read())
                # encoders.encode_base64(attachment_package)
                # attachment_package.add_header('Content-Disposition', "attachment; filename= " + filename)
                # msg.attach(attachment_package)

                # Cast as string
                text = msg.as_string()

                # Connect with the server
                print("Connecting to server...")
                TIE_server = smtplib.SMTP(smtp_server, smtp_port)
                TIE_server.starttls()
                TIE_server.login(email_from, pswd)
                print("Succesfully connected to server")
                print()


                # Send emails to "person" as list is iterated
                print(f"Sending email to: {person}...")
                TIE_server.sendmail(email_from, person, text)
                print(f"Email sent to: {person}")
                print()

            # Close the port
            TIE_server.quit()


        # Run the function
        send_emails(email_list)




        






        serializer = otpSerializer(data=python_data)
        if serializer.is_valid () :
            serializer.save ()
            
            res={'msg': 'Data Created Successfully ' }
            json_data = JSONRenderer().render(res)



            return HttpResponse (json_data, content_type= 'application/json')
        return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')



@csrf_exempt
def get_otp(request):
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        email = python_data.get("email",None)
        otps = python_data.get("otp",None)
        try:
            if email is not None:
                stu= otp.objects.get(email=email,otp=otps)
                serialize = otpSerializer(stu)
                print(serialize.data)
                x=serialize.data
                y={"status":200}
                x.update(y)
                json_data = JSONRenderer().render(x)
        
               
                return HttpResponse(json_data ,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except otp.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":94}),content_type='application/json')
        


# blog create

@csrf_exempt
def blog_create (request):
    if request.method == 'POST':
        json_data = request. body
        stream =io.BytesIO (json_data)
        python_data = JSONParser().parse(stream)
        serializer = blogSerializer(data=python_data)
        if serializer.is_valid () :
            serializer. save ()
            res={'msg': 'Data Created Successfully ' }
            json_data = JSONRenderer().render(res)
            return HttpResponse (json_data, content_type= 'application/json')
        return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')


@csrf_exempt
def get_blog_bid(request) :
   
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        bloguid = python_data.get("blogid")
    
        try:
        
   
            if bloguid is not None:
                stiu= blogs.objects.get(blogid=bloguid)
                
                serialize = blogSerializer(stiu)
                
                x=serialize.data
                
                json_data = JSONRenderer().render(x)
        
               
                return HttpResponse(json_data,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except blogs.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":999}),content_type='application/json')

@csrf_exempt
def followers_create (request):
    if request.method == 'POST':
        json_data = request. body
        stream =io.BytesIO (json_data)
        python_data = JSONParser().parse(stream)
        serializer = followersSerializer(data=python_data)
        if serializer.is_valid () :
            serializer. save ()
            res={'msg': 'Data Created Successfully ' }
            json_data = JSONRenderer().render(res)
            return HttpResponse (json_data, content_type= 'application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')


@csrf_exempt
def get_follow_uid(request) :
   
    if (request.method == "POST"):
        json_data = request.body
        stream= io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        bloguid = python_data.get("uid")
    
        try:
        
   
            if bloguid is not None:
                stiu= followers.objects.all()
                
                serialize = followersSerializer(stiu)
                
                x=serialize.data
                
                json_data = JSONRenderer().render(x)
        
               
                return HttpResponse(json_data,content_type="application/json")
            return HttpResponse(JSONRenderer().render({"codes":89}),content_type='application/json')
        except blogs.DoesNotExist:
             
            return HttpResponse(JSONRenderer().render({"codes":999}),content_type='application/json')