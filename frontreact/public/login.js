
function h(){
  alert(4)

}
async function fn1 () {
  let Parser = require('rss-parser');
let parser = new Parser();

  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });

}