// var axios = require("axios").default;
// const fs = require("fs");
import fs from 'fs'
// const RSS = require("rss");
import RSS from "rss"
import axios from "axios";
import cron from 'node-cron'



var options = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/blogs/'};

// let uid=localStorage.getItem("blog");


var optionsmain = {method: 'GET', url: 'http://127.0.0.1:8000/vlogapi/user/'};
function h(){

axios.request(optionsmain).then(function (response) {
  console.log(response.data);

  for (let j of response.data){
  let blog = {
      title: "Bloxg",
      category:'tech',
      description: "Blog is a platform for people to exprees their ideas to world.",
      author: j.username,
      image_url:'https://th.bing.com/th/id/OIP.ByxATUtIwmDaftghUGNx4QHaEo?pid=ImgDet&rs=1',
      articles: [] ,
        publishedDate: new Date().getDate()
      
    };

// cron.schedule('4 * * * * *', () => {
axios.request(options).then(function (response1) {
  console.log(response1.data);
  for(let i of response1.data){
    if(i.view==1 && i.uid==j.uid){
    blog.articles.push(i
    )
    }
  }



const feed = new RSS({
    title: blog.title,
    description: blog.description,
    category: blog.category,
    author:blog.author,
    
});

for (const article of blog.articles) {
    feed.item({
        title: article.title,
        description: article.category,
        guid:article.blogid,
        categories:[article.category],
    
        url: `http://localhost:3000/blogs?blogsid=${article.blogid}`,
        date: article.date
    });
}
// blog.articles=[]

const xml = feed.xml({ indent: true });
const directory = '../frontreact/src/feed'; // Relative path to the directory
const fileName = `feed${j.uid}.xml`;
const filePath = `${directory}/${fileName}`
fs.writeFileSync(filePath, xml);

}).catch(function (error) {
  console.error(error);
});
}
}).catch(function (error) {
  console.error(error);
});
}
h();
// })
