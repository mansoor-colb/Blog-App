// let Parser = require('rss-parser');
// let parser = new Parser();
// alert(4)
// async function fn1 () {

//   let feed = await parser.parseURL('https://www.reddit.com/.rss');
//   console.log(feed.title);

//   feed.items.forEach(item => {
//     console.log(item.title + ':' + item.link)
//   });

// }

const express = require('express')
const request = require('request')
const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.get('/medium', (req, res) => {

  request(
    { url: req.query.uid},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message:
      err.message })
    }
    
    res.set('Content-Type', 'application/rss+xml')
    res.send(Buffer.from(body))
  })
})
const PORT = process.env.PORT || 4050
app.listen(PORT, () => console.log(`listening on ${PORT}`))