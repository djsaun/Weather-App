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
      const zipLocation = parsedContent["current_observation"]["display_location"]["zip"];
      const heatIndex = parsedContent["current_observation"]["heat_index_f"];
      let location = "";

      if (queryType === "zip") {
        location = zipLocation;
      } else {
        location = fullLocation;
      }

      let tempResponse = "";
      tempResponse += `The current temperature for ${location} is ${parsedContent["current_observation"]["temp_f"]} degrees Fahrenheit`;


      if (heatIndex != 'NA') {
        tempResponse += ` with a heat index of ${heatIndex} degrees Fahrenheit.`;
      } else {
        tempResponse += `.`;
      }

      console.log(tempResponse);
    })
  })
}

module.exports.getWeather = getWeather;
