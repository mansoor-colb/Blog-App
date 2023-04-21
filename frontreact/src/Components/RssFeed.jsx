import React, { useEffect, useState } from 'react';
// import Parser from 'rss-parser';
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
import Header from './Header';
import Nav from './Nav';
import Parser from 'rss-parser/dist/rss-parser.min.js';

const RssFeed = () => {
  const [rssItems, setRssItems] = useState([]);
  const [mainurl, setmainurl] = useState([]);
  const [full, setfull] = useState([]);
  const [style, setStyle] = useState("input-group finalsub");
  const [srcbar, setsrc] = useState([]);
  const navigate = useNavigate();
  const[prof,setprof]=useState([0])
  const[blogs,setblogs]=useState([])
  const[feedlist,setfeedlist]=useState([])
  const[cclass,newcclass]=useState("pst")
  const [val, setval] = useState();
  function toggle(){
     if(cclass=='pst'){
 
         newcclass('ast')
     }
     else{
         newcclass('pst')
 
     }
 }
  useEffect(() => {
     getprofile();
     getlist()
     if (!(localStorage.getItem("blog"))){
 
        navigate("/login")
     }
     
     }, [0])
 
 function logout()
 {
     localStorage.removeItem("blog")
     navigate("/login")
     
 }
 let uid= localStorage.getItem("blog");

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

     
 function rsssavefetch(urp){
  // alert(urp)
      // let srcitem=urp;

      

      let parser = new Parser();


      

parser.parseURL(`http://localhost:4050/medium?uid=${urp}`, function(err, feed) {
if (err) throw err;
console.log(feed);

     setmainurl(urp)
    setRssItems(feed.items);
    setfull(feed);
    // setStyle("input-group finalsubshow")
 
  
  })
     }     
   
 function rssfetch(){
          // let srcitem=urp;

          // if(urp==0){
          //   srcitem=srcbar

          // }

          let parser = new Parser();
   
  
          
 if(srcbar==''){
  swal("Please provide url","","error");
  return
 }
  parser.parseURL(`http://localhost:4050/medium?uid=${srcbar}`, function(err, feed) {
    if (err) throw err;
    console.log(feed);
    setmainurl(srcbar)
    setfull(feed);
        setRssItems(feed.items);
        setStyle("input-group finalsubshow")
      
     
      
      })
         }  
     



   

  function rssregister(){
    if(val==''){
      swal("Please provide name for Feed"," ","error")
    }
    else{
    

var options = {
  method: 'POST',
  url: 'http://127.0.0.1:8000/vlogapi/feedcreate/',
  data: {user: localStorage.getItem("blog"), feedname: val, feedurl: srcbar}
};

axios.request(options).then(function (response) {
  swal("Feed Added Successful","","success")
  getlist()
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
      console.log(val)
    }

  }
    
function getlist(){
  

var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/feedlist/'};

axios.request(options).then(function (response) {
  setfeedlist(response.data)
  console.log(response.data);
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
    <div id="igp" class="input-group m-4">
                            <input type="text" onChange={(e)=>setsrc(e.target.value)} class="form-control" aria-label="Text input with segmented dropdown button"/>
                            <button type="button" class="btn btn-outline-primary" onClick={rssfetch}>Action</button>
                            <button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                              <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" >
                            {
                              feedlist.map((item, index) =>{
                                return(
                                
                                <li><a class="dropdown-item" onClick={() => rsssavefetch(item.feedurl)}>{item.feedname}</a></li>
                                )
                              })
                            }
                            
                             
                              
                            </ul>
                            <div className={style}>
                
           <input type="text" class="form-control" name="contact" placeholder="Enter Feed name" onChange={e => setval(e.target.value)}/>
            <button class="btn btn-primary" onClick={rssregister} type="button" id="buttonfinal">Subscribe Rss</button>
          </div>
                          </div>
    <div>
    <span class="display-4 ml-5 mt-2">RSS Feed Items</span><br/>
    <span class="ml-5 mt-2">{full.title}</span>
      <div class="row p-5">
        {rssItems.map((item, index) => (
         
          <>
         
          { 
                  <div class="col-md-6 col-lg-4 mb-3">
                  <div class="card h-100">
                    <img id="fimg"class="card-img-top" src={full.image.url || '../assets/img/elements/2.jpg'} alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">
                        {item.contentSnippet.substr(0,82)}...
                      </p>
                      <a href={'/display?blogsid='+item.guid+'&url='+mainurl} class="btn btn-outline-primary">Blog Link</a>
                      <a href={item.link} class="btn btn-outline-primary">Web Blog Link</a>
                    </div>
                  </div>
                </div>
                }
         
          </>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>

  );

};

export default RssFeed;
// import React, { Component } from 'react';
// import Parser from 'rss-parser/dist/rss-parser.min.js';

// class RssFeed extends Component {
//   componentDidMount() {
//     const parser = new Parser();
//     parser.parseURL('https://example.com/feed.xml', (err, feed) => {
//       if (err) throw err;
//       console.log(feed);
//       // Do something with the feed data here
//     });
//   }

//   render() {
//     return (
//       // Your component JSX here
//       <>
//       </>
//     )
//   }
// }

// export default RssFeed;

