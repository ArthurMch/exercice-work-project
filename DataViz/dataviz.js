//variables
const apiKey = '6f77ca84f9b1e542d95bbd1110df49e7';
const temperatureMax = document.querySelector(".temperature-value p");
const weatherState = document.querySelector(".temperature-description p");
const localisation = document.querySelector(".location p");
const longi = document.querySelector(".longi p");
const lati = document.querySelector(".lati p");
const temperatureRess = document.querySelector(".tempress p");
const humidité = document.querySelector(".hum p");
const pression = document.querySelector(".press p");
const pays = document.querySelector(".pay p");
const windSpeed = document.querySelector(".wspeed p");
const temperatureMax2 = document.querySelector(".temperature-value2 p");
const weatherState2 = document.querySelector(".temperature-description2 p");
const localisation2 = document.querySelector(".location2 p");
const longi2 = document.querySelector(".longi2 p");
const lati2 = document.querySelector(".lati2 p");
const temperatureRess2 = document.querySelector(".tempress2 p");
const humidité2 = document.querySelector(".hum2 p");
const pression2 = document.querySelector(".press2 p");
const pays2 = document.querySelector(".pay2 p");
const windSpeed2 = document.querySelector(".wspeed2 p");
const comparedTemperatureMax = document.querySelector(".comparedTemperature-value p");
const comparedWeatherState = document.querySelector(".comparedTemperature-description p");
const comparedLocalisation = document.querySelector(".comparedLocation p");
const comparedLongi = document.querySelector(".comparedLongi p");
const comparedLati = document.querySelector(".comparedLati p");
const comparedTemperatureRess = document.querySelector(".comparedTempress p");
const comparedHumidité = document.querySelector(".comparedHum p");
const comparedPression = document.querySelector(".comparedPress p");
const comparedPays = document.querySelector(".comparedPay p");
const comparedWindSpeed = document.querySelector(".comparedWspeed p");
var newCity = '';
var newCity2 = '';
var container = 0;

//class | objets
class MeteoData {
	constructor(temperatureMax, weatherState, localisation, longi, lati, temperatureRess, humidité, pression, pays, windSpeed) {
		this.temperatureMax = tempMax;
		this.weatherState = temp;
		this.localisation = city;
		this.longi = lon;
		this.lati = lat;
		this.temperatureRess = tempRess;
		this.humidité = humid;
		this.pression = press;
		this.pays = countr;
		this.windSpeed = leVentIlSouffle;
	}

	getTemperatureMax(){
		return this.temperatureMax;
	}
	getWeatherState(){
		return this.weatherState;
	}  
	getLocalisation(){
		return this.localisation;
	} 
	getLongi(){
		return this.longi;
	}
	getLati(){
		return this.lati;
	}
	getTemperatureRess(){
		return this.temperatureRess;
	}
	getHumidité(){
		return this.humidité;
	}
	getPression(){
		return this.pression;
	}
	getPays(){
		return this.pays;
	}
	getWindSpeed(){
		return this.windSpeed;
	}
}
let meteos = [];

//demande de la géoloc
function geoloc() {
	if ("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(setPosition, showError);
	} else {
		notificationElement.style.display = "block";
		notificationElement.innerHTML = "<p>Browser doesn't support geolocation.</p>"
	}
}

//location
function setPosition (position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	Weather(longitude, latitude);
}

//message d'erreur
function showError (error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//traitement des données météo
function Weather(longitude, latitude) {
	const api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
	fetch(api)
		.then(function(retour){ //récup des données
			let data = retour.json();
			return(data);
		})
		.then(function(data) { //assignation des données dans différentes variables
			console.log(data)
			city = data.name;
			temp = data.weather[0].description;
			lon = data.coord.lon;
			lat = data.coord.lat;
			tempMax = Math.round(data.main.temp_max - 273,15) + "°C";
			tempMin = Math.round(data.main.temp_min - 273,15) + "°C";
			tempRess = Math.round(data.main.feels_like - 273,15) + "°C";
			humid = data.main.humidity + "%";
			press = (data.main.pressure / 1000) + " Bar";
			countr = data.sys.country;
			leVentIlSouffle = data.wind.speed + " m/s"
		})
		.then(function Affichage() { //affichage des valeurs des variables
			console.log("Vous etes à : " + city);
			if (temp == 'clear sky') {
				temp = 'Ciel dégagé'
				console.log("Le temps est : " + temp);
			} else if (temp == 'overcast clouds') {
				temp = 'Ciel couvert'
				console.log("Le temps est : " + temp);
			} else if (temp == 'broken clouds') {
				temp = 'Ciel légerement couvert'
				console.log("Le temps est : " + temp);
			} else if (temp == 'shower rain') {
				temp = 'Forte pluie'
				console.log("Le temps est : " + temp);
			} else if (temp == 'light rain') {
				temp = 'Petite pluie'
				console.log("Le temps est : " + temp);
			} else if (temp == 'mist') {
				temp = 'Brouillard'
				console.log("Le temps est : " + temp);
			} else if (temp == 'scattered clouds') {
				temp = 'Nuageux'
				console.log("Le temps est : " + temp);
			} else {
				console.log("Le temps est : " + temp + " a trad");
			}
			console.log("La température minimal est : " + tempMin);
			
			let meteo = new MeteoData(tempMax, temp, city, lon, lat, tempRess, humid, press, countr, leVentIlSouffle);
			meteos.splice(container, 1, meteo);
			innerHTML(container);
		})
}

//envoie des données dans le html
function innerHTML(container) {
	if (container == 0) {
		temperatureMax.innerHTML = "temperature : " + meteos[container].getTemperatureMax();
		weatherState.innerHTML = "temps : " + meteos[container].getWeatherState();
		localisation.innerHTML = "ville : " + meteos[container].getLocalisation();
		longi.innerHTML = "longitude : " + meteos[container].getLongi();
		lati.innerHTML = "latitude : " + meteos[container].getLati();
		temperatureRess.innerHTML = "temperature ressenti : " + meteos[container].getTemperatureRess();
		humidité.innerHTML = "humidité : " + meteos[container].getHumidité();
		pression.innerHTML = "pression : " + meteos[container].getPression();
		pays.innerHTML = "pays : " + meteos[container].getPays();
		windSpeed.innerHTML = "vitesse du vent : " + meteos[container].getWindSpeed();
	} else if(container == 1) {
		temperatureMax2.innerHTML = "temperature : " + meteos[container].getTemperatureMax();
		weatherState2.innerHTML = "temps : " + meteos[container].getWeatherState();
		localisation2.innerHTML = "ville : " + meteos[container].getLocalisation();
		longi2.innerHTML = "longitude : " + meteos[container].getLongi();
		lati2.innerHTML = "latitude : " + meteos[container].getLati();
		temperatureRess2.innerHTML = "temperature ressenti : " + meteos[container].getTemperatureRess();
		humidité2.innerHTML = "humidité : " + meteos[container].getHumidité();
		pression2.innerHTML = "pression : " + meteos[container].getPression();
		pays2.innerHTML = "pays : " + meteos[container].getPays();
		windSpeed2.innerHTML = "vitesse du vent : " + meteos[container].getWindSpeed();
	}
}

//recherche d'une ville a partir de son nom
function findCity(City2) {
	const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${City2}&appid=${apiKey}`
	fetch(apiCity)
		.then(function(retourCity) {
			let dataCity = retourCity.json();
			return(dataCity);
		})
		.then(function(dataCity) {
			lat = dataCity.coord.lat;
			lon = dataCity.coord.lon;
			return(lon, lat);
		})
		.then(function(){
			Weather(lon, lat);
		})
}

//comparaison entre les 2 containers html
function compare(){
	let compareTemperatureMax = (meteos[0].getTemperatureMax() - meteos[1].getTemperatureMax());
    let compareWeatherState = meteos[0].getWeatherState() + " - " + meteos[1].getWeatherState();
    let compareLocalisation = meteos[0].getLocalisation() + " - " + meteos[1].getLocalisation();
    let compareLongi = (meteos[0].getLongi() - meteos[1].getLongi());
    let compareLati = (meteos[0].getLati() - meteos[1].getLati());
    let compareTemperatureRess = meteos[0].getTemperatureRess() - meteos[1].getTemperatureRess();
    let compareHumidité = meteos[0].getHumidité() - meteos[1].getHumidité();
    let comparePression = meteos[0].getPression() - meteos[1].getPression();
    let comparePays = meteos[0].getPays() + " - " + meteos[1].getPays();
    let compareWindSpeed = meteos[0].getWindSpeed() - meteos[1].getWindSpeed();
	
	comparedTemperatureMax.innerHTML = "la différence de temperature est : " + compareTemperatureMax + " °C ";
	comparedWeatherState.innerHTML = "Les deux météo sont : " + compareWeatherState;
	comparedLocalisation.innerHTML = "Les deux villes sont : " + compareLocalisation;
	comparedLongi.innerHTML = "La différence de longitude est : " + compareLongi;
	comparedLati.innerHTML = "La différence de latitude est : " + compareLati;
	comparedTemperatureRess.innerHTML = "La différence de température ressenti est : " + compareTemperatureRess;
	comparedHumidité.innerHTML = "La différence d'humidité est : " + compareHumidité;
	comparedPression.innerHTML = "La différence de pression est : " + comparePression;
	comparedPays.innerHTML = "Les deux pays sont : " + comparePays;
	comparedWindSpeed.innerHTML = "La différence de vitesse du vent est : " + compareWindSpeed;

    /*return(comparedTemperatureMax, comparedWeatherState, comparedLocalisation, comparedLongi, comparedLati,
        comparedTemperatureRess, comparedHumidité, comparedPression, comparedPays, comparedWindSpeed)*/
}

//actions des barres de recherches
document.getElementById("newCity").addEventListener("keypress", function (keypress) {
	if (keypress.key === 'Enter') {
		newCity = document.getElementById("newCity").value;
		container = 0;
		if (newCity == '') {
			geoloc();
		} else {
			findCity(newCity);
		}
	}
})

document.getElementById("newCity2").addEventListener("keypress", function (keypress) {
	if (keypress.key === 'Enter') {
		newCity2 = document.getElementById("newCity2").value;
		container = 1;
		if (newCity2 == '') {
			temperatureMax2.innerHTML = "";
			weatherState2.innerHTML = "";
			localisation2.innerHTML = "";
			longi2.innerHTML = "";
			lati2.innerHTML = "";
			temperatureRess2.innerHTML = ""; 
			humidité2.innerHTML = "";
			pression2.innerHTML = "";
			pays2.innerHTML = "";
			windSpeed2.innerHTML = "";
		} else {
			findCity(newCity2);
		}
	}
})


//btn = document.querySelector(".action").addEventListener("click", compare);

geoloc();