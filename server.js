const express = require('express')()
const app = express
const request = require('request')
const config = require('config')


const apiKey= config.get('apiKey');

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(apiKey);

const baseUrl = 'https://newsapi.org/v2/top-headlines?'
app.set('view engine', 'ejs')

var source = "the-new-york-times"
/*
function getHeadlines(res, source) {
  var url =  baseUrl +
           'sources=' + source +
          '&apiKey=' + apiKey;
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

}
*/

function getArticles(source) {
  return newsapi.v2.topHeadlines({sources: source,source}).then(response => {
    return response;
});
}
app.get('/', function (req, res) {
  var articles = []
  var nytimes = getArticles("the-new-york-times")
  var wsj = getArticles("the-wall-street-journal")

  Promise.all([nytimes, wsj]).then(function(values) {
    res.render('index', {sources: values});

  })


  /*var other = getArticles("the-new-york-times").then(results => {
    res.render('index', {source2: results.articles[0].source.name, response2: results.articles});
  })
  var same = getArticles("the-new-york-times").then(results => {
    res.render('index', {source3: results.articles[0].source.name, response3: results.articles});
  })
  */
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
