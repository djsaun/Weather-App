const https = require('https');
const http = require('http');
const api_key = require('./api.json');

// print temp details

function printWeather(queryType, weather) {
  const fullLocation = weather["current_observation"]["display_location"]["full"];
  const zipLocation = weather["current_observation"]["display_location"]["zip"];
  const heatIndex = weather["current_observation"]["heat_index_f"];
  let location = "";

  if (queryType === "zip") {
    location = zipLocation;
  } else {
    location = fullLocation;
  }

  let tempResponse = "";
  tempResponse += `The current temperature for ${location} is ${weather["current_observation"]["temp_f"]} degrees Fahrenheit`;

  if (heatIndex != 'NA') {
    tempResponse += ` with a heat index of ${heatIndex} degrees Fahrenheit.`;
  } else {
    tempResponse += `.`;
  }

  console.log(tempResponse);
}

// print error messages

function printError(error) {
  console.error(error.message);
}

function getWeather(query) {
  try {
    const weatherRequest = https.get(`https://api.wunderground.com/api/${api_key.key}/conditions/q/${query}.json`, response => {
      if (response.statusCode === 200) {
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
          printError(error);
        })

        response.on('end', () => {
          const queryError = new Error(`The location '${query}' was not found. Please try again.`);

          try {
            const bodyContent = body.toString();
            const parsedContent = JSON.parse(bodyContent);

            if (parsedContent['current_observation']['display_location']) {
              printWeather(queryType, parsedContent);
            } else {
              printError(queryError);
            }

          } catch(error) {
            printError(queryError);
          }
        });
      } else {
        const statusCodeError = new Error(`There was an error getting the result for ${query}. (${http.STATUS_CODES[response.statusCode]})`);
        printError(statusCodeError);
      }
    });
  } catch(error) {
    printError(error);
  }
}

module.exports.getWeather = getWeather;
