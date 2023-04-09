const request = require("postman-request");

const forecast = (latitude,longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f1e1773233a3291311c7433394a8917&query=' + latitude + ',' + longtitude + '&units=m'

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees, but it feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports = forecast