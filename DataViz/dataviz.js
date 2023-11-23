//variables
const apiKey = '89f3aec5ef5ed977a7fa13a326ddb793';
const apiKey2 = '8617438129237c27812b0a81bbcd7483';
const temperatureMax = document.querySelector(".temperature-value p");
const weatherState = document.querySelector(".temperature-description p");
const localisation = document.querySelector(".location p");
//const icon = document.querySelector(".weather-icon img");
const longi = document.querySelector("longi");
const lati = document.querySelector("lati");
const temperatureRess = document.querySelector("tempress");
const humidité = document.querySelector("hum");
const pression = document.querySelector("press");
const pays = document.querySelector("pay");
const windSpeed = document.querySelector("wspeed");
var newCity = ''
var menu = 0;

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
			tempMax = Math.round(data.main.temp_max - 273,15) + "°C";
			tempMin = Math.round(data.main.temp_min - 273,15) + "°C";
			tempRess = Math.round(data.main.feels_like - 273,15) + "°C";
			humid = data.main.humidity + "%";
			press = (data.main.pressure / 1000) + "Bar";
			countr = data.sys.country;
			leVentIlSouffle = data.wind.speed + "m/s"
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
			if (menu == 0) {
				temperatureMax.innerHTML = tempMax;
				weatherState.innerHTML = temp;
				localisation.innerHTML = city;
			} else if (menu == 1) {
				temperatureMax.innerHTML = tempMax;
				weatherState.innerHTML = temp;
				localisation.innerHTML = city;
				longi.innerHTML = longitude;
				lati.innerHTML = latitude;
				temperatureRess.innerHTML = tempRess; 
				humidité.innerHTML = humid;
				pression.innerHTML = press;
				pays.innerHTML = countr;
				windSpeed.innerHTML = leVentIlSouffle;
			}
		})
}

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

document.getElementById("newCity").addEventListener("keypress", function (keypress) {
	if (keypress.key === 'Enter') {
		newCity = document.getElementById("newCity").value;
		if (newCity == '') {
			geoloc();
		} else {
			findCity(newCity);
		}
	}
})

geoloc();

/*function Movement() {
	icon.style.position = "absolute";
	let basePos = 0
	
	function hautBas() {
		if (basePos < 400) {
			basePos += 2;
			icon.style.top = `${basePos}px`;
			requestAnimationFrame(hautBas);
		}
	}
	requestAnimationFrame(hautBas);
}
Movement()*/