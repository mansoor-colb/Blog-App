import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import $ from "jquery"
import axios from "axios";
import swal from 'sweetalert';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail]=useState("");
    const [password, setPassword ]=useState("");
 ;
    useEffect(() => {
    if (localStorage.getItem("blog")){

       navigate("/dashboard")
    }
    }, [0])
function login(){
   var condition=true;

    if(email==''|| email.trim() ==''){
        toast.warning("Please Provide valid Email", "email Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(password==''|| password.trim() ==''){
        toast.warning("Please Provide valid Password", "password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
if(condition){


    var options = {
    method: 'POST',
    url: 'http://127.0.0.1:8000/vlogapi/getuser/',
    data: {email: email, password: password}
    };


    
    axios.request(options).then(function (response) {
        if(response.data.codes){
            swal("Invalid Credentials","Please Enter valid Details","error")
        }
        else{
            swal("Logging Successful","","success")
            localStorage.setItem("blog",response.data.uid)
            navigate("/dashboard")

        }
    }).catch(function (error) {
      console.error(error);
    });
}

}

  return (
   
    <div class="container-xxl" id='Logconta'>
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
         
          <div class="card" id='cardlog'>
            <div class="card-body">
          
              <div class="app-brand justify-content-center">
               <NavLink to="/register" class="app-brand-link gap-2">
               
                  <span class="app-brand-text demo text-body fw-bolder mb-3">bLOG</span>
               </NavLink>
              </div>
         
              <h4 class="mb-2 mt-2"><small>b</small><big>log</big> in Back!!👋</h4>
              

              <div id="formAuthentication" class="mb-3" >
                <div class="mb-3">
                  <label for="email" class="form-label">Email or Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Password</label>
                   <NavLink to="/forgotpass">
                      <small>Forgot Password?</small>
                   </NavLink>
                  </div>
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
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" id="login" onClick={login} type="submit">Sign in</button>
                </div>
              </div>

              <p class="text-center">
                <span>New on our platform?</span>
                <NavLink to="/register">
                  <span>Create an account</span>
                </NavLink>
              </p>
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
        </div>
      </div>
      </div>
  


  )
}

export default Login