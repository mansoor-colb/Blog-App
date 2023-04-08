import React, { useEffect, useState, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Nav from './Nav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

import swal from 'sweetalert';

const Create = () => {

    const [title, setitle]=useState("");
    
    const [category, setcategory]=useState("");
   

    const editor = useRef(null);
	const [content, setContent] = useState('');


    const[prof,setprof]=useState([])
    const[view,setview]=useState('0')
    const navigate = useNavigate();
function logout()
{
    localStorage.removeItem("blog")
    navigate("/login")
    
}

var uid= localStorage.getItem("blog");
    function getprofile(){




        

        var options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/vlogapi/getuseruid/',
        data: {"uid":uid}
        };

        axios.request(options).then(function (response) {
        console.log(response.data);
        setprof(response.data)
        }).catch(function (error) {
        console.error(error);
        });

    }
   
        useEffect(()=>{
            getprofile();
        },[])


        function uploadblog(){
           
        
          var condition =true;
          if(title==''|| title.trim() ==''){
            swal("Please Enter Title"," ","warning");
            condition=false
            
        }
        if(content.length < 13 || content.trim() ==''){
            swal(" Provide valid Content", "Content Error","warning");
            condition=false
        }
        if(category==''|| category.trim() ==''){
            swal("Please Select category", "Category Error","warning");
            condition=false
        }
        if(condition){
            var digits = '1234567890';
            var otp = ''
            for (let i = 0; i < 8; i++) {
              otp += digits[Math.floor(Math.random() * 10)];
            }
            const d = new Date();

            let monthName = d.toLocaleString("default", {month: "long"});
            let day = d.getDay()
            let year=d.getFullYear()
            let f=` ${day},${monthName} ${year}`
            let it='';
            if(view){
              it=1;
            }
            else{
              it=0
            }
              alert(it)
            var options = {
              method: 'POST',
              url: 'http://127.0.0.1:8000/vlogapi/createblog/',
              data: {"uid":uid,"title":title,"blogid":otp,"content":content,"date":f,"category":category,"view":it}
            };
            
            axios.request(options).then(function (response) {
                if(response.data.codes){
                    swal("Something went Wrong","Error","error")
                }
                else{

                    swal(`Blog Saved Successfully `,`Link :http://127.0.0.1:3000/blogs?${otp}`,"success")
                }
            }).catch(function (error) {
              console.error(error);
            });
        }
        }
        function godash(){
            if(window.confirm("Confirm Discard blog??")){
                navigate("/dashboard")

            }
        }
    const[cclass,newcclass]=useState("pst")
    
    function toggle(){
        if(cclass=='pst'){

            newcclass('ast')
        }
        else{
            newcclass('pst')

        }
       
    }
    function swit(){
      setview(!view)
    }
  return (
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
      <Header stat={cclass}/>
        <div class="layout-page">
        <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" >
          <i class="bx bx-menu bx-sm" id="asi"  onClick={toggle}></i>
        </a>
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
  
        <div class="navbar-nav align-items-center">
          <div class="nav-item d-flex align-items-center">
            <i class="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              class="form-control border-0 shadow-none"
              placeholder="Search..."
              aria-label="Search..."
            />
          </div>
        </div>
  
        <ul class="navbar-nav flex-row align-items-center ms-auto">
       
          

     
          <li class="nav-item navbar-dropdown dropdown-user dropdown">
            <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
              <div class="avatar avatar-online">
                <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online">
                        <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-semibold d-block">{prof.username}</span>
                      <small class="text-muted">{prof.email}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <NavLink to="/editprof">
                <a class="dropdown-item" href="#" >
                  <i class="bx bx-user me-2"></i>
                  <span class="align-middle">My Profile</span>
                </a>
                </NavLink>
              </li>
              
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bx bx-power-off me-2"></i>
                  <span class="align-middle" onClick={logout}>Log Out</span>
                </a>
              </li>
            </ul>
          </li>
      
        </ul>
      </div>
    </nav>
          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <div class="row">
              <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    <span class="display-4 ">bLOG</span>
                      <small class="text-muted float-end">What's goin on Today??</small>
                    </div>
                    <div class="card-body">
                      <div>
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-fullname">Title</label>
                          <input onChange={(e)=>setitle(e.target.value)} type="text" class="form-control" id="basic-default-fullname" placeholder="John Doe"/>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="exampleFormControlSelect1">Category</label>
                          <select onChange={(e)=>setcategory(e.target.value)} class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                          <option selected="">Open this select menu</option>
                          <option value="Tech">Technology</option>
                          <option value="Bussiness">Bussiness</option>
                          <option value="Nature">Nature</option>
                          <option value="Politics">Politics</option>
                        </select>
                        </div>
                       
                        <div class="mb-3">
                          <label class="form-label" for="basic-default-message">Message</label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            
                            tabIndex={10} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {}}
		/>
                          {/* 
                          <textarea id="basic-default-message" class="form-control" placeholder="Hi, Do you have a moment to talk Joe?"></textarea> */}
                        </div>
                        <div class="form-check m-16" >
                        {/* <input class="form-check-input" type="checkbox" onChange={swit} id="flexSwitchCheckChecked" checked=""/> */}
                            <input class="form-check-input" type="checkbox"  onChange={swit} />
                            <label class="form-check-label" for="defaultCheck3">Blog will be uploaded as {view?"Public":"Private"} </label>
                          </div>
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" onClick={uploadblog}>Save changes</button>
                          <button type="reset" class="btn btn-outline-secondary" onClick={godash}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
