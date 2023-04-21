import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Header from './Header';
import car from '../feed.xml';
import Nav from './Nav';

const Profile = () => {
  console.log("ren")
   var uid= localStorage.getItem("blog");
    const [email, setmail]=useState("");
    const [input, setInput] = useState()
    const[follow,setfollowers]=useState([])
    const [user,setuser]=useState(0);
   
    const [passwordd, setPass]=useState("");

    const [phonee, setphone]=useState("");
    const[cclass,newcclass]=useState("pst")
    

    function followers(){


      var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/getfolluid/'};
      
      axios.request(options).then(function (response) {
          setfollowers(response.data)
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
  }

  function getuser(){
  

    var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/user/'};
    
    axios.request(options).then(function (response) {
      setuser(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    }
function upprof(){
  
    
if(1){
    var options = {
        method: 'PUT',
        url: 'http://127.0.0.1:8000/vlogapi/updateuser/',
        data: {uid: uid , username:input || prof.username,password:passwordd || prof.password,phone:phonee ||prof.phone }
        };

        axios.request(options).then(function (response) {
            if(response.data.codes){
                alert("Try later")
            }
            else{
                getprofile();
                swal("Updated Succces fUlly","Success","success")

            }
        console.log(response.data);
        }).catch(function (error) {
       alert(66)
        });
}
else{
    swal("Please fill all the details","","warning")


       
    }
}
    function toggle(){
        if(cclass=='pst'){

            newcclass('ast')
        }
        else{
            newcclass('pst')

        }


    }
    const navigate = useNavigate();
    function logout()
{
    localStorage.removeItem("blog")
    navigate("/login")
    
}

    const[prof,setprof]=useState([])
    function getprofile(){
       
      console.log("re334n")

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
            getuser();
            followers();
        },[])
   
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
    <span class="display-4 ml-5 mt-2">My Profile</span>
     <div class="content-wrapper">
      

      <div class="container-xxl flex-grow-1 container-p-y">
     <div class="row" >
    <div class="card mb-4" id="profcard">
                   
                   
                    <div class="card-body" >
                      <div class="d-flex align-items-start align-items-sm-center gap-4">
                        <img src="../assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar"/>
                        
                      </div>
                    </div>
                    <hr class="my-0"/>
                    <div class="card-body">
                      <div id="formAccountSettings">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="firstName" class="form-label">User Name</label>
                            <input class="form-control" type="text" id="firstName" placeholder={prof.username} name="firstName" defaultValue={prof.username} 
           onChange={(e) => setInput(e.target.value)}/>
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Password</label>
                            <input class="form-control" type="text" name="lastName" id="lastName" defaultValue={prof.password} onChange={(e) => setPass(e.target.value)} placeholder={prof.password}/>
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            {/* <input class="form-control" type="text" id="email" name="email" value="john.doe@example.com" placeholder="john.doe@example.com" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYmZkZTQxOS00ZGRkLWU5NDYtOWQ2MC05OGExNGJiMTA3N2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDAyNDkwMkRDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAyNDkwMkNDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU2NTE1NDItMmIzOC1kZjRkLTk0N2UtN2NjOTlmMjQ5ZGFjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJiZmRlNDE5LTRkZGQtZTk0Ni05ZDYwLTk4YTE0YmIxMDc3ZiIv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&quot;) !important; background-repeat: no-repeat; background-size: 20px; background-position: 97% center; cursor: auto;" data-temp-mail-org="0"> */}
                            <input type="text" class="form-control" id="organization" name="organization" defaultValue={prof.email} disabled onChange={(e) => setmail(e.target.value)} placeholder={prof.email}/>
                          </div>
                        
                          <div class="mb-3 col-md-6">
                            <label class="form-label" for="phoneNumber">Phone Number</label>
                            <div class="input-group input-group-merge">
                              <span class="input-group-text">IN (+91)</span>
                              <input type="text" id="phoneNumber" placeholder={prof.phone} name="phoneNumber" defaultValue={prof.phone} onChange={(e) => setphone(e.target.value)} class="form-control"/>
                            </div>
                          </div>
                          
                         
                          
                          
                          
                        </div>
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" onClick={upprof}>Save changes</button>
                          <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  </div>
                    
                  </div>
                  </div>
                  <div class="col-lg-6 ">
                  <p class="nav-item">
                      <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-link-alt me-1"></i> Connections</a>
                    </p>
                      <div class="mt-3">
                        <div class="row">
                          <div class="col-md-4 col-12 mb-3 mb-md-0">
                            <div class="list-group">
                              <a class="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" href="#list-home">Followers</a>
                              <a class="list-group-item list-group-item-action active" id="list-profile-list" data-bs-toggle="list" href="#list-profile">Following</a>

                            </div>
                          </div>
                          <div class="col-md-8 col-12">
                            <div class="tab-content p-0">
                              <div class="tab-pane fade" id="list-home">
                              <div class="list-group">
                                {
                                  follow.map((cur,j)=>{
                                    
                                    if(cur.user == uid &&  cur.follower!=""){
                                      for (let [a,z] of Object.entries(user)){
                                        console.log(z.uid+" "+ cur.follower)
                                          if(z.uid==cur.follower){
                                            return(

                                            <a href={"/userProfile?uid="+cur.follower} class="list-group-item list-group-item-action ">{user[a].username}</a>
                                   ) }
                                  }
                                }

                                  })
                                }
                          
                        </div>
                              </div>
                              <div class="tab-pane fade active show" id="list-profile">
                              <div class="list-group">
                                {
                                  follow.map((cur,j)=>{
                                    
                                    if(cur.user == uid &&  cur.following!=""){
                                      for (let [a,z] of Object.entries(user)){
                                        console.log(z.uid+" "+ cur.follower)
                                          if(z.uid==cur.following){
                                            return(

                                              <a href={"/userProfile?uid="+cur.following} class="list-group-item list-group-item-action ">{user[a].username}</a>
                                   ) }
                                  }
                                }

                                  })
                                }
                          
                        </div>
                              </div>
                              <div class="tab-pane fade" id="list-messages">
                                Ice cream dessert candy sugar plum croissant cupcake tart pie apple pie. Pastry
                                chocolate chupa chups tiramisu. Tiramisu cookie oat cake. Pudding brownie bonbon. Pie
                                carrot cake chocolate macaroon. Halvah jelly jelly beans cake macaroon jelly-o. Danish
                                pastry dessert gingerbread powder halvah. Muffin bonbon fruitcake dragée sweet sesame
                                snaps oat cake marshmallow cheesecake. Cupcake donut sweet bonbon cheesecake soufflé
                                chocolate bar.
                              </div>
                              <div class="tab-pane fade" id="list-settings">
                                Marzipan cake oat cake. Marshmallow pie chocolate. Liquorice oat cake donut halvah
                                jelly-o. Jelly-o muffin macaroon cake gingerbread candy cupcake. Cake lollipop lollipop
                                jelly brownie cake topping chocolate. Pie oat cake jelly. Lemon drops halvah jelly
                                cookie bonbon cake cupcake ice cream. Donut tart bonbon sweet roll soufflé gummies
                                biscuit. Wafer toffee topping jelly beans icing pie apple pie toffee pudding. Tiramisu
                                powder macaroon tiramisu cake halvah.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  
    </div>
    </div>
  )
}

export default Profile