require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
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

function searchBand(query) {

    axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`).then((data) => {

    let bandInfo = data.data[0];
    let time = bandInfo.datetime;
    let momentTime = moment(time);

    console.log(bandInfo.venue.name); //Venue Name
    console.log(bandInfo.venue.country, bandInfo.venue.city); //Venue Location
    console.log(momentTime.format("dddd, MMMM Do YYYY, h:mm:ss a")); //Date of the event
    

    }).catch((error) => {
        console.log(error);
    })
}

function doWhatItSays() {

    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) return console.log(err);

        let arr = data.split(', ');
        
        processArg(arr[0], arr[1]);
    })
}



function processArg(op, userInput) {
    switch (op) {
        case 'spotify-this-song':
            searchSpotify(userInput);
            break;
        case 'movie-this':
            searchOMDB(userInput);
            break;
        case 'concert-this':
            searchBand(userInput);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('INVALID INPUT');
            break;
    }
}

processArg(op, userInput);

