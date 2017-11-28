var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
const acorn = require("acorn")
const walk = require("acorn/dist/walk")

app.get('/scrape', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.deezer.com/us/show/53118';
    console.log('works')

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            // console.log(html)

            const $ = cheerio.load(html);
            var script = $('script')
            for (var i = 0, len = script.length; i < len; i++) {
                var scripPart = script[i]
                var child = scripPart['children']
                var data = child[0]['data']
                walk.full(acorn.parse(child[0]['data']), node => {
                    console.log(`There's a ${node.name}`)
                })
            }
        }
    })
})

app.listen('8080')
exports = module.exports = app;