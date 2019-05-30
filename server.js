const express = require('express')()
const app = express
const request = require('request')
const config = require('config')

const apiKey= config.get('apiKey');

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  var url = 'https://newsapi.org/v2/top-headlines?' +
           'sources=the-new-york-times&' +
          'apiKey=' + apiKey;
request(url, function (err, response, body) {
    if(err){
      console.log('stuff')
    } else {
      if(!response){
        console.log('none');
      } else {
        var results = JSON.parse(body);
        var articles = results.articles
        var source = articles[1].source.name
        res.render('index', {source: source, response: articles});
      }
    }
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
