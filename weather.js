const COORDS = "coords";
const API_KEY = "3c4505d4229fca41ef583f167a467e1d";
const weather = document.querySelector(".js_weather");

function getWeather(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric').then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const name = json.name;
        weather.innerText = `기온: ${temperature}도 & 장소: ${name}`
    })

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
 }

function handlesuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleerror(){
    console.log('error');
}

function askforPosition(){
    navigator.geolocation.getCurrentPosition(handlesuccess, handleerror);
}

function loadedCoords(){
    const loadedcoords = localStorage.getItem(COORDS);
    console.log(loadedcoords);
    if(loadedcoords === null){
        askforPosition();
    } else{
        const parsecoords = JSON.parse(loadedcoords);
        getWeather(parsecoords.latitude, parsecoords.longitude);
    }
}

function init(){
    loadedCoords();
}

init();