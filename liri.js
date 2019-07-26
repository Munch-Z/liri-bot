require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const args = process.argv.slice(2);

const op = args[0];
const userInput = args[1];




function searchSpotify (query) {
    let spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
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

switch(op) {
    case 'spotify-this-song':
        searchSpotify(userInput);
        break;
    default:
        console.log('INVALID INPUT');
        break;
}
