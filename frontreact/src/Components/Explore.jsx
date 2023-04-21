import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

import axios from "axios";
import Header from './Header';
import Nav from './Nav';
// import './feed.xml'
const Explore = () => {

    const navigate = useNavigate();
 const[prof,setprof]=useState([0])
 const[blogs,setblogs]=useState([])
 const[follow,setfollowers]=useState([])
 const[cclass,newcclass]=useState("pst")
 const [pop,setpop]=useState(0);
 const [user,setuser]=useState(0);
 function toggle(){
    if(cclass=='pst'){

        newcclass('ast')
    }
    else{
        newcclass('pst')

    }
}

function getuser(){
  

var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/user/'};

axios.request(options).then(function (response) {
  setuser(response.data);
}).catch(function (error) {
  console.error(error);
});
}
 useEffect(() => {
    getprofile();
    getblogs();
    followers()
    getuser()
    if (!(localStorage.getItem("blog"))){

       navigate("/login")
    }
    
    }, [0])


function swit(){
    setpop(!pop)
}
function logout()
{
    localStorage.removeItem("blog")
    navigate("/login")
    
}
let uid= localStorage.getItem("blog");
function getblogs(){
    

        var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/blogs/'};



        axios.request(options).then(function (response) {
            setblogs(response.data)
        console.log(response.data);
        setprof(response.data)
        }).catch(function (error) {
        console.error(error);
        });
}

function followers(){


    var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/getfolluid/'};
    
    axios.request(options).then(function (response) {
        setfollowers(response.data)
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
}
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
          <i class="bx bx-menu bx-sm" id="asi" onClick={toggle} ></i>
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
              <div class="avatar avatar-online" onClick={getprofile}>
                <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online" >
                        <img  src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
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
     
        <span class="display-4 ml-5 mt-2">Explore</span>
      
        <div class="form-check m-16" id="followcheck">
                            <input class="form-check-input" type="checkbox" onChange={swit} />
                            <label class="form-check-label" for="defaultCheck3"> Following </label>
                          </div>
          <div class="container-xxl flex-grow-1 container-p-y" id="containerblog">
        
            {
       
                    blogs.map((cur,ind)=>{
                   
                        if(pop){
                            for (let i of follow){
    
                       
                                console.log(i.follower)
                                if(cur.uid==i.follower && cur.uid !=uid && i.user==uid && (cur.view==1||cur.uid==i.follower)){
                                    for (let [j,z] of Object.entries(user)){
                                    if(z.uid==cur.uid){
                                        console.log(z.uid+ "k"+ cur.uid)
                                        return(
                                            <div  class="card m-3" id="blogcards">
                                                
                                           <div class="card-body">
                                          <h5 class="card-title" id="tit">{cur.title}</h5>
                                          <div class="card-subtitle text-muted mb-3">{cur.date}</div>
                                          <p class="card-text" id="cardflo">
                                            Category : {cur.category}
                                          </p>
                                          <p class="card-text"  id="cardflo">Creator : {user[j].username}</p>
                                          <NavLink  to={"/blogs?blogsid="+cur.blogid} class="card-link">Blog link</NavLink>
                                          <NavLink id="nv" to={"/userProfile?uid="+cur.uid} class="card-link">Creator Profile</NavLink>
                                          </div>
                                          </div>
                    
                                        )
                                    }
                                 }
                                 
                                }
                                }
                        }
                        else{
                            if(cur.uid !=uid &&  cur.view==1){
                                for (let [j,z] of Object.entries(user)){
                                    if(z.uid==cur.uid){
                            return(
                                <div  class="card m-3" id="blogcards">
                                   
                               <div class="card-body">
                              <h5 class="card-title" id="tit">{cur.title}</h5>
                              <div class="card-subtitle text-muted mb-3">{cur.date}</div>
                              <p class="card-text" id="cardflo">
                                Category : {cur.category}
                              </p>
                              <p class="card-text" id="cardflo">Creator : {user[j].username}</p>
                              <NavLink  to={"/blogs?blogsid="+cur.blogid} class="card-link">Blog link</NavLink>
                              <NavLink id="nv" to={"/userProfile?uid="+cur.uid} class="card-link">Creator Profile</NavLink>
                              </div>
                              </div>
        
                            )
                            }
                        }}
                        }

                     
                        
                    })
               
                

           
            }
            
            <div class="row">
               
            
              
           
            </div>
          </div>
          

        
          
      

          <div class="content-backdrop fade"></div>
        </div>
     
      </div>
     
    </div>

  
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
  )
}

export default Explore