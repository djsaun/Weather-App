const https = require('https');
const api_key = require('./api.json');

// print temp details

// print error messages

function getWeather(query) {
  const weatherRequest = https.get(`https://api.wunderground.com/api/${api_key.key}/conditions/q/${query}.json`, response => {

    const zipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let queryType = "";
    if (zipCode.test(query)) {
      queryType = "zip";
    } else {
      queryType = "city";
    }

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
      const fullLocation = parsedContent["current_observation"]["display_location"]["full"];
      const zipLocation = parsedContent["current_observation"]["display_location"]["zip"]
      let location = "";

      if (queryType === "zip") {
        location = zipLocation;
      } else {
        location = fullLocation;
      }

      console.log(`The current temperature for ${location} is ${parsedContent["current_observation"]["temp_f"]} degrees Fahrenheit with a heat index of ${parsedContent["current_observation"]["heat_index_f"]} degrees Fahrenheit.`)
    })
  })
}

module.exports.getWeather = getWeather;
