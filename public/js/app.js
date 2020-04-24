const weatherForm = document.querySelector('form');
const latitudeSearch = document.getElementById('latitude')
const longitudeSearch = document.getElementById('longitude');


const country = document.getElementById('country');
const region = document.getElementById('region');
const timezone = document.getElementById('timezone');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const locationTop = document.getElementById('location-top');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const latitude = latitudeSearch.value;
    const longitude = longitudeSearch.value;


    fetch(`http://api.weatherstack.com/current?access_key=d5f217766402b840cb44aea9deb10e15&query=${latitude},${longitude}&units=m`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                country.textContent = data.location.country;
                region.textContent = data.location.region;
                timezone.textContent = data.location.timezone_id;
                temperature.textContent = data.current.temperature + ' C°';
                windSpeed.textContent = data.current.wind_speed + ' km/h';
                humidity.textContent = data.current.humidity;
                locationTop.textContent = data.location.region;
            }
        });
    });
});

