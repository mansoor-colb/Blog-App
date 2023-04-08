import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'

import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Header from './Header';
import Nav from './Nav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const User = () => {
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const type = queryParameters.get("uid");
    const navigate = useNavigate();
 const[prof,setprof]=useState([0])
 const[blogs,setblogs]=useState([])
 const[follow,setfollowers]=useState([])
const[flag,setflag]=useState(false)

 useEffect(() => {
  
    getblogs();
    
    
    }, [0])

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
            getprofile(); 
            followers()
        console.log(response.data);
     
        }).catch(function (error) {
        console.error(error);
        });
}
    function getprofile(){
     
       
        

        var options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/vlogapi/getuseruid/',
        data: {"uid":type}
        };

        axios.request(options).then(function (response) {
        console.log(response.data);
         
        setprof(response.data)
        }).catch(function (error) {
        console.error(error);
        });

    }
    var uiid=localStorage.getItem("blog");
    function followers(){


        var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/getfolluid/'};
        
        axios.request(options).then(function (response) {
            setfollowers(response.data)
          
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    }
    //     

   
    function log(){
      toast.warning('Login to Follow', {
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
    function following(){
      toast.warning('Already Following', {
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
    function startfollow(){
      let yu=true;
      follow.map((cur,j)=>{
                                    
        if(cur.user == uiid &&  cur.following==type){
          yu=false

        }
      })
      if(yu){

      
        var options = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/vlogapi/createfollow/',
            data: {user: uiid, follower: '', following: type}
          };
          
          axios.request(options).then(function (response) {
            if(response.data.codes){
                alert("some error occured")
            }
            else{
             
                var options = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/vlogapi/createfollow/',
                    data: {user: type, follower: uiid, following:''}
                  };
                  axios.request(options).then(function (response) {
                    if(response.data.codes){
                        alert("err")
                    }
                    else{
                      toast.success('You are following ', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        }) 
                        setflag(true)
                        
                    }
                })
            }
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
        }else{
          toast.warning('Already Following', {
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
    }
    

     
  return (
   
  
  
    
 

<>

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
<div id="blogcont">
<Nav title={ uiid ? flag ? <><button onClick={following} type="button" class="btn rounded-pill btn-primary">
                              <span class="tf-icons bx bx-shape-circle"></span>&nbsp; Following
                            </button><NavLink to ="/dashboard"><button type="button" class="btn btn-secondary ml-5">My Dashboard</button></NavLink></>: <><button type="button" onClick={startfollow}class="btn rounded-pill btn-primary">
                              <span class="tf-icons bx bx-shape-circle"></span>&nbsp; Follow
                            </button><NavLink to ="/dashboard"><button type="button" class="btn btn-secondary ml-5">My Dashboard</button></NavLink></> :<><button onClick={log} type="button" class="btn rounded-pill btn-primary">
                              <span class="tf-icons bx bx-shape-circle" ></span>&nbsp; Follow
                            </button><NavLink to ="/register"><button type="button" class="btn btn-secondary ml-5">Sign in</button></NavLink></>}/>
<div class="footblog"> 
       <p class="display-6" id="tit"> {prof.username}</p>
       <h5 class="">{prof.email} </h5>
   
       </div>
       <span class="display-4  mt-12" id="pub">Published Blogs</span>
       <div class="blogprof">

       {
       

        

blogs.map((cur,ind)=>{
    console.log(type)
    if(cur.uid==type && cur.view==1){
        return(
            <div  class="card m-3" id="blogcards">
           <div class="card-body">
          <h5 class="card-title" id="tit">{cur.title}</h5>
          <div class="card-subtitle text-muted mb-3">{cur.date}</div>
          <p class="card-text">
            Category : {cur.category}
          </p>
          <NavLink  to={"/blogs?blogsid="+cur.blogid} class="card-link">Blog link</NavLink>
          
 </div>

</div>

        )
    }
    
    
})
}



       </div>
       
       </div>
    
                
   
        

   

      
       
       
            
               
            
              
           
            

          

        
          
      


       


  

            </>
  )
}

export default User