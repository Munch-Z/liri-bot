require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
const args = process.argv.slice(2);

const op = args[0];
const userInput = args[1];




function searchSpotify(query) {
    let spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let importantInfo = data.tracks.items[0];
        console.log(importantInfo.artists[0].name); //Artist
        console.log(importantInfo.album.name); //Album
        console.log(importantInfo.preview_url); //Preview
        console.log(importantInfo.name);  //Name of song
    });
}

function searchOMDB(query) {

    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=eaff8485&t=${query}`).then((data) => {

        let movie = data.data;
        console.log(movie.Title); //title
        console.log(movie.Year); //year
        console.log(movie.imdbRating); //IMDB rating
        console.log(movie.Ratings[1].Value); //Rotten Tomatoes
        console.log(movie.Country); //Country where produced
        console.log(movie.Language); //Language
        console.log(movie.Plot); //Plot
        console.log(movie.Actors); //Actors

    }).catch((error) => {
        console.log(error);
    })
}

switch (op) {
    case 'spotify-this-song':
        searchSpotify(userInput);
        break;
    case 'movie-this':
        searchOMDB(userInput);
        break;
    default:
        console.log('INVALID INPUT');
        break;
}
