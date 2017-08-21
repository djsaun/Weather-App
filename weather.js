const https = require('https');
const api_key = require('./api.json');

// print temp details

// print error messages

function getWeather(query) {
  const weatherRequest = https.get(`https://api.wunderground.com/api/${api_key.key}/conditions/q/${query}.json`, response => {

    let body = "";

    response.on('data', data => {
      body += data;
    });

    response.on('error', error => {
      console.log(error.message);
    })

    response.on('end', () => {
      const bodyContent = body.toString();
      const parsedContent = JSON.parse(bodyContent);
      console.log(parsedContent['current_observation']);

      console.log(`The current temperature for ${parsedContent["current_observation"]["display_location"]["full"]} is ${parsedContent["current_observation"]["temp_f"]} degrees Fahrenheit with a heat index of ${parsedContent["current_observation"]["heat_index_f"]} degrees Fahrenheit.`)
    })
  })
}

module.exports.getWeather = getWeather;
