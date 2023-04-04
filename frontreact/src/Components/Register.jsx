import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';





const Register = () => {
    const navigate = useNavigate();
   
    const [valotp, setvalotp]=useState();

    function Finalsub(){
        return(

            <div class="input-group">
                <input type="text" class="form-control" name="contact" placeholder="Enter your contact" onChange={e => setvalotp(e.target.value)}/>
           
            <button class="btn btn-primary" onClick={finalregister} type="button" id="buttonfinal">Validate</button>
          </div>
        )
    }



  
    function Submit(){
        return(
<button type="button" class="btn btn-secondary" id="register" onClick={sendotp}><span class="tf-icons bx bx-bell"></span> Send OTP</button>
            // <button class="btn btn-primary d-grid w-100" id="register" onClick={sendotp}>Sign up</button>
        )
    }
    const [sub, showsubmit] = useState(true);
    const [show, showotp] = useState(false);
    const [style, setStyle] = useState("input-group finalsub");
   
    const [email, setEmail]=useState("");
    
    const [password, setPassword]=useState("");
    const [user, setuser]=useState("");
    const [phone, setphone]=useState("");
   
   
    function finalregister(){
        var condition=true;

        if(user==''|| user.trim() ==''){
            toast.warning("Please Provide valid user name", "Username Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false
        }
        if(password==''|| password.trim() ==''){
            toast.warning("Please Provide valid Password", "password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false
        }
        if(phone==''|| phone.trim() ==''){
            toast.warning("Please Provide valid Phone", "phone Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false
        }
        if(email==''|| email.trim() ==''){
            toast.warning("Please Provide valid Email", "email Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false
        }
        if(condition){
            var options = {
                method: 'POST',
                url: 'http://127.0.0.1:8000/vlogapi/getotp/',
                data: {email: email, otp: valotp}
                };
            
            
                
                axios.request(options).then(function (response) {
                    if(response.data.codes){
                        swal("Invalid OTP","Please Enter valid OTP","error")
                    }
                    else{
                        var digits = '1234567890';
                        var otp = ''
                        for (let i = 0; i < 6; i++) {
                          otp += digits[Math.floor(Math.random() * 10)];
                        }

                       

                        var options = {
                        method: 'POST',
                        url: 'http://127.0.0.1:8000/vlogapi/createuser/',
                        data: {
                            email: email,
                            uid:otp,
                            username:user,
                            phone:phone,
                            password: password
                        }
                        };

                        axios.request(options).then(function (response) {
                            swal("Registration successfull,PLease Login","","success")

                            navigate("/login")
                
                        }).catch(function (error) {
                            swal("Oops...", "Something went wrong !!", "error");
                        });
                        
                    }
                }).catch(function (error) {
                  console.error(error);
                });

        }
        
    }

    function sendotp(){
      
        const fmail=email;
        var digits = '1234567890';
        var otp = ''
        for (let i = 0; i < 4; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        
            if(phone!="" && email!=""){
                var options = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/vlogapi/createotp/',
                    data: {"email":fmail,"otp":otp}
                  };
                  toast.info("Sending OTP")
                  axios.request(options).then(function (response) {
                      if(response.data.codes){
                          alert("Error")
                      }
                      else{
                        
                    
                            showotp(!show)
                            // showsubmit(!sub)
                            setStyle("input-group finalsubshow")
                          
                            toast.success(' OTP sent successfully', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                }) 

                           
                     
                    
              
                      }
                          
                    console.log(response.data);
                  }).catch(function (error) {
                    console.error(error);
                  });
            }
            else{
                toast.warn(' ❌ Please Provide Valid Details', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    })      }

            

    }
 
    useEffect(() => {
      if (localStorage.getItem("blog")){
  
         navigate("/dashboard")
      }
      }, [0])



  return (
    <div class="container-xxl" id='Logconta'>
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
       
        <div class="card" id="cardreg">
          <div class="card-body">
           
            <div class="app-brand justify-content-center">
            <NavLink to="/register" class="app-brand-link gap-2">
               
                  
                <span class="app-brand-text demo text-body fw-bolder mb-3" >bLOG</span>
               </NavLink>
            </div>

            <h4 class="mb-2 mt-2">Blogging starts here 🚀</h4>
           

            <div id="formAuthentication" class="mb-3" >
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  
                  onChange={(e)=>setuser(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text"  class="form-control" id="email" name="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label for="contact" class="form-label">Contact</label>
                <input type="text"  class="form-control" id="contact" name="contact" placeholder="Enter your contact" onChange={(e)=>setphone(e.target.value)}/>
              </div>
              <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">Password</label>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                </div>
              </div>
              
              <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"/>
              {/* { toast ? suc ? <Toastsuccess su="bg-warning" msg=" otp sent Successfully"/>:<Toastsuccess su="bg-warning" msg="Please provide valid details"/> : null } */}
              { sub ? <Submit/> : null }
              <div className={style}>
                <input type="text" class="form-control" name="contact" placeholder="Enter your contact" onChange={e => setvalotp(e.target.value)}/>
           
            <button class="btn btn-primary" onClick={finalregister} type="button" id="buttonfinal">Validate</button>
          </div>
            </div>

            <p class="text-center">
              <span>Already have an account?</span>
            <NavLink to="/login">
                  <span>Sign in instead</span>
            </NavLink>
            </p>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  
  )
}

export default Register