import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import Nav  from "./Nav";

// const queryParameters = new URLSearchParams(window.location.search)

const Blogs = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const type = queryParameters.get("blogsid");
  const [cont, setcont] = useState("");
  const [title, setitle] = useState("");
  const [cat, setcat] = useState("");
  const [prof, setprof] = useState("");
  const [mail, setmail] = useState("");


  function getprofile(){
    var uid=localStorage.getItem("blog")
       
        

    var options = {
    method: 'POST',
    url: 'http://127.0.0.1:8000/vlogapi/getuseruid/',
    data: {"uid":uid}
    };

    axios.request(options).then(function (response) {
    console.log(response.data.username);
    
    setprof(response.data.username)
    setmail(response.data.email)
    }).catch(function (error) {
    console.error(error);
    });

}
  function getblog() {
    if (type !== "") {
      var options = {
        method: "POST",
        url: "http://127.0.0.1:8000/vlogapi/getblogbid/",
        data: { blogid: type },
      };

      axios
        .request(options)
        .then(function (response) {
          setcont(response.data.content);
          setitle(response.data.title);
setcat(response.data.category)
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      alert(8);
    }
  }
 
  console.log(1)
  useEffect(() => {
    getblog();
    getprofile()
  }, []);

  return (
    <div id="blogcont">
        <Nav title={title}/>
      <div class="blogmain">{parse(cont)}</div>
      <div class="footblog"> 
      <p class="display-6"> Category : {cat}</p>
      <h5 class="">Editor : {prof}</h5>
      <h6 class="">  {mail}</h6>
      
      </div>
    </div>
  );
};

export default Blogs;
