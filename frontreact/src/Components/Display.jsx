import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import Nav  from "./Nav";
import Parser from 'rss-parser/dist/rss-parser.min.js';

// const queryParameters = new URLSearchParams(window.location.search)

const Blogs = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const type = queryParameters.get("blogsid");
  const url = queryParameters.get("url");
  const [rssItems, setRssItems] = useState([]);
  const [cont, setcont] = useState("");
  const [title, setitle] = useState("");
  const [cat, setcat] = useState("");
  const [prof, setprof] = useState("");
  const [mail, setmail] = useState("");
  const [uid, setuid] = useState("612543");

  
// alert(url)
// alert(type)

function rssfetch(){
    // let srcitem=urp;

    // if(urp==0){
    //   srcitem=srcbar

    // }

    let parser = new Parser();


    



parser.parseURL(`http://localhost:4050/medium?uid=${url}`, function(err, feed) {
if (err) throw err;
console.log(feed);

  setRssItems(feed.items);
 



})
   }  

  useEffect(() => {
    rssfetch()
  }, []);


  return (
    <div id="blogcont">
        <Nav title={title}/>
      <div class="blogmain">
      {rssItems.map((item, index) => {
            if(item.guid==type){
                return(
                <>
                 <span class="display-4  mt-2">{item.title}</span>
                 <br/>
                 <br/>
                 <br/>
                 <p>{item.content}</p>
                
                </>
                )
            }

      })}
      </div>
      <div class="footblog"> 
      {/* <p class="display-6"> Category : {item.categories}</p>
      <h5 class="">Published On : {item.pubDate}</h5> */}
      {/* <h6 class="">  {mail}</h6> */}
      
      </div>
    </div>
  );
};

export default Blogs;
