const infoContainer = document.getElementById('infoContainer');
const locationInput = document.getElementById('locationInput');
const locationTitle = document.getElementById('location');
const currentCondition = document.getElementById('currentCondition');
const currentTemperature = document.getElementById('currentTemperature');
const currentWind = document.getElementById('currentWind');
const currentHumiditiy = document.getElementById('currentHumidity');
const currentFeelsLike = document.getElementById('currentFeelsLike');
const dayOneDay = document.querySelector('[data-day="1"] .day-of-week');
const dayTwoDay = document.querySelector('[data-day="2"] .day-of-week');
const dayThreeDay = document.querySelector('[data-day="3"] .day-of-week');
const dayFourDay = document.querySelector('[data-day="4"] .day-of-week');
const dayFiveDay = document.querySelector('[data-day="5"] .day-of-week');
const daySixDay = document.querySelector('[data-day="6"] .day-of-week');
const daySevenDay = document.querySelector('[data-day="7"] .day-of-week');
const dayOneHigh = document.querySelector('[data-day="1"] .high');
const dayTwoHigh = document.querySelector('[data-day="2"] .high');
const dayThreeHigh = document.querySelector('[data-day="3"] .high');
const dayFourHigh = document.querySelector('[data-day="4"] .high');
const dayFiveHigh = document.querySelector('[data-day="5"] .high');
const daySixHigh = document.querySelector('[data-day="6"] .high');
const daySevenHigh = document.querySelector('[data-day="7"] .high');
const dayOneLow = document.querySelector('[data-day="1"] .low');
const dayTwoLow = document.querySelector('[data-day="2"] .low');
const dayThreeLow = document.querySelector('[data-day="3"] .low');
const dayFourLow = document.querySelector('[data-day="4"] .low');
const dayFiveLow = document.querySelector('[data-day="5"] .low');
const daySixLow = document.querySelector('[data-day="6"] .low');
const daySevenLow = document.querySelector('[data-day="7"] .low');
const dayOneCondition = document.querySelector('[data-day="1"] .condition');
const dayTwoCondition = document.querySelector('[data-day="2"] .condition');
const dayThreeCondition = document.querySelector('[data-day="3"] .condition');
const dayFourCondition = document.querySelector('[data-day="4"] .condition');
const dayFiveCondition = document.querySelector('[data-day="5"] .condition');
const daySixCondition = document.querySelector('[data-day="6"] .condition');
const daySevenCondition = document.querySelector('[data-day="7"] .condition');

const key = 'bae486a32aed4252b77195306232703';
const baseUrl = 'http://api.weatherapi.com/v1';

locationInput.addEventListener('keydown', async (e)=>{
    if (e.key === 'Enter') {
        const location = document.getElementById('locationInput').value;
        data = await dataObject(location);
        infoContainer.classList.add('dim');
        setTimeout(()=>{
            updateDisplay(data);
            infoContainer.classList.remove('dim');
        }, 500);
    }
});


dataObject = async (location) => {
    const getCurrentData = fetch(`${baseUrl}/current.json?key=${key}&q=${location}&aqi=no`);
    const getForecastData = await fetch(`${baseUrl}/forecast.json?key=${key}&q=${location}&days=7&aqi=no&alerts=no`);
    const [currentData, forecastData] = await Promise.all([getCurrentData, getForecastData])
    .then((responses) => Promise.all(responses.map((res) => res.json())));
    return {
        location: { 
            city: currentData.location.name,
            country: currentData.location.country,
            region: currentData.location.region
        },
        current: {
            currentTemperature: currentData.current.temp_f,
            currentFeelsLike: currentData.current.feelslike_f,
            currentHumidity: currentData.current.humidity,
            currentWind: currentData.current.wind_mph
        },
        forecast: [
            {
                maxTemp: forecastData.forecast.forecastday[0].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[0].day.mintemp_f,
                condition: forecastData.forecast.forecastday[0].day.condition.text,
                date: forecastData.forecast.forecastday[0].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[1].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[1].day.mintemp_f,
                condition: forecastData.forecast.forecastday[1].day.condition.text,
                date: forecastData.forecast.forecastday[1].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[2].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[2].day.mintemp_f,
                condition: forecastData.forecast.forecastday[2].day.condition.text,
                date: forecastData.forecast.forecastday[2].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[3].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[3].day.mintemp_f,
                condition: forecastData.forecast.forecastday[3].day.condition.text,
                date: forecastData.forecast.forecastday[3].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[4].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[4].day.mintemp_f,
                condition: forecastData.forecast.forecastday[4].day.condition.text,
                date: forecastData.forecast.forecastday[4].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[5].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[5].day.mintemp_f,
                condition: forecastData.forecast.forecastday[5].day.condition.text,
                date: forecastData.forecast.forecastday[5].date
            },
            {
                maxTemp: forecastData.forecast.forecastday[6].day.maxtemp_f, 
                minTemp: forecastData.forecast.forecastday[6].day.mintemp_f,
                condition: forecastData.forecast.forecastday[6].day.condition.text,
                date: forecastData.forecast.forecastday[6].date
            },
        ]

    }
}

updateDisplay = (data) => {
    if (data.location.country === "United States of America"){
        locationTitle.textContent = `${data.location.city}, ${data.location.region}`;
    }
    else {
        locationTitle.textContent = `${data.location.city}, ${data.location.country}`;
    }
    currentTemperature.textContent = data.current.currentTemperature;
    currentCondition.textContent = data.current.currentCondition;
    currentFeelsLike.textContent = `Feels Like: ${data.current.currentFeelsLike}°F`;
    currentWind.textContent = `Wind: ${data.current.currentWind} MPH`;
    currentHumiditiy.textContent = `Humidity: ${data.current.currentHumidity}%`;
    dayOneDay.textContent = data.forecast[0].date;
    dayTwoDay.textContent = data.forecast[1].date;
    dayThreeDay.textContent = data.forecast[2].date;
    dayFourDay.textContent = data.forecast[3].date;
    dayFiveDay.textContent = data.forecast[4].date;
    daySixDay.textContent = data.forecast[5].date;
    daySevenDay.textContent = data.forecast[6].date;
    dayOneHigh.textContent = data.forecast[0].maxTemp;
    dayTwoHigh.textContent = data.forecast[1].maxTemp;
    dayThreeHigh.textContent = data.forecast[2].maxTemp;
    dayFourHigh.textContent = data.forecast[3].maxTemp;
    dayFiveHigh.textContent = data.forecast[4].maxTemp;
    daySixHigh.textContent = data.forecast[5].maxTemp;
    daySevenHigh.textContent = data.forecast[6].maxTemp;
    dayOneLow.textContent = data.forecast[0].minTemp;
    dayTwoLow.textContent = data.forecast[1].minTemp;
    dayThreeLow.textContent = data.forecast[2].minTemp;
    dayFourLow.textContent = data.forecast[3].minTemp;
    dayFiveLow.textContent = data.forecast[4].minTemp;
    daySixLow.textContent = data.forecast[5].minTemp;
    daySevenLow.textContent = data.forecast[6].minTemp;
    dayOneCondition.textContent = data.forecast[0].condition;
    dayTwoCondition.textContent = data.forecast[1].condition;
    dayThreeCondition.textContent = data.forecast[2].condition;
    dayFourCondition.textContent = data.forecast[3].condition;
    dayFiveCondition.textContent = data.forecast[4].condition;
    daySixCondition.textContent = data.forecast[5].condition;
    daySevenCondition.textContent = data.forecast[6].condition;
    infoContainer.style.display = 'grid';
}
        



