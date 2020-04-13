const request = require('request');

// const url = 'http://api.weatherstack.com/current?access_key=d5f217766402b840cb44aea9deb10e15&query=-3.7899266,-38.5889879&units=m   ';

// const MapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/maceio.json?access_token=pk.eyJ1Ijoiam9jYmFyYm9zYSIsImEiOiJjazh2cjV2OXEwZGdkM2tvNGY5YzlhMXRyIn0.fhiLInSY17SrO4Jaqxu0mg';


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoiam9jYmFyYm9zYSIsImEiOiJjazh2cjV2OXEwZGdkM2tvNGY5YzlhMXRyIn0.fhiLInSY17SrO4Jaqxu0mg';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find this location. Try another one!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[3].center[1],
                longitude: response.body.features[3].center[0],
                location: response.body.features[3].place_name,
            });
        }
    });
}

geocode('rua padre valdevino, fortaleza ', (error, response) => {
    console.log('Error', error);
    console.log('Data', response);
});