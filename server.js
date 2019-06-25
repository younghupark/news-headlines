const express = require('express')()
const app = express
const request = require('request')
const config = require('config')

const apiKey= config.get('apiKey');

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(apiKey);

const baseUrl = 'https://newsapi.org/v2/top-headlines?'
app.set('view engine', 'ejs')

function getArticles(source) {
  return newsapi.v2.topHeadlines({sources: source}).then(response => {
    return response;
});
}
app.get('/', function (req, res) {
  var articles = []
  var nytimes = getArticles("the-new-york-times")
  var wsj = getArticles("the-wall-street-journal")
  var econ = getArticles("the-economist")

  Promise.all([nytimes, wsj, econ]).then(function(values) {
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
