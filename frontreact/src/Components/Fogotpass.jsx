
import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

const Fogotpass = () => {

    const [email,setmail]=useState("");

    function reset(){
        var condition=true;
        if(email==''|| email.trim() ==''){
            toast.warning("Please Provide valid Email", "email Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
            condition=false
        }
        if(condition){
           
            toast.info("Checking Database")
            var options = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/vlogapi/forgotpass/',
            data: {"email":email}
            };

            axios.request(options).then(function (response) {
                if(response.data.codes){
                    swal("Invalid email","Email is not Registered with bLOG","error")
                }
                else{
                    swal("Forgot Password request Successful","Check your mail Inbox","success")
                    
        
                }
           
            }).catch(function (error) {
            console.error(error);
            });
        }
    }
  return (
    
    <div class="container-xxl" id='Logconta' >
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
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner py-4">
       
        <div class="card" id='cardfor'>
          <div class="card-body">
           
            <div class="app-brand justify-content-center">
              <NavLink to="/register" class="app-brand-link gap-2">
               
                <span class="app-brand-text demo text-body fw-bolder">bLOG</span>
             </NavLink>
            </div>
          
            <h4 class="mb-2 mt-2">Forgot Password? 🔒</h4>
            <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
            <div id="formAuthentication" class="mb-3" >
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
              onChange={(e)=>setmail(e.target.value)}
            
                />
              </div>
              <button class="btn btn-primary d-grid w-100" onClick={reset}>Send Reset Link</button>
            </div>
            <div class="text-center">
              <NavLink to="/login" class="d-flex align-items-center justify-content-center">
                <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                Back to login
             </NavLink>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )

}
export default Fogotpass