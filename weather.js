const https = require('https');
const api_key = require('./api.json');

// print temp details

// print error messages

function getWeather(query) {
  const weatherRequest = https.get(`https://api.wunderground.com/api/${api_key.key}/conditions/q/${query}.json`, response => {
    response.on('data', data => {
      console.log(data.toString());
    });
  })
}

module.exports.getWeather = getWeather;
