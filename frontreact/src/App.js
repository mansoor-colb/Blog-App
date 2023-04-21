
import './App.css';
import axios from "axios";

import Login from './Components/Login';
import Register from './Components/Register';
import {Switch,Route, Routes} from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Fogotpass from './Components/Fogotpass';
import Profile from './Components/Profile';
import Create from './Components/Create';
import Blogs from './Components/Blogs';
import Explore from './Components/Explore';
import User from './Components/User';
import Rss from './Components/RssFeed';
import Display from './Components/Display';

function App() {


    // async function getAllStudent(){
    //   try {

    //     // var axios = require("axios").default;

    //     // var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/userdet/2/'};
        
    //     // axios.request(options).then(function (response) {
    //     //   console.log(response.data);
    //     // }).catch(function (error) {
    //     //   console.error(error);
    //     // });


      

    //     var options = {
    //       method: 'POST',
    //       url: 'http://127.0.0.1:8000/vlogapi/getuser/',
    //       data: {uid: 13456}
    //     };
        
    //     axios.request(options).then(function (response) {
    //       console.log(response);
    //     }).catch(function (error) {
    //       console.error(error);
    //     });

    //     // const students = await axios.get("http://127.0.0.1:8000/vlogapi/student/")
    //     const students = await axios.get("http://127.0.0.1:8000/vlogapi/user/")
    //     console.log(students)
    //     setStudents(students.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
 
  return (
    <>
   
    <div className="App">
  
    <Routes>
    <Route exact path='/' Component={Dashboard}/>
      <Route  exact path='/login' Component={Login}/>
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/dashboard' Component={Dashboard}/>
      <Route exact path='/forgotpass' Component={Fogotpass}/>
      <Route exact path='/editprof' Component={Profile}/>
      <Route exact path='/create' Component={Create}/>
      <Route exact path='/blogs' Component={Blogs}/>
      <Route exact path='/explore' Component={Explore}/>
      <Route exact path='/userProfile' Component={User}/>
      <Route exact path='/feed' Component={Rss}/>
      <Route exact path='/display' Component={Display}/>
    </Routes>
    
    </div>
    </>
  );
}

export default App;
