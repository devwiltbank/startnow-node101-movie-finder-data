// use "node server" to launch the server, they left out the start script.
// require modules

var express     = require('express');
var morgan      = require('morgan');
var axios       = require('axios');
var app         = express();
var path        = require('path');
var cache       = {};

//Log it to the server console
app.use(morgan('common'));

// route for express server
app.get('/', (req, res,) => {

var movieId     = req.query;

// conditional to determine if user ID "i" is present and if in cache or need to get.
    if(movieId.i) {
        console.log('inside i conditional')

        if(cache[movieId.i]) {
            console.log('i return from cache');
            return res.status(200).send(cache[movieId.i]);
        }
// i not in cache, use axios to get from OMDB        
        else {
            axios.get('http://www.omdbapi.com/?i=' + encodeURIComponent(movieId.i) + '&apikey=8730e0e')
                .then((response) => {
                    console.log('i get using axios from OMDB');
                    cache[movieId.i] = response.data;
                    return res.status(200).send(response.data);
                })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
        }
    }

// determine if search term "t" exists and if in cache or need to get.
    else if(movieId.t) {
        console.log('inside t conditional');
        if(cache[movieId.t]) {
            console.log('t from cache');
            return res.status(200).send(cache[movieId.t]);
        }
    
// t not in cache, get from OMDB using axios
        else {
            axios.get('http://www.omdbapi.com/?t=' + 
                encodeURIComponent(movieId.t) + '&apikey=8730e0e')
                .then((response) => {
                    console.log('t get using axios from OMDB');
                    cache[movieId.t] = response.data;
                    return res.status(200).send(response.data);
                })
// report any errors                
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
        }
    }

    else { res.send('you did not make a request');
    }

    })

    module.exports = app;