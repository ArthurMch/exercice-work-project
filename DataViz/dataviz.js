//variables
const apiKey = '8617438129237c27812b0a81bbcd7483';
const tempElement = document.querySelector(".temperature-value p");
const weatherState = document.querySelector(".temperature-description p");
const localisation = document.querySelector(".location p");

//demande de la géoloc
if ("geolocation" in navigator){
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = "<p>Browser doesn't support geolocation.</p>"
}

//location
function setPosition (position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	Weather(longitude, latitude)
}

//message d'erreur
function showError (error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//récup des données météo
function Weather(longitude, latitude) {
	const api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
	fetch(api)
		.then(function(retour){
			let data = retour.json();
			return(data);
		})
		.then(function(data) {
			city = data.name;
			temp = data.weather[0].description;
			tempMax = Math.round(data.main.temp_max - 273,15) + "°C";
			tempMin = Math.round(data.main.temp_min - 273,15) + "°C";
		})
		.then(function Affichage() {
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
			} else {
				console.log("Le temps est : " + temp + "a trad");
			}
			console.log("La température minimal est : " + tempMin);
			tempElement.innerHTML = tempMax;
			weatherState.innerHTML = temp;
			localisation.innerHTML = city;
		})
}