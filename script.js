const API_KEY = "d565925eeaeeeb80ff297ace22438649";
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

document.getElementById('searchButton').addEventListener('click', (event) => {
    event.preventDefault()
    const city = document.getElementById('inputCityUser').value
    if (city) {
        getWheaterData(city)
    }
})

function animateCard(cardContainer) {
    cardContainer.classList.add('animate');
    
    cardContainer.addEventListener('animationend', () => {
        cardContainer.classList.remove('animate');
    });
}

function getWheaterData(city) {
    fetch(
        `${baseURL}?q=${city}&appid=${API_KEY}&lang=es&units=metric`
      )
        .then((response) => response.json())
        .then((response) => showWeatherData(response));
}

function showWeatherData(response) {
    console.log(response)
    if (response.cod == 200) {
        const description = response.weather[0].description
        const weatherData = document.getElementById('weatherData')
        animateCard(weatherData)

        document.getElementById('cityName').textContent = `${response.name}, ${response.sys.country}`

        document.getElementById('latData').textContent = response.coord.lat
        
        document.getElementById('lonData').textContent = response.coord.lon

        document.getElementById('temperatureData').textContent = `${response.main.temp}°C`

        document.getElementById('humidityData').textContent = `${response.main.humidity}%`

        document.getElementById('iconWeather').src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

        document.getElementById('descriptionData').textContent = description.charAt(0).toUpperCase() + description.slice(1)
    } else if (response.cod == 404 && response.message === 'city not found') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que esa ciudad no existe'
        })
    } else if (response.cod == 404 && response.message === 'Internal error') {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Ahora estamos experimentado problemas. Por favor intenta más tarde.'
        })
    } else if (response.cod == 401 && String(response.message).startsWith('Invalid API key')) {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Por favor contacta al desarrollador he informa de este problema.'
        })
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Ahora mismo no está disponible este servicio. ¡Vuelve pronto!'
        })
    }
}
